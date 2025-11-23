/**
 * Visualizador del Árbol AVL
 */
class AVLVisualizer {
    /**
     * Visualiza la estructura del árbol AVL
     * @param {Object} treeStructure - Estructura del árbol desde getTreeStructure()
     * @param {string} containerId - ID del contenedor donde renderizar
     */
    static visualize(treeStructure, containerId) {
        const container = document.getElementById(containerId);
        
        if (!treeStructure) {
            container.innerHTML = '<p class="empty-message">El árbol AVL está vacío</p>';
            return;
        }

        // Calcular posiciones de los nodos
        const positions = this.calculatePositions(treeStructure, 400, 50, 0, {}, 200);
        
        // Crear SVG para el árbol
        const svg = this.createSVGTree(treeStructure, positions);
        container.innerHTML = svg;
    }

    /**
     * Calcula las posiciones de los nodos para renderizar
     * @param {Object} node - Nodo raíz
     * @param {number} x - Posición X inicial
     * @param {number} y - Posición Y inicial
     * @param {number} level - Nivel actual
     * @param {Object} positions - Objeto para almacenar posiciones
     * @param {number} spacing - Espaciado horizontal
     */
    static calculatePositions(node, x = 400, y = 50, level = 0, positions = {}, spacing = 200) {
        if (!node) return positions;

        positions[node.id] = { x, y, node, level };

        const levelHeight = 100;
        const childSpacing = spacing / Math.pow(2, level + 1);

        if (node.left) {
            this.calculatePositions(
                node.left,
                x - childSpacing,
                y + levelHeight,
                level + 1,
                positions,
                spacing
            );
        }

        if (node.right) {
            this.calculatePositions(
                node.right,
                x + childSpacing,
                y + levelHeight,
                level + 1,
                positions,
                spacing
            );
        }

        return positions;
    }

    /**
     * Crea el SVG del árbol
     * @param {Object} treeStructure - Estructura del árbol
     * @param {Object} positions - Posiciones calculadas de los nodos
     * @returns {string} HTML con SVG
     */
    static createSVGTree(treeStructure, positions) {
        // Calcular dimensiones
        const allPositions = Object.values(positions);
        const minX = Math.min(...allPositions.map(p => p.x)) - 100;
        const maxX = Math.max(...allPositions.map(p => p.x)) + 100;
        const maxY = Math.max(...allPositions.map(p => p.y)) + 100;
        
        const width = maxX - minX;
        const height = maxY + 50;

        let svg = `<svg width="${width}" height="${height}" style="border: 1px solid #e1e8ed; border-radius: 8px; background: #f5f7fa;">`;
        
        // Dibujar conexiones primero (para que queden detrás de los nodos)
        svg += this.drawConnections(treeStructure, positions, minX);
        
        // Dibujar nodos
        Object.values(positions).forEach(pos => {
            svg += this.drawNode(pos, minX);
        });

        svg += '</svg>';
        
        // Agregar información adicional
        return `
            <div style="margin-bottom: 20px;">
                <h4 style="color: #4a90e2;">Información del Árbol:</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-top: 10px;">
                    <div style="background: white; padding: 10px; border-radius: 6px;">
                        <strong>Nodos:</strong> ${Object.keys(positions).length}
                    </div>
                    <div style="background: white; padding: 10px; border-radius: 6px;">
                        <strong>Altura:</strong> ${treeStructure.height}
                    </div>
                    <div style="background: white; padding: 10px; border-radius: 6px;">
                        <strong>Balance:</strong> ${this.getBalanceFactor(treeStructure)}
                    </div>
                </div>
            </div>
            <div style="overflow-x: auto;">
                ${svg}
            </div>
        `;
    }

    /**
     * Dibuja las conexiones entre nodos
     */
    static drawConnections(node, positions, offsetX) {
        if (!node) return '';
        
        let lines = '';
        const nodePos = positions[node.id];
        
        if (node.left && positions[node.left.id]) {
            const leftPos = positions[node.left.id];
            lines += `<line x1="${nodePos.x - offsetX}" y1="${nodePos.y + 40}" 
                            x2="${leftPos.x - offsetX}" y2="${leftPos.y + 40}" 
                            stroke="#4a90e2" stroke-width="2"/>`;
            lines += this.drawConnections(node.left, positions, offsetX);
        }
        
        if (node.right && positions[node.right.id]) {
            const rightPos = positions[node.right.id];
            lines += `<line x1="${nodePos.x - offsetX}" y1="${nodePos.y + 40}" 
                            x2="${rightPos.x - offsetX}" y2="${rightPos.y + 40}" 
                            stroke="#4a90e2" stroke-width="2"/>`;
            lines += this.drawConnections(node.right, positions, offsetX);
        }
        
        return lines;
    }

    /**
     * Dibuja un nodo
     */
    static drawNode(position, offsetX) {
        const { x, y, node } = position;
        const xPos = x - offsetX;
        const balance = this.getBalanceFactor(node);
        const balanceColor = balance === 0 ? '#50c878' : (Math.abs(balance) === 1 ? '#f39c12' : '#e74c3c');
        
        return `
            <g>
                <circle cx="${xPos}" cy="${y + 40}" r="35" 
                        fill="white" 
                        stroke="${this.getPriorityColor(node.task.priority).border}" 
                        stroke-width="3"/>
                <text x="${xPos}" y="${y + 35}" 
                      text-anchor="middle" 
                      font-size="16" 
                      font-weight="bold" 
                      fill="#4a90e2">${node.id}</text>
                <text x="${xPos}" y="${y + 55}" 
                      text-anchor="middle" 
                      font-size="10" 
                      fill="#7f8c8d">${node.task.priority.charAt(0).toUpperCase()}</text>
                <circle cx="${xPos + 25}" cy="${y + 25}" r="8" 
                        fill="${balanceColor}" 
                        stroke="white" 
                        stroke-width="1"/>
                <text x="${xPos + 25}" y="${y + 28}" 
                      text-anchor="middle" 
                      font-size="8" 
                      fill="white" 
                      font-weight="bold">${balance}</text>
            </g>
        `;
    }

    /**
     * Calcula el factor de balanceo
     */
    static getBalanceFactor(node) {
        if (!node) return 0;
        const leftHeight = node.left ? node.left.height : 0;
        const rightHeight = node.right ? node.right.height : 0;
        return leftHeight - rightHeight;
    }

    /**
     * Obtiene el color según la prioridad
     */
    static getPriorityColor(priority) {
        const colors = {
            'alta': { bg: '#fee', text: '#e74c3c', border: '#e74c3c' },
            'media': { bg: '#fff4e6', text: '#f39c12', border: '#f39c12' },
            'baja': { bg: '#e8f5e9', text: '#50c878', border: '#50c878' }
        };
        return colors[priority] || colors.media;
    }
}

