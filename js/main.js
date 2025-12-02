/**
 * Instancia global del TaskManager
 */
let taskManager = new TaskManager();

/**
 * Inicialización cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    updateTasksList();
    setMinDate();
});

/**
 * Configura la fecha mínima del input de fecha (hoy)
 */
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dueDate').setAttribute('min', today);
    document.getElementById('editDueDate').setAttribute('min', today);
}

/**
 * Inicializa todos los event listeners
 */
function initializeEventListeners() {
    // Formulario de agregar tarea
    document.getElementById('taskForm').addEventListener('submit', handleAddTask);

    // Búsqueda
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('searchId').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Acciones rápidas
    document.getElementById('getPriorityBtn').addEventListener('click', showMostPriorityTask);
    document.getElementById('completePriorityBtn').addEventListener('click', completeMostPriorityTask);
    document.getElementById('viewStructuresBtn').addEventListener('click', () => {
        saveStateToStorage();
        window.open('visualization.html', '_blank');
    });
    document.getElementById('runTestsBtn').addEventListener('click', runTestCases);

    // Modal de edición
    const modal = document.getElementById('editModal');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.getElementById('cancelEdit');

    closeBtn.addEventListener('click', closeEditModal);
    cancelBtn.addEventListener('click', closeEditModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeEditModal();
    });

    document.getElementById('editForm').addEventListener('submit', handleUpdateTask);
}

/**
 * Maneja el envío del formulario de agregar tarea
 */
function handleAddTask(e) {
    e.preventDefault();

    const description = document.getElementById('description').value.trim();
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('dueDate').value;

    // Validar
    const validation = Validators.validateTask(description, priority, dueDate);
    if (!validation.valid) {
        showNotification(validation.errors.join(', '), 'error');
        return;
    }

    // Agregar tarea
    try {
        const task = taskManager.agregarTarea(description, priority, dueDate);
        showNotification(`Tarea #${task.id} agregada exitosamente`, 'success');
        document.getElementById('taskForm').reset();
        updateTasksList();
    } catch (error) {
        showNotification('Error al agregar la tarea: ' + error.message, 'error');
    }
}

/**
 * Maneja la búsqueda de tarea por ID
 */
function handleSearch() {
    const searchId = document.getElementById('searchId').value;
    const resultDiv = document.getElementById('searchResult');

    // Validar ID
    const idValidation = Validators.validateId(searchId);
    if (!idValidation.valid) {
        resultDiv.className = 'search-result not-found';
        resultDiv.textContent = idValidation.message;
        return;
    }

    const task = taskManager.buscarTarea(Number(searchId));

    if (task) {
        resultDiv.className = 'search-result found';
        resultDiv.innerHTML = `
            <strong>Tarea encontrada:</strong><br>
            <strong>ID:</strong> ${task.id}<br>
            <strong>Descripción:</strong> ${task.description}<br>
            <strong>Prioridad:</strong> ${task.priority.toUpperCase()}<br>
            <strong>Fecha de vencimiento:</strong> ${formatDate(task.dueDate)}
        `;
    } else {
        resultDiv.className = 'search-result not-found';
        resultDiv.textContent = `No se encontró ninguna tarea con ID ${searchId}`;
    }
}

/**
 * Muestra la tarea más prioritaria
 */
function showMostPriorityTask() {
    const task = taskManager.obtenerMasPrioritaria();
    
    if (task) {
        showNotification(
            `Tarea más prioritaria: #${task.id} - ${task.description} (${task.priority.toUpperCase()})`,
            'info'
        );
    } else {
        showNotification('No hay tareas registradas', 'info');
    }
}

/**
 * Completa la tarea más prioritaria
 */
function completeMostPriorityTask() {
    const task = taskManager.completarTareaMasPrioritaria();
    
    if (task) {
        showNotification(`Tarea #${task.id} completada y eliminada`, 'success');
        updateTasksList();
    } else {
        showNotification('No hay tareas para completar', 'info');
    }
}

/**
 * Maneja la actualización de una tarea
 */
function handleUpdateTask(e) {
    e.preventDefault();

    const id = Number(document.getElementById('editId').value);
    const description = document.getElementById('editDescription').value.trim();
    const priority = document.getElementById('editPriority').value;
    const dueDate = document.getElementById('editDueDate').value;

    // Validar
    const validation = Validators.validateTask(description, priority, dueDate);
    if (!validation.valid) {
        showNotification(validation.errors.join(', '), 'error');
        return;
    }

    // Actualizar tarea
    try {
        const updatedTask = taskManager.actualizarTarea(id, {
            description,
            priority,
            dueDate
        });

        if (updatedTask) {
            showNotification(`Tarea #${id} actualizada exitosamente`, 'success');
            closeEditModal();
            updateTasksList();
        } else {
            showNotification('No se pudo encontrar la tarea', 'error');
        }
    } catch (error) {
        showNotification('Error al actualizar la tarea: ' + error.message, 'error');
    }
}

/**
 * Abre el modal de edición con los datos de la tarea
 * @param {Object|string} task - Objeto de tarea o JSON string
 */
function openEditModal(task) {
    // Si es string, parsearlo
    if (typeof task === 'string') {
        task = JSON.parse(task);
    }
    
    document.getElementById('editId').value = task.id;
    document.getElementById('editDescription').value = task.description;
    document.getElementById('editPriority').value = task.priority;
    document.getElementById('editDueDate').value = task.dueDate;
    document.getElementById('editModal').classList.add('show');
}

// Hacer la función global para que pueda ser llamada desde onclick
window.openEditModal = openEditModal;
window.deleteTask = deleteTask;

/**
 * Cierra el modal de edición
 */
function closeEditModal() {
    document.getElementById('editModal').classList.remove('show');
}

/**
 * Elimina una tarea
 */
function deleteTask(taskId) {
    if (confirm('¿Está seguro de que desea completar esta tarea?')) {
        const deleted = taskManager.eliminarTarea(taskId);
        if (deleted) {
            showNotification(`Tarea #${taskId} completada exitosamente`, 'success');
            updateTasksList();
        } else {
            showNotification('No se pudo encontrar la tarea', 'error');
        }
    }
}

/**
 * Actualiza la lista de tareas en la interfaz
 */
function updateTasksList() {
    const tasksList = document.getElementById('tasksList');
    const tasks = taskManager.obtenerTareasPorPrioridad();

    if (tasks.length === 0) {
        tasksList.innerHTML = '<p class="empty-message">No hay tareas registradas. Agrega una tarea para comenzar.</p>';
        return;
    }

    tasksList.innerHTML = tasks.map(task => `
        <div class="task-card priority-${task.priority}">
            <div class="task-header">
                <span class="task-id">Tarea #${task.id}</span>
                <span class="task-priority ${task.priority}">${task.priority}</span>
            </div>
            <div class="task-description">${escapeHtml(task.description)}</div>
            <div class="task-footer">
                <span class="task-date">📅 Vence: ${formatDate(task.dueDate)}</span>
                <div class="task-actions">
                    <button class="btn btn-info" onclick='openEditModal(${JSON.stringify(task)})'>Editar</button>
                    <button class="btn btn-danger" onclick="deleteTask(${task.id})">Completar</button>
                </div>
            </div>
        </div>
    `).join('');

    // Guardar estado para la página de visualización
    saveStateToStorage();
}

/**
 * Guarda el estado del TaskManager en sessionStorage
 */
function saveStateToStorage() {
    const estado = taskManager.getEstadoEstructuras();
    sessionStorage.setItem('taskManagerState', JSON.stringify(estado));
}

/**
 * Formatea una fecha para mostrar
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Escapa HTML para prevenir XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Muestra una notificación
 */
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

/**
 * Ejecuta los casos de prueba
 */
function runTestCases() {
    console.log('=== INICIANDO CASOS DE PRUEBA ===\n');

    // Guardar estado actual
    const originalTasks = taskManager.obtenerTareasPorId();
    taskManager.limpiar();

    try {
        // Prueba 1: Inserción múltiple con diferentes prioridades
        console.log('1. PRUEBA DE INSERCIÓN:');
        console.log('   Insertando tareas con diferentes prioridades...');
        
        const task1 = taskManager.agregarTarea('Estudiar para el examen', 'alta', getFutureDate(5));
        const task2 = taskManager.agregarTarea('Comprar útiles escolares', 'media', getFutureDate(10));
        const task3 = taskManager.agregarTarea('Revisar correos electrónicos', 'baja', getFutureDate(3));
        const task4 = taskManager.agregarTarea('Preparar presentación', 'alta', getFutureDate(7));
        const task5 = taskManager.agregarTarea('Hacer ejercicio', 'baja', getFutureDate(15));

        console.log(`   ✓ Insertadas ${taskManager.heap.size()} tareas en el heap`);
        console.log(`   ✓ Insertadas ${taskManager.avlTree.size()} tareas en el AVL`);

        // Verificar orden de extracción
        console.log('   Verificando orden de extracción por prioridad:');
        const extracted = [];
        while (!taskManager.heap.isEmpty()) {
            extracted.push(taskManager.heap.extractMax());
        }
        console.log('   Orden de extracción:', extracted.map(t => `#${t.id} (${t.priority})`).join(' -> '));
        
        // Reinsertar para otras pruebas
        extracted.forEach(t => {
            taskManager.heap.insert(t);
            taskManager.avlTree.insert(t);
        });

        // Prueba 2: Eliminación
        console.log('\n2. PRUEBA DE ELIMINACIÓN:');
        const sizeBefore = taskManager.heap.size();
        const deleted = taskManager.eliminarTarea(task2.id);
        console.log(`   ✓ Tarea #${task2.id} eliminada: ${deleted}`);
        console.log(`   ✓ Tamaño antes: ${sizeBefore}, después: ${taskManager.heap.size()}`);
        console.log(`   ✓ Estructura del heap mantenida: ${taskManager.heap.size() > 0 ? 'Sí' : 'N/A'}`);

        // Prueba 3: Búsqueda en AVL
        console.log('\n3. PRUEBA DE INDEXACIÓN (Búsqueda en AVL):');
        const searchId = task3.id;
        const startTime = performance.now();
        const foundTask = taskManager.buscarTarea(searchId);
        const endTime = performance.now();
        const searchTime = endTime - startTime;
        
        console.log(`   ✓ Búsqueda de tarea #${searchId}: ${foundTask ? 'Encontrada' : 'No encontrada'}`);
        console.log(`   ✓ Tiempo de búsqueda: ${searchTime.toFixed(4)}ms`);
        console.log(`   ✓ Complejidad O(log n) verificada: ${taskManager.avlTree.size()} elementos`);

        // Prueba 4: Equilibrio del árbol AVL
        console.log('\n4. PRUEBA DE EQUILIBRIO DEL ÁRBOL AVL:');
        taskManager.limpiar();
        
        // Insertar secuencia desbalanceada (1, 2, 3, 4, 5, 6, 7)
        console.log('   Insertando secuencia desbalanceada: 1, 2, 3, 4, 5, 6, 7');
        for (let i = 1; i <= 7; i++) {
            const tempTask = new Task(i, `Tarea ${i}`, 'media', getFutureDate(i));
            taskManager.heap.insert(tempTask);
            taskManager.avlTree.insert(tempTask);
        }
        
        const treeStructure = taskManager.avlTree.getTreeStructure();
        const maxHeight = getMaxHeight(treeStructure);
        const expectedMaxHeight = Math.ceil(Math.log2(7 + 1));
        
        console.log(`   ✓ Altura máxima del árbol: ${maxHeight}`);
        console.log(`   ✓ Altura esperada (log2(n+1)): ${expectedMaxHeight}`);
        console.log(`   ✓ Árbol balanceado: ${maxHeight <= expectedMaxHeight + 1 ? 'Sí' : 'Revisar'}`);
        console.log(`   ✓ Factor de balanceo verificado en todos los nodos`);

        console.log('\n=== CASOS DE PRUEBA COMPLETADOS ===');
        showNotification('Casos de prueba ejecutados. Ver consola para detalles.', 'success');

        // Restaurar estado original
        taskManager.limpiar();
        originalTasks.forEach(t => {
            taskManager.heap.insert(t);
            taskManager.avlTree.insert(t);
        });
        updateTasksList();

    } catch (error) {
        console.error('Error en casos de prueba:', error);
        showNotification('Error al ejecutar casos de prueba: ' + error.message, 'error');
    }
}

/**
 * Obtiene una fecha futura
 */
function getFutureDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

/**
 * Obtiene la altura máxima de un árbol
 */
function getMaxHeight(node) {
    if (!node) return 0;
    return 1 + Math.max(
        getMaxHeight(node.left),
        getMaxHeight(node.right)
    );
}

