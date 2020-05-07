# DN Test

---

Before we dive into the details, to run this test you must have these installed:

1. Node.js - v12.13.0
2. Yarn - v1.17.3

The language choosed was Javascript using Node.js (v12.13.0).

This test have is splited in a front-end and back-end application. 

The front-end is just a graphic interface for you to upload the ***.log** file into the back-end.

You can run this test in 2 ways. The first one is by using the graphic interface to upload the log file. The second one is by sending the log file through Postaman, Insomnia or even curl.

Using the first approach (interface):

1. Open the front-end folder in your terminal and run `yarn install` to install it's dependecies.
2. Now run `yarn start`
3. Open the back-end folder in another temrinal and run `npm install` to install it's dependencies.
4. Now runt `npm start`

Now the front-end and back-end will be up.

Front-end will be accessible by this [url](http://localhost:3000/) and noew you can use the browser to upload your log file.

By using the second approach, you just need to ignore the step 1 and 2. Then you will have to send the file by doing a `POST` request to the endpoint `http://localhost:3001/log` with the `Content-Type=multipart/form-data` header.

After you upload the ***.log** file it will generate the JSON report file into the **/back-end/report/report.json** folder.



