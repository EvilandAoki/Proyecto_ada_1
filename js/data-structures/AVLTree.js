/**
 * Nodo del Árbol AVL
 */
class AVLNode {
    constructor(task) {
        this.task = task;
        this.id = task.id;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

/**
 * Implementación de un Árbol AVL para indexar tareas por ID único
 * Garantiza búsqueda O(log n) mediante auto-balanceo
 */
class AVLTree {
    constructor() {
        this.root = null;
    }

    /**
     * Obtiene la altura de un nodo
     * @param {AVLNode|null} node - Nodo del árbol
     * @returns {number} Altura del nodo (0 si es null)
     */
    getHeight(node) {
        return node ? node.height : 0;
    }

    /**
     * Calcula el factor de balanceo de un nodo
     * @param {AVLNode} node - Nodo del árbol
     * @returns {number} Factor de balanceo (diferencia de alturas)
     */
    getBalanceFactor(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    /**
     * Actualiza la altura de un nodo
     * @param {AVLNode} node - Nodo a actualizar
     */
    updateHeight(node) {
        node.height = Math.max(
            this.getHeight(node.left),
            this.getHeight(node.right)
        ) + 1;
    }

    /**
     * Rotación simple a la derecha
     * @param {AVLNode} y - Nodo desbalanceado
     * @returns {AVLNode} Nueva raíz del subárbol
     */
    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;

        // Realizar rotación
        x.right = y;
        y.left = T2;

        // Actualizar alturas
        this.updateHeight(y);
        this.updateHeight(x);

        return x;
    }

    /**
     * Rotación simple a la izquierda
     * @param {AVLNode} x - Nodo desbalanceado
     * @returns {AVLNode} Nueva raíz del subárbol
     */
    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;

        // Realizar rotación
        y.left = x;
        x.right = T2;

        // Actualizar alturas
        this.updateHeight(x);
        this.updateHeight(y);

        return y;
    }

    /**
     * Inserta una tarea en el árbol AVL
     * @param {Task} task - Tarea a insertar
     */
    insert(task) {
        this.root = this._insertNode(this.root, task);
    }

    /**
     * Método auxiliar recursivo para insertar un nodo
     * @param {AVLNode|null} node - Nodo actual
     * @param {Task} task - Tarea a insertar
     * @returns {AVLNode} Nodo raíz del subárbol balanceado
     */
    _insertNode(node, task) {
        // 1. Inserción estándar de BST
        if (!node) {
            return new AVLNode(task);
        }

        if (task.id < node.id) {
            node.left = this._insertNode(node.left, task);
        } else if (task.id > node.id) {
            node.right = this._insertNode(node.right, task);
        } else {
            // ID duplicado, actualizar tarea
            node.task = task;
            return node;
        }

        // 2. Actualizar altura del nodo ancestro
        this.updateHeight(node);

        // 3. Obtener factor de balanceo
        const balance = this.getBalanceFactor(node);

        // 4. Rotaciones si está desbalanceado

        // Caso Left Left
        if (balance > 1 && task.id < node.left.id) {
            return this.rotateRight(node);
        }

        // Caso Right Right
        if (balance < -1 && task.id > node.right.id) {
            return this.rotateLeft(node);
        }

        // Caso Left Right
        if (balance > 1 && task.id > node.left.id) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        // Caso Right Left
        if (balance < -1 && task.id < node.right.id) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }

    /**
     * Busca una tarea por su ID
     * @param {number} id - ID de la tarea a buscar
     * @returns {Task|null} Tarea encontrada o null
     */
    search(id) {
        return this._searchNode(this.root, id);
    }

    /**
     * Método auxiliar recursivo para buscar un nodo
     * @param {AVLNode|null} node - Nodo actual
     * @param {number} id - ID a buscar
     * @returns {Task|null} Tarea encontrada o null
     */
    _searchNode(node, id) {
        if (!node) return null;
        if (id === node.id) return node.task;
        if (id < node.id) return this._searchNode(node.left, id);
        return this._searchNode(node.right, id);
    }

    /**
     * Elimina una tarea por su ID
     * @param {number} id - ID de la tarea a eliminar
     * @returns {boolean} true si se eliminó, false si no se encontró
     */
    delete(id) {
        const beforeSize = this.size();
        this.root = this._deleteNode(this.root, id);
        return this.size() < beforeSize;
    }

    /**
     * Método auxiliar recursivo para eliminar un nodo
     * @param {AVLNode|null} node - Nodo actual
     * @param {number} id - ID a eliminar
     * @returns {AVLNode|null} Nodo raíz del subárbol balanceado
     */
    _deleteNode(node, id) {
        // 1. Eliminación estándar de BST
        if (!node) return null;

        if (id < node.id) {
            node.left = this._deleteNode(node.left, id);
        } else if (id > node.id) {
            node.right = this._deleteNode(node.right, id);
        } else {
            // Nodo a eliminar encontrado
            if (!node.left) {
                return node.right;
            } else if (!node.right) {
                return node.left;
            }

            // Nodo con dos hijos: obtener el sucesor inorden (menor en subárbol derecho)
            const successor = this._getMinValueNode(node.right);
            node.task = successor.task;
            node.id = successor.id;
            node.right = this._deleteNode(node.right, successor.id);
        }

        // 2. Actualizar altura
        this.updateHeight(node);

        // 3. Obtener factor de balanceo
        const balance = this.getBalanceFactor(node);

        // 4. Rotaciones si está desbalanceado

        // Caso Left Left
        if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
            return this.rotateRight(node);
        }

        // Caso Left Right
        if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        // Caso Right Right
        if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
            return this.rotateLeft(node);
        }

        // Caso Right Left
        if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }

    /**
     * Obtiene el nodo con el valor mínimo en un subárbol
     * @param {AVLNode} node - Nodo raíz del subárbol
     * @returns {AVLNode} Nodo con valor mínimo
     */
    _getMinValueNode(node) {
        let current = node;
        while (current.left) {
            current = current.left;
        }
        return current;
    }

    /**
     * Verifica si el árbol está vacío
     * @returns {boolean} true si está vacío
     */
    isEmpty() {
        return this.root === null;
    }

    /**
     * Obtiene el tamaño del árbol
     * @returns {number} Número de nodos
     */
    size() {
        return this._countNodes(this.root);
    }

    /**
     * Cuenta recursivamente los nodos
     * @param {AVLNode|null} node - Nodo actual
     * @returns {number} Número de nodos
     */
    _countNodes(node) {
        if (!node) return 0;
        return 1 + this._countNodes(node.left) + this._countNodes(node.right);
    }

    /**
     * Obtiene todas las tareas en orden inorden (para visualización)
     * @returns {Array<Task>} Array con todas las tareas ordenadas por ID
     */
    getAllInOrder() {
        const result = [];
        this._inOrderTraversal(this.root, result);
        return result;
    }

    /**
     * Recorrido inorden del árbol
     * @param {AVLNode|null} node - Nodo actual
     * @param {Array<Task>} result - Array para almacenar resultados
     */
    _inOrderTraversal(node, result) {
        if (node) {
            this._inOrderTraversal(node.left, result);
            result.push(node.task);
            this._inOrderTraversal(node.right, result);
        }
    }

    /**
     * Obtiene la estructura del árbol para visualización
     * @returns {Object|null} Estructura del árbol o null si está vacío
     */
    getTreeStructure() {
        if (!this.root) return null;
        return this._getNodeStructure(this.root);
    }

    /**
     * Obtiene la estructura de un nodo recursivamente
     * @param {AVLNode} node - Nodo actual
     * @returns {Object} Estructura del nodo
     */
    _getNodeStructure(node) {
        return {
            id: node.id,
            task: node.task,
            height: node.height,
            balance: this.getBalanceFactor(node),
            left: node.left ? this._getNodeStructure(node.left) : null,
            right: node.right ? this._getNodeStructure(node.right) : null
        };
    }
}

