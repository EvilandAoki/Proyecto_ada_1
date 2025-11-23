/**
 * Sistema de Gestión de Tareas que integra Heap y Árbol AVL
 * Mantiene sincronización entre ambas estructuras de datos
 */
class TaskManager {
    constructor() {
        this.heap = new Heap();
        this.avlTree = new AVLTree();
    }

    /**
     * Agrega una nueva tarea al sistema (en ambas estructuras)
     * @param {string} description - Descripción de la tarea
     * @param {string} priority - Prioridad: 'alta', 'media', 'baja'
     * @param {string} dueDate - Fecha de vencimiento (formato YYYY-MM-DD)
     * @returns {Task} Tarea creada
     */
    agregarTarea(description, priority, dueDate) {
        const id = idGenerator.generate();
        const task = new Task(id, description, priority, dueDate);
        
        // Insertar en ambas estructuras
        this.heap.insert(task);
        this.avlTree.insert(task);
        
        return task;
    }

    /**
     * Elimina una tarea del sistema (de ambas estructuras)
     * @param {number} taskId - ID de la tarea a eliminar
     * @returns {boolean} true si se eliminó, false si no se encontró
     */
    eliminarTarea(taskId) {
        const heapRemoved = this.heap.remove(taskId);
        const avlRemoved = this.avlTree.delete(taskId);
        
        return heapRemoved && avlRemoved;
    }

    /**
     * Actualiza una tarea existente
     * @param {number} taskId - ID de la tarea a actualizar
     * @param {Object} updates - Objeto con las propiedades a actualizar
     * @param {string} [updates.description] - Nueva descripción
     * @param {string} [updates.priority] - Nueva prioridad
     * @param {string} [updates.dueDate] - Nueva fecha de vencimiento
     * @returns {Task|null} Tarea actualizada o null si no se encontró
     */
    actualizarTarea(taskId, updates) {
        // Buscar la tarea en el AVL
        const existingTask = this.avlTree.search(taskId);
        if (!existingTask) return null;

        // Crear tarea actualizada
        const updatedTask = new Task(
            taskId,
            updates.description !== undefined ? updates.description : existingTask.description,
            updates.priority !== undefined ? updates.priority : existingTask.priority,
            updates.dueDate !== undefined ? updates.dueDate : existingTask.dueDate
        );

        // Si cambió la prioridad, necesitamos reordenar el heap
        const priorityChanged = updates.priority && updates.priority !== existingTask.priority;

        if (priorityChanged) {
            // Eliminar del heap y reinsertar con nueva prioridad
            this.heap.remove(taskId);
            this.heap.insert(updatedTask);
        } else {
            // Solo actualizar la referencia en el heap si existe
            const heapTask = this.heap.find(taskId);
            if (heapTask) {
                heapTask.description = updatedTask.description;
                heapTask.priority = updatedTask.priority;
                heapTask.dueDate = updatedTask.dueDate;
            }
        }

        // Actualizar en el AVL (el árbol se rebalancea automáticamente)
        this.avlTree.insert(updatedTask);

        return updatedTask;
    }

    /**
     * Busca una tarea por su ID usando el árbol AVL
     * @param {number} taskId - ID de la tarea a buscar
     * @returns {Task|null} Tarea encontrada o null
     */
    buscarTarea(taskId) {
        return this.avlTree.search(taskId);
    }

    /**
     * Obtiene la tarea con mayor prioridad del heap
     * @returns {Task|null} Tarea con mayor prioridad o null si está vacío
     */
    obtenerMasPrioritaria() {
        return this.heap.peek();
    }

    /**
     * Extrae y elimina la tarea con mayor prioridad
     * @returns {Task|null} Tarea extraída o null si está vacío
     */
    completarTareaMasPrioritaria() {
        const task = this.heap.extractMax();
        if (task) {
            this.avlTree.delete(task.id);
        }
        return task;
    }

    /**
     * Obtiene todas las tareas ordenadas por prioridad (del heap)
     * @returns {Array<Task>} Array de tareas ordenadas por prioridad
     */
    obtenerTareasPorPrioridad() {
        // Crear una copia del heap para no modificar el original
        const tasks = this.heap.getAll();
        // Ordenar por prioridad (mayor a menor)
        return tasks.sort((a, b) => a.compareByPriority(b));
    }

    /**
     * Obtiene todas las tareas ordenadas por ID (del AVL)
     * @returns {Array<Task>} Array de tareas ordenadas por ID
     */
    obtenerTareasPorId() {
        return this.avlTree.getAllInOrder();
    }

    /**
     * Obtiene el estado de las estructuras de datos para visualización
     * @returns {Object} Objeto con el estado del heap y AVL
     */
    getEstadoEstructuras() {
        return {
            heap: {
                size: this.heap.size(),
                tasks: this.heap.getAll(),
                structure: this.heap.getAll()
            },
            avlTree: {
                size: this.avlTree.size(),
                tasks: this.avlTree.getAllInOrder(),
                structure: this.avlTree.getTreeStructure()
            }
        };
    }

    /**
     * Verifica si el sistema está vacío
     * @returns {boolean} true si está vacío
     */
    isEmpty() {
        return this.heap.isEmpty() && this.avlTree.isEmpty();
    }

    /**
     * Limpia todas las tareas del sistema
     */
    limpiar() {
        this.heap = new Heap();
        this.avlTree = new AVLTree();
        idGenerator.reset();
    }
}

