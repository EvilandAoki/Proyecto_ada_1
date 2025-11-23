## Título del Proyecto: Implementación de Colas de Prioridad con Montículos y Árboles AVL para Indexación

# Descripción:

En este proyecto, los estudiantes diseñarán un sistema que integre montículos (heaps) para
gestionar colas de prioridad y árboles AVL para indexar una lista de objetos de manera
eficiente. El objetivo es desarrollar una aplicación que permita la inserción, eliminación y
recuperación óptima de elementos mediante estas estructuras de datos.

# Requerimientos Técnicos:
1. Cola de prioridad con montículos:
○ Implementar un montículo binario (min-heap o max-heap) que administre
tareas, eventos o solicitudes según su prioridad.
○ Implementar operaciones de inserción y extracción de elementos con prioridad.
○ Mantener la estructura del montículo tras cada operación.
2. Indexación con árbol AVL:
○ Construir un árbol AVL que almacene y ordene objetos por un identificador
único.
○ Implementar inserción, búsqueda y eliminación con reequilibrio automático del
árbol.
○ Garantizar una búsqueda eficiente (O(log n)) de elementos en la colección.
3. Operaciones fundamentales:
○ Insertar elementos en el sistema y almacenarlos en ambas estructuras de datos.
○ Eliminar el elemento de mayor prioridad en el montículo y actualizar la lista
indexada.
○ Buscar objetos en el árbol AVL usando su identificador único.
4. Casos de prueba:
○ Prueba de inserción: Ingresar múltiples tareas con diferentes prioridades y
verificar el orden de extracción.
○ Prueba de eliminación: Extraer elementos del montículo y asegurarse de que la
estructura se mantiene correctamente.
○ Prueba de indexación: Buscar elementos aleatorios en el árbol AVL y confirmar
tiempos de respuesta eficientes.
○ Prueba de equilibrio: Insertar una secuencia desbalanceada en el árbol AVL y
verificar que se reestructura adecuadamente.


# Objetivos de Aprendizaje:

● Comprender el funcionamiento de los montículos y su aplicación en colas de prioridad.
● Explorar la utilidad de los árboles AVL en sistemas de búsqueda eficiente.
● Desarrollar habilidades en la implementación y optimización de estructuras de datos
avanzadas.

# Caso de Uso: Gestión de Tareas en un Sistema de Productividad

Desarrollar un sistema para gestionar tareas pendientes en una aplicación de productividad.
Este sistema permitirá a los usuarios agregar, actualizar y completar tareas según su

# importancia y categoría.

# Descripción del Sistema:
● Tareas: Cada tarea tiene un identificador único, una descripción, una prioridad (baja,
media, alta) y una fecha de vencimiento.
● Estructuras de datos usadas:
○ Un montículo binario (heap) gestiona las tareas según su prioridad,
permitiendo acceder rápidamente a la tarea más urgente.
○ Un árbol AVL indexa las tareas por su identificador único, permitiendo
búsquedas eficientes.
● Operaciones básicas:
○ Agregar tarea: Se inserta en el heap y el árbol AVL.
○ Eliminar tarea: Se elimina del heap (cuando se marca como completada) y del
árbol AVL.
○ Buscar tarea: Se consulta el árbol AVL para encontrar una tarea por su
identificador.
○ Obtener tarea más prioritaria: Se extrae la tarea con mayor prioridad del heap.

# Ejemplo de Funcionalidad:

● Un usuario agrega tres tareas:
1. "Estudiar para el examen" (Prioridad: Alta, ID: 101)
2. "Comprar útiles escolares" (Prioridad: Media, ID: 102)
3. "Revisar correos electrónicos" (Prioridad: Baja, ID: 103)
● La tarea "Estudiar para el examen" será la primera en la cola de prioridad.
● Si el usuario busca la tarea con ID 102, el árbol AVL proporciona acceso inmediato.
● Cuando el usuario marca la tarea como completada, se elimina del heap y el árbol AVL
se ajusta automáticamente.
Grupo de 3 estudiantes para el desarrollo del proyecto
Lenguajes de Programación: Java, Python, C++ o javascript
Requiere tener una GUI.

Por favor añadir archivo Readme donde se indique como poner a funcionar el programa.