/**
 * Utilidades para validar datos de entrada
 */
class Validators {
    /**
     * Valida que una descripción no esté vacía
     * @param {string} description - Descripción a validar
     * @returns {Object} {valid: boolean, message: string}
     */
    static validateDescription(description) {
        if (!description || description.trim().length === 0) {
            return {
                valid: false,
                message: 'La descripción no puede estar vacía'
            };
        }
        if (description.trim().length > 500) {
            return {
                valid: false,
                message: 'La descripción no puede exceder 500 caracteres'
            };
        }
        return { valid: true, message: '' };
    }

    /**
     * Valida que la prioridad sea válida
     * @param {string} priority - Prioridad a validar
     * @returns {Object} {valid: boolean, message: string}
     */
    static validatePriority(priority) {
        const validPriorities = ['alta', 'media', 'baja'];
        if (!validPriorities.includes(priority)) {
            return {
                valid: false,
                message: 'La prioridad debe ser: alta, media o baja'
            };
        }
        return { valid: true, message: '' };
    }

    /**
     * Valida que la fecha sea válida y no sea del pasado
     * @param {string} date - Fecha en formato YYYY-MM-DD
     * @returns {Object} {valid: boolean, message: string}
     */
    static validateDate(date) {
        if (!date) {
            return {
                valid: false,
                message: 'La fecha de vencimiento es requerida'
            };
        }

        const dateObj = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (isNaN(dateObj.getTime())) {
            return {
                valid: false,
                message: 'La fecha no es válida'
            };
        }

        if (dateObj < today) {
            return {
                valid: false,
                message: 'La fecha de vencimiento no puede ser del pasado'
            };
        }

        return { valid: true, message: '' };
    }

    /**
     * Valida todos los campos de una tarea
     * @param {string} description - Descripción
     * @param {string} priority - Prioridad
     * @param {string} dueDate - Fecha de vencimiento
     * @returns {Object} {valid: boolean, errors: Array<string>}
     */
    static validateTask(description, priority, dueDate) {
        const errors = [];
        
        const descValidation = this.validateDescription(description);
        if (!descValidation.valid) errors.push(descValidation.message);

        const priorityValidation = this.validatePriority(priority);
        if (!priorityValidation.valid) errors.push(priorityValidation.message);

        const dateValidation = this.validateDate(dueDate);
        if (!dateValidation.valid) errors.push(dateValidation.message);

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Valida un ID de tarea
     * @param {number|string} id - ID a validar
     * @returns {Object} {valid: boolean, message: string}
     */
    static validateId(id) {
        const numId = Number(id);
        if (isNaN(numId) || numId <= 0 || !Number.isInteger(numId)) {
            return {
                valid: false,
                message: 'El ID debe ser un número entero positivo'
            };
        }
        return { valid: true, message: '' };
    }
}

