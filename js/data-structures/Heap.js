/**
 * Implementación de un Montículo Binario Max-Heap para gestionar tareas por prioridad
 */
class Heap {
    constructor() {
        this.heap = [];
    }

    /**
     * Obtiene el índice del padre de un nodo
     * @param {number} index - Índice del nodo
     * @returns {number} Índice del padre
     */
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    /**
     * Obtiene el índice del hijo izquierdo
     * @param {number} index - Índice del nodo
     * @returns {number} Índice del hijo izquierdo
     */
    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    /**
     * Obtiene el índice del hijo derecho
     * @param {number} index - Índice del nodo
     * @returns {number} Índice del hijo derecho
     */
    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    /**
     * Intercambia dos elementos en el heap
     * @param {number} index1 - Primer índice
     * @param {number} index2 - Segundo índice
     */
    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    /**
     * Reordena el heap hacia arriba (heapify up)
     * @param {number} index - Índice desde el cual comenzar
     */
    heapifyUp(index) {
        if (index === 0) return;

        const parentIndex = this.getParentIndex(index);
        const current = this.heap[index];
        const parent = this.heap[parentIndex];

        // Comparar por prioridad (mayor prioridad va arriba)
        if (current.compareByPriority(parent) < 0) {
            this.swap(index, parentIndex);
            this.heapifyUp(parentIndex);
        }
    }

    /**
     * Reordena el heap hacia abajo (heapify down)
     * @param {number} index - Índice desde el cual comenzar
     */
    heapifyDown(index) {
        const leftChildIndex = this.getLeftChildIndex(index);
        const rightChildIndex = this.getRightChildIndex(index);
        let largestIndex = index;

        // Comparar con hijo izquierdo
        if (leftChildIndex < this.heap.length) {
            if (this.heap[leftChildIndex].compareByPriority(this.heap[largestIndex]) < 0) {
                largestIndex = leftChildIndex;
            }
        }

        // Comparar con hijo derecho
        if (rightChildIndex < this.heap.length) {
            if (this.heap[rightChildIndex].compareByPriority(this.heap[largestIndex]) < 0) {
                largestIndex = rightChildIndex;
            }
        }

        // Si el mayor no es el actual, intercambiar y continuar
        if (largestIndex !== index) {
            this.swap(index, largestIndex);
            this.heapifyDown(largestIndex);
        }
    }

    /**
     * Inserta una nueva tarea en el heap
     * @param {Task} task - Tarea a insertar
     */
    insert(task) {
        this.heap.push(task);
        this.heapifyUp(this.heap.length - 1);
    }

    /**
     * Extrae y retorna la tarea con mayor prioridad
     * @returns {Task|null} Tarea con mayor prioridad o null si está vacío
     */
    extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return max;
    }

    /**
     * Obtiene la tarea con mayor prioridad sin extraerla
     * @returns {Task|null} Tarea con mayor prioridad o null si está vacío
     */
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    /**
     * Elimina una tarea específica por su ID
     * @param {number} taskId - ID de la tarea a eliminar
     * @returns {boolean} true si se eliminó, false si no se encontró
     */
    remove(taskId) {
        const index = this.heap.findIndex(task => task.id === taskId);
        if (index === -1) return false;

        // Mover el último elemento a la posición del eliminado
        this.heap[index] = this.heap[this.heap.length - 1];
        this.heap.pop();

        // Reordenar si es necesario
        if (index < this.heap.length) {
            const parentIndex = this.getParentIndex(index);
            if (index > 0 && this.heap[index].compareByPriority(this.heap[parentIndex]) < 0) {
                this.heapifyUp(index);
            } else {
                this.heapifyDown(index);
            }
        }

        return true;
    }

    /**
     * Busca una tarea por su ID
     * @param {number} taskId - ID de la tarea a buscar
     * @returns {Task|null} Tarea encontrada o null
     */
    find(taskId) {
        return this.heap.find(task => task.id === taskId) || null;
    }

    /**
     * Verifica si el heap está vacío
     * @returns {boolean} true si está vacío
     */
    isEmpty() {
        return this.heap.length === 0;
    }

    /**
     * Obtiene el tamaño del heap
     * @returns {number} Número de elementos
     */
    size() {
        return this.heap.length;
    }

    /**
     * Obtiene todos los elementos del heap (para visualización)
     * @returns {Array<Task>} Array con todas las tareas
     */
    getAll() {
        return [...this.heap];
    }
}

