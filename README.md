# Adress Conversion   
Simple RESTFul API for address conversion   
This repository used for technical selection of Software Engineer (NodeJS) position at PT. Kasir Pintar Internasional   
## Tech Stack
  * NPM
  * ExpressJS
  * MongoDB 
  * JWT
## Tools Used 
  * VSCode
  * Git
  * Github
  * Postman
## Status Code  
  * 200 `OK`
  * 201 `Created`
  * 400 `Bad Request`
  * 401 `Unauthorized`
  * 403 `Forbidden`
  * 404 `Not Found`
  * 422 `Unprocessable Entity`
## How to use   
  * Clone this repository to your local machine directory with command    
  `git clone https://github.com/Avlach30/adress-conversion.git`  
  * After cloned, install existing depedencies with command     
  `npm install`
  * After installed, you can run this project for development purposes with command `npm run start-dev`  
  * If you want run this project directly without development update, you can command it with `npm run start`
  * Hooray!, this app can running locally   
## How to test this repository in postman
  * Just import this [file](adress-conversion.postman_collection.json) to your postman workspace, so you can test this repository in postman app.
## Important notes
  * To access enpoint of get single address, you must logged in as `john doe` user.   
  Otherwise, a response will be 403 for forbidden or no permission to access.
  * To access enpoint of get all sub district from single city, you must logged in as `rocketmail` user.    
  Otherwise, a response will be 403 for forbidden or no permission to access.
  * For login with certain account, you can look credential [here](#login-data-for-implement-auhtorization).
## Login data (for implement auhtorization)   
  * Rocketmail
  ```
  "email": "rocketmail@gmail.com",
  "password": "rocketmail99!"
  ```
  * John doe
  ```
  "email": "johndoe@gmail.com",
  "password": "johndoe99!"
  ```
