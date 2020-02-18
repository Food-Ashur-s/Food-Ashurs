# Food-Ashurs
- 401 project , app that take the extra food exceeded in the local restaurants and give its to the needed people or charities to save the wasted food and help others. 

_________________________________________________________________________________________________

## Curuent Version (0.0.1)
* The Current version of this program is designed to create, read, update, delete and return data that used to select the food for client deppend on what hw choose 
* This API was designed to be extensible, so that multiple match types and scorecards/data-books can be supported in the future


__________________________________________________________________________________________________
## Architecture
The base technologies are node.js server, node.http module, express middleware, and a mongo database
 ![alt text](assest/diagram.png) 

 ###### MiddleWare
 - basic auth middleware leverages two npm modules (bcrypt, jsonwebtoken
 - oauth middleware 
 - bearer middleware 
 - access control middleware 
 - A custom handle-errors module implements and extends the http-errors npm middleware package

 


 ###### Mongoose 
 Use this Method to create a new Schema in Mongo DataBase to execute CRUD operations on mongo documents.

 ![alt text]()



__________________________________________________________________________________________________

## Schema / Schema Diagram

#### Currently Deployed Schema Diagram
 ![alt text](assest/schema.PNG)


__________________________________________________________________________________________________

## Wire-Frame
wireFrame             |  checklist
:-------------------------:|:-------------------------:
![alt text](assest/group.jpg) |   ![alt text](assest/group-check.jpg) 
_________________________________________________________________________________________________
## Tree of our Project

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

This route will create a new user by providing a username, password, email in the body of the request. Creating a new user is required to store and access data later. This route must be completed before attempting to use the signin route.

A token will be returned that will only be used for the api/signin route. after signing-in, you will receive a new token that will be a reference for all future routes.



* Example Response (token) :
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF5bWFuamFtYWwxMTJAZ21haWwuY29tIiwiY2FwYWJpbGl0aWVzIjoiZG9ub3IiLCJpYXQiOjE1ODE4NDcwODh9.mWg7cX9DslxPfregEp_japAMEf0jTswTxnpLDAjguiU
```

### POST api/v1/signin
###### Required Data:
* Authorization header
* Provide username and password as JSON

This route will require an authorization header that needs to include the username:password of the specific user to be authenticated. Signing in will return a brand new token that will be used for future user ID reference.


* Example response:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF5bWFuamFtYWwxMTJAZ21haWwuY29tIiwiY2FwYWJpbGl0aWVzIjoiZG9ub3IiLCJpYXQiOjE1ODE4NDcwODh9.mWg7cX9DslxPfregEp_japAMEf0jTswTxnpLDAjguiU

```

### GET api/v1/users

to Read the Uers that signin on our application 

Example response:
```javascript
{
        "_id" : ObjectId("5e4660d1bec8a4107c1867e3"),
        "username" : "dodo",
        "role" : "donor",
        "email" : "s23horaora96n@hotmail.com",
        "password" : "$2a$10$B43S/MAg00kleHSjodBCNeIvM0lWqv7coXbDtKJ7kaQFbS0muWbXa",
        "__v" : 0
}
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

### CRUD api/v1/donor

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
- Returns undefined or null (the record is no longer in the database

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


### CRUD api/v1/recipient

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
- Returns undefined or null (the record is no longer in the database

can get , post , update ,delete on this route.

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
#### test all the route and the CRUD method
