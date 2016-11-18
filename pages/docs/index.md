---
title: Overview of Smooch
section: docs
layout: two-column
---

# Overview of Smooch
# API Quick Start
## Introduction
This quickstart will teach you to use Smooch's REST API, a Web messenger widget on a Website, and and some server-side code to create an auto response for when people send your business messages.

## Prerequisites
You should be able to follow along in node.js, or another programming language; you should also have [ngrok](https://ngrok.com) (which creates secure tunnels to localhost), or be otherwise able to deploy a server; and you should have already signed up for a Smooch account.

## Setting up a Web server
First we'll set up a Web server:

1. open a terminal in a new folder and initialize a new node.js project.

2. Install the Express framework `npm install --save express`

3. create an **index.js** file and an **index.html** file.

4. Let's create the skeleton of an HTML page in index.html:
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Hello Smooch</title>
    </head>
    <body>
        <h1>Hello Smooch</h1>
    </body>
    </html>
    ```
5. In the index.js file we'll create a web server and serve up our index.html skeleton on http://localhost:8000:
    ```javascript
    'use strict';
    const express = require('express');
    const app = express();

    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    app.listen(8000);
    ```

Now we can run your server with the command `node index.js`, and visit your skeleton page at http://localhost:8000. You should be greeted with a cheerful "Hello Smooch".

## Setting up the Smooch Web messenger

Now we'll add the Web Messenger to our skeleton page.

1. Login to your Smooch account and in the upper right hand corner of the overview page, create a new Smooch app.
    ![Create an app](images/create_app.png)

2. Now [connect the Web Messenger](https://app.smooch.io/integrations/web) from the Smooch integration marketplace.
    ![Smooch Marketplace](images/marketplace.png)

3. After we insert the code from the integration page into our skeleton page it should look something like this, but with your own app token:
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Hello Smooch</title>
    </head>
    <body>
        <h1>Hello Smooch</h1>
        <script src="https://cdn.smooch.io/smooch.min.js"></script>
        <script>
        Smooch.init({ appToken: 'YOUR_APP_TOKEN' });
        </script>
    </body>
    </html>
    ```

Now, when we refresh the at at http://localhost:8000, we'll see a little messaging widget in the lower lefthand corner of the page.

## Capturing Webhooks from Smooch

Webhooks are HTTP requests sent from Smooch to your server whenever certain events occur. We're interested in a Webhook that tells us whenever a user sends a message. Webhooks can be configured via the [Smooch REST API](http://docs.smooch.io/rest/#webhooks), but we will configure them via the UI in the quickstart.

1. First, we'll use [ngrok](https://ngrok.com) to expose our server. In a new terminal window run `ngrok http 8000`. You'll get a URL address that you can call to access your server. Try visiting that URL address in your browser instead of http://localhost:8000. You should see your page with the Web messenger in the corner.

2. Now we'll expose a new endpoint on our server to receive Webhook requests from Smooch to do this we'll add a new route at "/message" that handles POST requests. We'll also want to inspect the request body, so we'll import another npm package, body-parser `npm install --save body-parser`.
    ```javascript
    'use strict';
    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();

    app.use(bodyParser.json());

    app.post('/message', function(req, res) {
        const prettyJSON = JSON.stringify(req.body, null, 4);
        console.log(prettyJSON);
        res.end();
    });

    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    app.listen(8000);
    ```

3. Restart your server, and now we are logging the body of any POST request sent to your server at "/message".

4. Now we'll configure the Webhook in Smooch. Visit the [integration page for Webhooks](https://app.smooch.io/integrations/webhook). When you connect the Webhooks integration, enter the ngrok url you got in step 1, and include the "/message" route. So something like https://MY-NGROK-DOMAIN.ngrok.io/message. Make sure you have selected "App User Messages" from the trigger dropdown.
    ![Create a Webhook](images/create_webhook.png)

5. Now, whenever a message is sent from a user, we log the request in the terminal where you're running your server. So let's try that, open up the page with the Web messenger and send a message as a user! If you go check in the terminal, you'll see the request body logged.

## Calling the Smooch REST API

Now that we have a working server, and we're handling Webhook requests from Smooch, it's time to use the REST API to respond to the user whenever they send us a message.

1. To call the API we'll need to generate a secret key for Smooch. Go to the "settings" tab on your Smooch dashboard
    ![Smooch settings](images/settings.png)
    and generate a new key.
    ![Create a Secret Key](images/create_secret.png)

2. We'll import another npm package to make requests. We'll also need a package for generating [JSON Web Tokens](https://jwt.io/), which we'll be using to authenticate with Smooch. So let's install those packages `npm install --save request jsonwebtoken`.

3. Now let's use our secret key and key ID to generate a token that we can use to authenticate a request with Smooch.

    ```javascript
    'use strict';
    const jwt = require('jsonwebtoken');

    function generateToken(secret, keyId) {
        const body = { scope: 'app' };
        const config = {
            headers: {
                typ: 'JWT',
                kid: keyId,
                alg: 'HS256'
            }
        };

        return jwt.sign(body, secret, config);
    }
    ```

    We haven't integrated this code into our server yet, but this `generateToken` function will provide us with the JSON Web Token we need authenticate with Smooch when we use the API.

4. Now let's use the request library to send a message to a user via the Smooch REST API.

    ```javascript
    'use strict';
    const request = require('request');
    const jwt = require('jsonwebtoken');
    const express = require('express');
    const bodyParser = require('body-parser');

    const SECRET = 'YOUR SECRET';
    const KEY_ID = 'YOUR KEY ID';

    const token = generateToken(SECRET, KEY_ID);
    const app = express();

    app.use(bodyParser.json());

    app.post('/message', function(req, res) {
        const appUserId = req.body.appUser._id;
        request({
            method: 'POST',
            url: `https://api.smooch.io/v1/appusers/${appUserId}/messages`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            json: {
                role: 'appMaker',
                text: 'I hear what you\'re saying!'
            }
        }, function(err) {
            if (err) {
                console.log(err);
            }

            res.end();
        });
    });

    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    app.listen(8000);

    function generateToken(secret, keyId) {
        const body = { scope: 'app' };
        const config = {
            headers: {
                typ: 'JWT',
                kid: keyId,
                alg: 'HS256'
            }
        };

        return jwt.sign(body, secret, config);
    }
    ```
5. Restart your server, and send a new message! You should receive a response in the Web messenger on your page.


# Business Quick Start
