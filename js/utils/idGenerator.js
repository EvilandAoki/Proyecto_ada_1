/**
 * Generador de IDs únicos incrementales para las tareas
 */
class IdGenerator {
    constructor() {
        this.currentId = 0;
    }

    /**
     * Genera un nuevo ID único
     * @returns {number} Nuevo ID único
     */
    generate() {
        this.currentId++;
        return this.currentId;
    }

    /**
     * Reinicia el generador de IDs
     */
    reset() {
        this.currentId = 0;
    }
}

// Instancia global del generador
const idGenerator = new IdGenerator();

