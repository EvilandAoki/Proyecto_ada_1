/**
 * Visualizador del Montículo Binario (Heap)
 */
class HeapVisualizer {
    /**
     * Visualiza la estructura del heap
     * @param {Array<Task>} tasks - Array de tareas del heap
     * @param {string} containerId - ID del contenedor donde renderizar
     */
    static visualize(tasks, containerId) {
        const container = document.getElementById(containerId);
        
        if (!tasks || tasks.length === 0) {
            container.innerHTML = '<p class="empty-message">El heap está vacío</p>';
            return;
        }

        // Crear visualización como árbol binario
        const html = this.createTreeVisualization(tasks);
        container.innerHTML = html;
    }

    /**
     * Crea la visualización del heap como árbol binario
     * @param {Array<Task>} tasks - Array de tareas
     * @returns {string} HTML de la visualización
     */
    static createTreeVisualization(tasks) {
        let html = '<div class="heap-tree">';
        
        // Mostrar representación de array
        html += '<div style="margin-bottom: 20px;">';
        html += '<h3 style="color: #4a90e2; margin-bottom: 10px;">Representación como Array:</h3>';
        html += '<div style="display: flex; flex-wrap: wrap; gap: 10px;">';
        tasks.forEach((task, index) => {
            const priorityClass = `priority-${task.priority}`;
            html += `
                <div style="
                    background: white;
                    border: 2px solid #e1e8ed;
                    border-radius: 8px;
                    padding: 15px;
                    min-width: 200px;
                    position: relative;
                ">
                    <div style="position: absolute; top: 5px; right: 5px; font-size: 0.8em; color: #7f8c8d;">
                        [${index}]
                    </div>
                    <div style="font-weight: bold; color: #4a90e2; margin-bottom: 5px;">
                        ID: ${task.id}
                    </div>
                    <div style="margin-bottom: 5px; font-size: 0.9em;">
                        ${this.escapeHtml(task.description)}
                    </div>
                    <div style="
                        display: inline-block;
                        padding: 3px 10px;
                        border-radius: 15px;
                        font-size: 0.8em;
                        font-weight: 600;
                        background: ${this.getPriorityColor(task.priority).bg};
                        color: ${this.getPriorityColor(task.priority).text};
                    ">
                        ${task.priority.toUpperCase()}
                    </div>
                </div>
            `;
        });
        html += '</div></div>';

        // Mostrar estructura de árbol
        html += '<div style="margin-top: 30px;">';
        html += '<h3 style="color: #4a90e2; margin-bottom: 10px;">Estructura de Árbol Binario:</h3>';
        html += this.createTreeStructure(tasks);
        html += '</div>';

        html += '</div>';
        return html;
    }

    /**
     * Crea la estructura visual del árbol
     * @param {Array<Task>} tasks - Array de tareas
     * @returns {string} HTML del árbol
     */
    static createTreeStructure(tasks) {
        if (tasks.length === 0) return '<p>Árbol vacío</p>';

        let html = '<div style="display: flex; justify-content: center; overflow-x: auto;">';
        html += '<div class="tree-container">';
        
        // Calcular niveles
        const levels = this.getLevels(tasks);
        
        levels.forEach((level, levelIndex) => {
            html += `<div class="tree-level" style="display: flex; justify-content: center; margin-bottom: 40px; gap: 20px;">`;
            
            level.forEach((taskIndex, nodeIndex) => {
                if (taskIndex === null) {
                    html += '<div class="tree-node-empty"></div>';
                } else {
                    const task = tasks[taskIndex];
                    const leftChild = this.getLeftChildIndex(taskIndex);
                    const rightChild = this.getRightChildIndex(taskIndex);
                    const hasChildren = leftChild < tasks.length || rightChild < tasks.length;
                    
                    html += `
                        <div class="tree-node-wrapper">
                            <div class="tree-node" style="
                                background: white;
                                border: 3px solid ${this.getPriorityColor(task.priority).border};
                                border-radius: 50%;
                                width: 80px;
                                height: 80px;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                position: relative;
                                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                            ">
                                <div style="font-weight: bold; color: #4a90e2; font-size: 1.2em;">
                                    ${task.id}
                                </div>
                                <div style="font-size: 0.7em; color: #7f8c8d; margin-top: 2px;">
                                    ${task.priority.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            ${hasChildren ? '<div class="tree-connector"></div>' : ''}
                        </div>
                    `;
                }
            });
            
            html += '</div>';
        });
        
        html += '</div></div>';
        
        // Agregar estilos CSS para el árbol
        html += `
            <style>
                .tree-container {
                    padding: 20px;
                }
                .tree-node-wrapper {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .tree-connector {
                    width: 2px;
                    height: 20px;
                    background: #4a90e2;
                    margin-top: 5px;
                }
                .tree-node-empty {
                    width: 80px;
                    height: 80px;
                }
            </style>
        `;
        
        return html;
    }

    /**
     * Organiza las tareas por niveles del árbol
     * @param {Array<Task>} tasks - Array de tareas
     * @returns {Array<Array<number|null>>} Array de niveles con índices
     */
    static getLevels(tasks) {
        if (tasks.length === 0) return [];
        
        const levels = [];
        let currentLevel = [0];
        
        while (currentLevel.length > 0) {
            levels.push([...currentLevel]);
            const nextLevel = [];
            
            currentLevel.forEach(index => {
                if (index < tasks.length) {
                    const left = this.getLeftChildIndex(index);
                    const right = this.getRightChildIndex(index);
                    if (left < tasks.length) nextLevel.push(left);
                    if (right < tasks.length) nextLevel.push(right);
                }
            });
            
            currentLevel = nextLevel;
        }
        
        return levels;
    }

    /**
     * Obtiene el índice del hijo izquierdo
     */
    static getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    /**
     * Obtiene el índice del hijo derecho
     */
    static getRightChildIndex(index) {
        return 2 * index + 2;
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

    /**
     * Escapa HTML
     */
    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

