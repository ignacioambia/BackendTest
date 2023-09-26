# Orders

Manage orders with `/{{baseUrl}}/orders` Endpoints

## /{{baseUrl}}/orders (GET)
  Returns a list of all available orders.
  Deleted orders are still in DB.
## /{{baseUrl}}/orders/:id (GET)
  Returns the same result a the endpoint above but just the requested one
## /{{baseUrl}}/orders/ (POST)
   Creates a new order.

   **Payload:**
   ```json
   {
    "route": "6510923a481a0726c5dda217",
    "description": "Another type",
    "type": "type2"
   }
   ```
## /{{baseUrl}}/orders/:id (PUT)
  To edit an order, just send any of the keys sent in the order
## /{{baseUrl}}/orders/assign_truck/:id (PUT)
  Assigns a truck to the order.
  Truck is required to start order.
## /{{baseUrl}}/orders/start/:id (PUT)
  Starts the order, throws an error if order is already finished.
## /{{baseUrl}}/orders/end/:id (PUT)
  Ends an order. Will throw an error if order has not been started yet.
## /{{baseUrl}}/orders/:id (DELETE)
   Runs a logical erase to de order document setting key `deleted` to `true`.
   Will throw and error if order is still in proggress.

