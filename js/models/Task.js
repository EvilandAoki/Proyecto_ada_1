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
     * Compara esta tarea con otra por prioridad
     * @param {Task} other - Otra tarea para comparar
     * @returns {number} Negativo si this tiene mayor prioridad, positivo si menor, 0 si igual
     */
    compareByPriority(other) {
        return other.getPriorityValue() - this.getPriorityValue();
    }

    /**
     * Crea una copia de la tarea
     * @returns {Task} Nueva instancia de Task con los mismos valores
     */
    clone() {
        return new Task(this.id, this.description, this.priority, this.dueDate);
    }
}

