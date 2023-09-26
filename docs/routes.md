

# Routes

The `{{baseUrl}}/routes` URL contains endpoints related to manage routes.

get '/coordinates/:id',
get /distance/:id,
post "/
put "/:id",
delete "/:id",

## /routes (GET)

  Use this endpoint when you need to get all routes available. A payload is not required.

## /routes/:id (GET)

Returns the details of a route given the `id` in params. A payload is not required.


- **Error handling:**
  - Checks if params in request are valid.
  - Checks if received id exists

 ##  routes/coordinates/:id (GET)
  Returns an order with the coordinates on each point.

## /routes/distance/:id (GET)
 Return the required order with the distance between the two points using google maps API
## /routes (POST)
 Creates a new route, if route points already exist an errors is sent.
## /routes/:id (PUT)
 Edits a route, comes with the same validations as the creation of a new order.
## /routes/:id (DELETE)
 Executes a logical erase of the route

  
  
> **Warning:** Services `/coordinates/:id (GET)` and `/distance/:id (GET)` will fail and throw error 500 if place id is wrong.

> In order to get the geolocation of points and the distance of a route [@googlemaps/google-maps-services-js][npm-maps] was used

[npm-maps]: https://www.npmjs.com/package/@googlemaps/google-maps-services-js
