# 1) Functionality

## A user of the web application can use the interface to create, delete and complete a TODO item.

- before
![alt text](image-5.png)
- create
![alt text](image-6.png)
- complete
![alt text](image-10.png)
- delete
![alt text](image-11.png)

## A user of the web interface can click on a "pencil" button, then select and upload a file. A file should appear in the list of TODO items on the home page.
- before upload image
![alt text](image-7.png)
- after upload image
![alt text](image-8.png)
![alt text](image-9.png)

## If you log out from a current user and log in as a different user, the application should not show TODO items created by the first account.
- Account A
![alt text](image-2.png)
![alt text](image-9.png)
- Account B
![alt text](image-15.png)
![alt text](image-14.png)

## A user needs to authenticate in order to use an application.

![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)

# 2) Code Base

## Code of Lambda functions is split into multiple files/classes. The business logic of an application is separated from code for database access, file storage, and code related to AWS Lambda.
![alt text](image-13.png)

## To get results of asynchronous operations, a student is using async/await constructs instead of passing callbacks.
![alt text](image-16.png)

# 3) Best Practices

## All resources needed by an application are defined in the "serverless.yml". A developer does not need to create them manually using AWS console.
![alt text](image-17.png)

## Instead of defining all permissions under provider/iamRoleStatements, permissions are defined per function in the functions section of the "serverless.yml".
![alt text](image-18.png)

## Application has at least some of the following:

- Distributed tracing is enabled
![alt text](image-19.png)
![alt text](image-20.png)
- It has a sufficient amount of log statements
![alt text](image-21.png)
- It generates application level metrics
![alt text](image-23.png)
![alt text](image-22.png)

## Incoming HTTP requests are validated either in Lambda handlers or using request validation in API Gateway. The latter can be done either using the serverless-reqvalidator-plugin or by providing request schemas in function definitions.
![alt text](image-24.png)

# 4) Architecture

## 1:M (1 to many) relationship between users and TODO items is modeled using a DynamoDB table that has a composite key with both partition and sort keys. Should be defined similar to this:

```yaml
KeySchema:
  - AttributeName: partitionKey
    KeyType: HASH
  - AttributeName: sortKey
    KeyType: RANGE
```
![alt text](image-25.png)

## TODO items are fetched using the "query()" method and not "scan()" method (which is less efficient on large datasets)
![alt text](image-26.png)

## Endpoints:
```bash
REACT_APP_AUTH0_DOMAIN=dev-lmp38ykhjmlervzx.us.auth0.com
REACT_APP_AUTH0_AUDIENCE=https://dev-lmp38ykhjmlervzx.us.auth0.com/api/v2/
REACT_APP_API_ENDPOINT=https://awa26imicc.execute-api.us-east-1.amazonaws.com/dev
```