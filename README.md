# Github Users Explorer
A sample MEAN Stack application which does Oauth2 authentication and search github users, show their details, and generate a Bar chart of top 10 users which have highest followers using D3 Chart Framework.

## Installation:

```
npm install
```

## How to Run Project:

1. Start MongoDB on default port 27017
```
mongod --dbpath "$PWD"
```
2. Start Node Server
```
npm start
```

### Notes:

Application has callback URLs means if you load an authorised page it will load the login page first and after login it will take to the first request page instead of home page (Search Page). 
