# Food-Ashurs
- 401 project , app that take the extra food exceeded in the local restaurants and give its to the needed people or charities to save the wasted food and help others. 

_________________________________________________________________________________________________

## Wire-Frame
- WireFrame ![alt text](assest/group.jpg)
- check list ![alt text](assest/group-check.jpg)

_________________________________________________________________________________________________
## Curuent Version (0.0.1)
* The Current version of this program is designed to create, read, update, delete and return data that used to select the food for client deppend on what hw choose 
* This API was designed to be extensible, so that multiple match types and scorecards/data-books can be supported in the future


__________________________________________________________________________________________________
## Architecture
 ![alt text](assest/diagram.png)


__________________________________________________________________________________________________

## Schema / Schema Diagram

#### Currently Deployed Schema Diagram
 ![alt text](assest/schema.PNG)


__________________________________________________________________________________________________

## Routes 
### POST api/v1/signup
* Provide username , password , email , role type as JSON


* Example Response (token) :
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF5bWFuamFtYWwxMTJAZ21haWwuY29tIiwiY2FwYWJpbGl0aWVzIjoiZG9ub3IiLCJpYXQiOjE1ODE4NDcwODh9.mWg7cX9DslxPfregEp_japAMEf0jTswTxnpLDAjguiU
```

### POST api/v1/signin
###### Required Data:
* Authorization header
* Provide username and password as JSON
* Example response:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF5bWFuamFtYWwxMTJAZ21haWwuY29tIiwiY2FwYWJpbGl0aWVzIjoiZG9ub3IiLCJpYXQiOjE1ODE4NDcwODh9.mWg7cX9DslxPfregEp_japAMEf0jTswTxnpLDAjguiU

```

### GET api/v1/users

Example response:
```
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

```

### CRUD api/v1/donor

Example response:
```
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

Example response:

```
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




