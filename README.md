# Smart Building
Folder needs to be setup as npm
```bash
cd web
npm init
```

Keep pressing enter and you can change any thing you want to.

## Install Packages

```bash
npm install express --save
```

## Run Server

```
npm start
```

## Running api

You will have to replace mongo.connect command with your url so that the data can be uploaded to your database
Open a new terminal and switch to api folder

```bash
cd api
npm init
```

Install required packages

```bash
npm install express --save
npm install nodemon --save-dev
npm install mongoose --save
```
Run the api

```bash
npm start
```

Now do same with apis folder

```bash
cd apis
npm init
```

Install required packages

```bash
npm install express --save
npm install nodemon --save-dev
npm install mongoose --save
```

Run the api

```bash
npm start
``
## Running Tests

You need to switch to different folder and then run pacakges

```bash
cd tests 
npm init
npm install jest --save-dev
npm install axios --save-dev
```

Ruuning the tests

```bash
npm run test
```
