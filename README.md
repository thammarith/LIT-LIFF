# LIFF app

## Deploy methods

### Install the app on your local machine

1. Make sure you have the following installed.

   - [Git](https://git-scm.com/)
   - [Node.js](https://nodejs.org/en/)

2. Clone the this repository.

```shell
git clone https://github.com/thammarith/LIT-LIFF.git
```

3. `cd` into `LIT-LIFF` directory.

4. Install the dependencies by running:

```shell
npm install
```

5. Change the `apiUrl` in `LIT-LIFF/public/connect-api.js` to `https://{NAME_OF_THE_APP}.herokuapp.com` that you got from installing [`LIT-api`](https://github.com/thammarith/LIT-api)

### Link your local repository to Heroku

1. Log in to Heroku from the command line.

```shell
heroku login
```

2. Create a named Heroku app.

```shell
heroku create {Heroku app name}
```

3. Take a note of your app's URL (`https://{Heroku app name}.herokuapp.com`). You'll need it when you add the app to LIFF.

4. Add a remote for Heroku to your local repository.

```shell
heroku git:remote -a {Heroku app name}
```

### Add the starter app to LIFF

1. Follow the instructions on the page [Adding a LIFF app](https://developers.line.biz/en/docs/liff/registering-liff-apps/).

2. Take a note of your LIFF ID, because you'll need it for the next part. The LIFF ID is the final part of the LIFF URL shown in the console: `line://app/{liffId}`

### Customize and deploy the app via terminal

1. Set your LIFF ID using an environment variable for local testing.

Heroku recommends setting up an `.env` file to use an environment variable in a local environment.

```shell
heroku config:get MY_LIFF_ID={liffId} -s  >> .env
```

Note: Don't commit the `.env` file to GitHub. To exclude it, add the `.env` file to your `.gitignore`.

2. Customize your app. For more information about available LIFF methods, see [API reference](https://developers.line.biz/en/reference/liff/). 

3. Run the app locally to preview your changes:

```shell
heroku local
```

View the app by browsing to [localhost:5000](http://localhost:5000/).

4. Set your LIFF ID using an environment variable for production.

```shell
heroku config:set MY_LIFF_ID={liffId}
```

5. If you're happy with your changes, stage, commit, and deploy the app.

```shell
git add .
git commit -m "Initialisation"
git push heroku master
```

6. Browse to your app's URL (`https://{Heroku app name}.herokuapp.com`) and confirm that your app is operational.

7. Send the url `line://app/{liffId}` to your LINE chat to use the application

## Trying the app

### Try the app in LINE

You can open your LIFF app in LINE by creating a simple link from any chat:

1. In any LINE chat, type `line://app/{liffId}` and send the message. (For example, if your LIFF ID is `123`, send the message `line://app/123`.)
2. Tap the link in your own message.
3. Agree to grant the required permissions to the LIFF app.

### Try the app in your browser

To open your LIFF app in your browser, enter the app's Heroku URL: `https://{Heroku app name}.herokuapp.com`
