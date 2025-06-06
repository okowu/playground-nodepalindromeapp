# node palindrome app

This is sample NodeJS app that expose a REST service to record and list string values and wether or not they are palindrome.

# REST API Structure

The REST API is composed of 4 routes

- GET /api/v1/messages - returns a list of messages
- POST /api/v1/messages - create a message
- GET /api/v1/messages/ID  - get a single message
- DELETE /api/v1/messages - delete a message

# How to run the app

The application can be run locally using `node server.js` and will be reachable on `http://localhost:8080/
The host and port can be changed by adding an .env file with `IP` and `PORT` variables

The application can be run in a docker container via the provided Dockerfile, The exposed port is 8080.
Example: `docker run -p {PORT}:8080 image:tag`

The application can be run in a kubernetes cluster by applying the provided yml file in the `k8s` folder,
or by installing the helm chart in the `helm` folder.

# Improvements

- Add a docker-compose file
- Add API documentation with openapi swagger
- Add missing tests coverages
- Improve the CI
  - add a linter for example
- Improve the CD
  - 
