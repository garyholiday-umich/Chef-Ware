# HTTP Server for the API (Node.js)

> We are using Mongoose as a layer on top of MongoDB to interact with the database. This is better because it is an ODM which helps with type casting and validating input & such (from my understanding).

This will be the http server our api endpoints will redirect to from the amazon api gateway. 

We are heavily following this guide: http://bigspaceship.github.io/blog/2014/05/14/how-to-create-a-rest-api-with-node-dot-js/

## Getting Started

> Run an ```npm install``` win the ```http-server``` directory, because this is the root of the server. It will install the dependencies defined in the package.json file.

## To-Do

- (Done) Figure out how to have the hyphens in the fields for the mongoose schemas (i.e. - "api-name"), as well as arrays.
- Make sure all of the typing is compatable with the already written functions.
- Make it an HTTP api, so that you don't have to send a body you can just ping it with a url

## Notes

- So our schema returns both the components and ingredients fields for all food queries, but it doesn't insert those fields into the document if it doesn't already have it.
- If you SEND the incorrect field to the api, it will create the key in the object though. to prevent this, we changed the query to make sure it has that key before updating the item. the application needs only esnd the restaurant and the food_id for the item being updated.

## Resources
this is a cool tool to generate gitignore files: https://www.gitignore.io/
this is useful for creating aws IAM policies: https://awspolicygen.s3.amazonaws.com/policygen.html


## Questions
- is there a webhook for AWS ECS and Docker, or does it pull the new image every time?
- can we serve our container over https?

