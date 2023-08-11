### Orders

Para generar una nueva orden, podemos seguir el siguiente esquema:

Una orden contiene:

```
- Tipo (podes utilizar tipos definidos)
- Descripción
- Ruta = pickup (punto de partida) y dropoff (punto de entrega)
- Status (estado: podes utilizar Enums)
- Truck
```

Requerimientos:

- Realizar un CRUD para ordenes en el cual puedas cambiar el estado de una orden.
- Asignar un camión valido a una orden.
- Modificar una orden.
- Validar que no se pueda eliminar una orden con estado “En Progreso”.
- Crear al menos 3 ordenes con distintas rutas.
- No eliminar ni modificar una orden en curso.

Notas:

Recordá validar el usuario y token antes del consumo de cada EP.

