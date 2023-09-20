# Trucks

The `{{baseUrl}}/trucks` URL contains endpoints related to trucks.


## Fetch all trucks

- **Endpoint:** `{{baseUrl}}/trucks` (GET)

  Returns an array of all the trucks. It does not require any payload.
  All trucks were imported using [MongoDb Compass][mongo-db-compass] from the provided [trucks.json][trucks]  file in this project.

- **Error handling:**
  It is required to send a JWT token in the request headers `Authorization` key.

  To get more information about how the token is obtained click [here][auth].

[mongo-db-compass]:https://www.mongodb.com/products/tools/compass
[trucks]: ../json/trucks.json
[auth]: ./auth.md
