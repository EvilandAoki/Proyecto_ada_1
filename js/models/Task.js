/**
 * Clase que representa una Tarea en el sistema
 */
class Task {
    /**
     * @param {number} id - Identificador único de la tarea
     * @param {string} description - Descripción de la tarea
     * @param {string} priority - Prioridad: 'alta', 'media', 'baja'
     * @param {string} dueDate - Fecha de vencimiento (formato YYYY-MM-DD)
     */
    constructor(id, description, priority, dueDate) {
        this.id = id;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
    }

    /**
     * Obtiene el valor numérico de la prioridad para comparación
     * @returns {number} 3 para alta, 2 para media, 1 para baja
     */
    getPriorityValue() {
        const priorityMap = {
            'alta': 3,
            'media': 2,
            'baja': 1
        };
        return priorityMap[this.priority] || 0;
    }

    /**
     * Compara esta tarea con otra por prioridad y fecha de vencimiento
     * @param {Task} other - Otra tarea para comparar
     * @returns {number} Negativo si this tiene mayor prioridad, positivo si menor, 0 si igual
     *                   Si las prioridades son iguales, compara por fecha (más cercana primero)
     */
    compareByPriority(other) {
        const priorityDiff = other.getPriorityValue() - this.getPriorityValue();
        
        // Si las prioridades son diferentes, retornar la diferencia
        if (priorityDiff !== 0) {
            return priorityDiff;
        }
        
        // Si las prioridades son iguales, comparar por fecha de vencimiento
        // La fecha más cercana (menor) tiene mayor prioridad
        const thisDate = new Date(this.dueDate);
        const otherDate = new Date(other.dueDate);
        
        return thisDate - otherDate;
    }

    /**
     * Crea una copia de la tarea
     * @returns {Task} Nueva instancia de Task con los mismos valores
     */
    clone() {
        return new Task(this.id, this.description, this.priority, this.dueDate);
    }
}

