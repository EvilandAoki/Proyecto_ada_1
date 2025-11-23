# Sistema de Gestión de Tareas con Heap y Árbol AVL

## 📋 Descripción del Proyecto

Este proyecto implementa un sistema de gestión de tareas que utiliza dos estructuras de datos avanzadas:

- **Montículo Binario (Max-Heap)**: Gestiona las tareas según su prioridad, permitiendo acceso rápido a la tarea más urgente.
- **Árbol AVL**: Indexa las tareas por su identificador único, garantizando búsquedas eficientes en O(log n).

El sistema mantiene sincronización automática entre ambas estructuras de datos, asegurando consistencia en todas las operaciones.

## 🚀 Cómo Ejecutar el Programa

### Requisitos
- Un navegador web moderno (Chrome, Firefox, Edge, Safari)
- No se requieren dependencias externas ni instalaciones

### Instalación y Ejecución

1. **Clonar o descargar el proyecto**
   ```bash
   git clone <url-del-repositorio>
   cd Proyecto_ada_1
   ```

2. **Abrir la aplicación**
   - Simplemente abre el archivo `index.html` en tu navegador
   - O si prefieres usar un servidor local:
     ```bash
     # Con Python 3
     python -m http.server 8000
     
     # Con Node.js (si tienes http-server instalado)
     npx http-server
     
     # Luego abre: http://localhost:8000
     ```

3. **¡Listo!** La aplicación está funcionando.

## 📁 Estructura del Proyecto

```
Proyecto_ada_1/
│
├── index.html              # Página principal de la aplicación
├── visualization.html      # Página de visualización de estructuras
├── README.md               # Este archivo
│
├── css/
│   └── styles.css          # Estilos de la aplicación
│
└── js/
    ├── models/
    │   └── Task.js          # Clase que representa una Tarea
    │
    ├── data-structures/
    │   ├── Heap.js          # Implementación del Montículo Binario (Max-Heap)
    │   └── AVLTree.js       # Implementación del Árbol AVL
    │
    ├── core/
    │   └── TaskManager.js   # Sistema de gestión que integra Heap y AVL
    │
    ├── visualization/
    │   ├── heapVisualizer.js    # Visualizador del Heap
    │   └── avlVisualizer.js     # Visualizador del Árbol AVL
    │
    ├── utils/
    │   ├── idGenerator.js   # Generador de IDs únicos
    │   └── validators.js    # Validadores de datos de entrada
    │
    └── main.js              # Lógica principal de la interfaz
```

## 🎯 Funcionalidades

### Operaciones Básicas

1. **Agregar Tarea**
   - Inserta la tarea en el Heap (ordenada por prioridad)
   - Inserta la tarea en el Árbol AVL (indexada por ID)
   - Campos requeridos: descripción, prioridad (alta/media/baja), fecha de vencimiento

2. **Buscar Tarea por ID**
   - Utiliza el Árbol AVL para búsqueda eficiente O(log n)
   - Muestra todos los detalles de la tarea encontrada

3. **Editar Tarea**
   - Permite modificar descripción, prioridad y fecha de vencimiento
   - Si cambia la prioridad, reordena automáticamente el Heap
   - Mantiene sincronización con el Árbol AVL

4. **Eliminar Tarea**
   - Elimina la tarea de ambas estructuras de datos
   - Mantiene la integridad de las estructuras tras la eliminación

5. **Obtener Tarea Más Prioritaria**
   - Extrae la tarea con mayor prioridad del Heap sin eliminarla
   - Muestra la información de la tarea

6. **Completar Tarea Más Prioritaria**
   - Extrae y elimina la tarea con mayor prioridad
   - Actualiza ambas estructuras de datos

### Visualización de Estructuras

- **Página de Visualización**: Accede desde el botón "Ver Estructuras de Datos"
- **Visualización del Heap**: Muestra la estructura como array y como árbol binario
- **Visualización del Árbol AVL**: Renderiza el árbol con nodos, conexiones y factores de balanceo

### Casos de Prueba

El sistema incluye casos de prueba integrados que verifican:
- ✅ Inserción múltiple con diferentes prioridades
- ✅ Orden de extracción por prioridad
- ✅ Eliminación y mantenimiento de estructura
- ✅ Búsqueda eficiente en Árbol AVL
- ✅ Equilibrio automático del Árbol AVL

## 🔧 Características Técnicas

### Montículo Binario (Max-Heap)
- **Tipo**: Max-Heap (mayor prioridad en la raíz)
- **Operaciones**:
  - `insert()`: O(log n)
  - `extractMax()`: O(log n)
  - `peek()`: O(1)
  - `remove()`: O(log n)
- **Propiedad**: Mantiene la propiedad de montículo tras cada operación

### Árbol AVL
- **Características**: Auto-balanceado
- **Operaciones**:
  - `insert()`: O(log n)
  - `search()`: O(log n)
  - `delete()`: O(log n)
- **Rotaciones**: Implementa rotaciones simples y dobles para mantener el balanceo
- **Garantía**: Altura máxima = O(log n)

### Sincronización
- Todas las operaciones mantienen ambas estructuras sincronizadas
- Los datos se almacenan en memoria (se pierden al cerrar la aplicación)

## 📊 Modelo de Datos

Cada **Tarea** contiene:
- `id`: Identificador único (generado automáticamente)
- `description`: Descripción de la tarea
- `priority`: Prioridad (alta, media, baja)
- `dueDate`: Fecha de vencimiento (formato YYYY-MM-DD)

## 🎨 Interfaz de Usuario

- **Diseño moderno y responsivo**: Se adapta a diferentes tamaños de pantalla
- **Códigos de color por prioridad**:
  - 🔴 Alta: Rojo
  - 🟡 Media: Amarillo
  - 🟢 Baja: Verde
- **Notificaciones**: Mensajes de éxito y error
- **Validaciones**: Validación en tiempo real de los datos de entrada

## 🧪 Ejecutar Casos de Prueba

1. Haz clic en el botón **"Ejecutar Casos de Prueba"**
2. Abre la consola del navegador (F12) para ver los resultados detallados
3. Los casos de prueba verifican:
   - Inserción múltiple
   - Eliminación
   - Búsqueda en AVL
   - Equilibrio del árbol

## 📝 Notas Importantes

- **Datos en memoria**: Los datos se pierden al cerrar la aplicación
- **Sin base de datos**: No requiere conexión a base de datos ni API
- **JavaScript puro**: Implementado sin frameworks ni dependencias externas
- **Navegador moderno**: Requiere soporte para ES6+

## 👥 Autores

Proyecto desarrollado por un grupo de 3 estudiantes para el curso de Estructuras de Datos.

## 📄 Licencia

Este proyecto es de uso educativo.

---

**¡Disfruta explorando las estructuras de datos!** 🚀

