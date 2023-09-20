# Points
Points make reference to the geographical location, to locations make a route for an order.

The `{{baseUrl}}/points` URL contains endpoints related to the points .


## Fetch all points

- **Endpoint:** `{{baseUrl}}/points` (GET)

  Returns an array of all the points. It does not require any payload.
  All points were imported using [MongoDb Compass][mongo-db-compass] from the provided [points.json][points]  file in this project.

- **Error handling:**
  It is required to send a JWT token in the request headers `Authorization` key.

  To get more information about how the token is obtained click [here][auth].

[mongo-db-compass]:https://www.mongodb.com/products/tools/compass
[points]: ../json/points.json
[auth]: ./auth.md
