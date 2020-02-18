# Food-Ashurs
- Application that takes extra food from local restaurants and gives it to people or charities of need.  This helps save wasted food and assists in the wellness of the local community. 

_________________________________________________________________________________________________

## Current Version (0.0.1)
* The Current version of this application is designed to create, read, update, and delete data that is used to select food for clients, depending on what they choose
* This API was designed to be extensible, so that multiple match types and data sources can be supported in future installments

- Application Repository: [https://github.com/Food-Ashur-s/Food-Ashurs/tree/master]
- Chat Repository: [https://github.com/Food-Ashur-s/Food-Chat]
__________________________________________________________________________________________________
## Architecture
The base technologies used in this application are `node.js`, it's built-in `http` module, `express.js` and it's middleware methods, and a `mongoDB` database
 ![alt text](assest/diagram.png) 

 ###### MiddleWare
 - Basic authorization middleware leverages two npm modules: `bcrypt` and `jsonwebtoken`
 - Custom built Google OAuth middleware 
 - Custom built Bearer authentication middleware 
 - Custom built access control middleware 
 - A custom built error handling module that implements and extends the `http-errors` npm middleware package

 
##### Models
- This application has a dynamic `Model` constructor for re-usability and scalability


 ###### Mongoose 
 - This application uses the following method to create a new `mongoose.Schema` in the MongoDB DataBase.  It is used to execute CRUD (create, read, update, and delete) operations on MongoDB documents.

 ![alt text](assest/mongoose-frame.PNG)



__________________________________________________________________________________________________

## Schema / Schema Diagram

#### Currently Deployed Schema Diagram
 ![alt text](assest/schema.PNG)


__________________________________________________________________________________________________

## Wireframe UML
wireFrame             |  checklist
:-------------------------:|:-------------------------:
![alt text](assest/group.jpg) |   ![alt text](assest/group-check.jpg) 
_________________________________________________________________________________________________

## Trello Board
 Link: [https://trello.com/b/oxTEvJTl/food-ashurs]

_______________________________________________________________________________________________

## Application File Tree

```
├── package-lock.json
├── package.json
├── public
│   └── index.html
└── src
    ├── Api
    │   ├── donor
    │   │   ├── donor-schema.js
    │   │   └── donor.js
    │   ├── model.js
    │   ├── recipient
    │   │   ├── recipient-schema.js
    │   │   └── recipient.js
    │   └── v1.js
    ├── auth
    │   ├── acl-middleware.js
    │   ├── basic-auth-middleware.js
    │   ├── bearer-auth-middleware.js
    │   ├── oauth-middleware.js
    │   ├── routes.js
    │   └── users.js
    ├── middleware
    │   ├── 404.js
    │   └── 500.js
    └── server.js
```

__________________________________________________________________________________________________

## Routes 
### POST api/v1/signup
* Provide username , password , email , role type as JSON

{"username": "userone", "password": "userpassword", "email" : "userone@gmail.com" }

This route will create a new user by providing a username, password, and email in the body of the request. Creating a new user is required to store and access data later. This route must be completed before attempting to use the signin route.

A token will be returned that will only be used for the api/signin route. After signing-in, you will receive a new token that will be a reference for all future routes.



* Example Response (token) :
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF5bWFuamFtYWwxMTJAZ21haWwuY29tIiwiY2FwYWJpbGl0aWVzIjoiZG9ub3IiLCJpYXQiOjE1ODE4NDcwODh9.mWg7cX9DslxPfregEp_japAMEf0jTswTxnpLDAjguiU
```

### POST api/v1/signin
###### Required Data:
* Authorization header
* Provide username and password as JSON

This route will require an authorization header that needs to include the `username:password` of the specific user to be authenticated. Signing in will return a brand new token that will be used for future user ID reference.


* Example response:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF5bWFuamFtYWwxMTJAZ21haWwuY29tIiwiY2FwYWJpbGl0aWVzIjoiZG9ub3IiLCJpYXQiOjE1ODE4NDcwODh9.mWg7cX9DslxPfregEp_japAMEf0jTswTxnpLDAjguiU

```

### GET api/v1/users

To read the users information on signin of our application 

Example response:
```javascript
{
        "_id" : ObjectId("5e491a81ff54ad47735fc19d"),
        "username" : "userone",
        "password" : "$2a$10$7spT7maaDOycpjOH252oMOKGTodx5E2.MHefPV.Zc9nIiiHrqD6RG",
        "email" : "userone@gmail.com",
        "role" : "donor",
        "__v" : 0
}
{
        "_id" : ObjectId("5e491aa8ff54ad47735fc19f"),
        "username" : "usertwo",
        "password" : "$2a$10$uSCj1DPDpBXQZQcgZzcNjOSzQsqCbNKHlGJ3hqXsbr4vk.FSmCUYO",
        "email" : "usertwo@gmail.com",
        "role" : "recipient",
        "__v" : 0
}

```

## CRUD api/v1/donor

###### GET/api/v1/donor
Returns an object with 2 keys: count (number) and results (array of objects/records from the database)

###### GET/api/v1/donor/ID
- Takes an ID as a route parameter
- Returns a single object (the record from the database)

###### POST/api/v1/donor
- Accepts a full record object to be added to the DB as the request body
- Returns a single object (the record added to the database)

###### PUT/api/v1/donor/ID
- Takes an ID as a route parameter
- Accepts a full record, including id, to be updated as the request body
- Returns a single object (the record as updated in the database)

###### DELETE/api/v1/donot/ID
- Takes an ID as a route parameter
- Returns `undefined` or `null` (the record is no longer in the database)

#### Example response:
```javascript
{
        "_id" : ObjectId("5e491b4dff54ad47735fc1a0"),
        "name" : "sawsen restaurant",
        "type" : "eastern food",
        "available_time" : "1pm-10pm",
        "amount" : "8 people",
        "__v" : 0
}
```


## CRUD api/v1/recipient

###### GET/api/v1/recipient
Returns an object with 2 keys: count (number) and results (array of objects/records from the database)

###### GET/api/v1/recipient/ID
- Takes an ID as a route parameter
- Returns a single object (the record from the database)

###### POST/api/v1/recipient
- Accepts a full record object to be added to the DB as the request body
- Returns a single object (the record added to the database)

###### PUT/api/v1/recipient/ID
- Takes an ID as a route parameter
- Accepts a full record, including id, to be updated as the request body
- Returns a single object (the record as updated in the database)

###### DELETE/api/v1/recipient/ID
- Takes an ID as a route parameter
- Returns undefined or null (the record is no longer in the database)

Example response:

```javascript
{
        "_id" : ObjectId("5e491b7eff54ad47735fc1a1"),
        "name" : "sahora",
        "requestType" : "eastern food",
        "identity" : "person",
        "contactNumber" : "077xxxxxxx",
        "description" : "i am so hungry",
        "__v" : 0
}
```

# Testing
### Testing with mockRequest
- jest
- eslint
#### Tests all routes and their related CRUD operations

## Resources
- Chat Channel :
1. Resource: [https://github.com/LTUC/amman-javascript-401d1/tree/master/class-17]
2. Resource: [https://www.youtube.com/watch?v=Ass3WWasUWo]
- Google Api : [https://developers.google.com/identity/protocols/OAuth2]
- Swagger Inspector tool to test our API endpoints: [https://inspector.swagger.io/builder]

## Group Members
- Ayman Khawaldeh : [https://github.com/aymankhawaldeh]
- Qusai Hanktah : [https://github.com/Qusai-alhanaktah]
- Nawal Suliman : [https://github.com/Nsuliman]
- As-Har Oran : [https://github.com/ASHARALORAN96]

## Communication:
We communicated and shared resources through a group Slack channel. We also organized tasks through the use of Trello.

We hosted an internal check-in meeting each morning, for each member, to update the team on their progress with any/all tasks or deliverables. Any edits to the project plan will be made as a result of these daily check-ins. We concluded each meeting with a reflection and afinal update of our Trello board.
 
## Technology and Tools:
The Organization was created by our team member Nawal, with all other members added as admin users. The Trello board was also created by Nawal, with all other members added as admin users for consistency in project management. Our application will soon be deployed on Heroku.
