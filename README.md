# Backend project

This is a node backend project to demonstrate my abilities as a backend developer at BeGo.
You can find this project deployed by entering to [this url][deploy-url]. Note that this url  points to `/orders` url but url for the projects is just `/`.
This folder is completely written using typescript.

This project works using [Express.js][express] and [MongoDB][mongo-cluster]

The app is separated into 5 different modules:
- Auth
- Points
- Trucks
- Routes
- Orders

You can get to know more about them going to the [docs folder][docs-folder].

## Run project for development
 In the root of the project run `npm run dev`. This will start running nodemong configured for typescript.
 Add a .env file at the root of the project with the following keys:
 ```.env
   MONGO_CONNECT=<your mongodb url/ database name (in my case prod or dev)>
   ENV=<dev or prod>
   GOOGLE_MAPS_API_KEY=google maps key
   JWT_SECRET_KEY=<A custom serial number to run the project>
```
## How to build project
 **Steps:**
 - Run `npm install` to install all dependencies for the project.
 - Run `npm run build` to run tsc to bundle our typescript code into javascript code.
 - Run `npm start` to start running the project. By default it will run in port `3000`.

## My process of deployment
 - Created an [EC2 instance][ec2] from AWS.
 - Created a [MongoDB] cluster where the information is stored.
 - Created a service inside my ec2 to always run my node project
 - In the [EC2 instance][ec2] I installed git and npm to get and isntall the project.
 - Every time i want a deploy i enter to the instance and run `npm i` then `npm run build`. This is enough so that the service running the project catches this changes and runs them in production now.
 - Created an `.env` file where sensible information is stored.
 - 


## The process of creating the project
 - Started a brand new project and installed [express][express], [mongoose][mongoose] & [typescript][typescript].
 - Created an `index.ts` file where all my routes are imported with a authorization middleware.
 - Created a `controller` file for every route.
 - Created a branch for every new module created.
 - Got a [Google maps API key][google-key] to access geolocation and distance between routes.
 - For every module in this project you will find a branch in this github repository.

## Things i would improve
 - Use camelCase instead of kebab-case as it is more common in javascript projects.
 - If i change a route, i am changing the route of all orders having that route.
 - Error logs is missing.
 - JWT tokens don't expire.
 - Centrailize the way  a `400` error status is sent.
 - Have a standard way to respond the user in a successfull petition.


[deploy-url]:http://54.82.238.8:3000/orders
[docs-folder]:./docs
[ec2]:https://aws.amazon.com/es/ec2/
[mongo-cluster]:https://www.mongodb.com/basics/clusters
[express]:https://expressjs.com/
[mongoose]:https://mongoosejs.com/
[typescript]:https://www.typescriptlang.org/
[google-key]:https://developers.google.com/maps/documentation/javascript/get-api-key?hl=es-419