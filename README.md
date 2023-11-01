# hackathon
IIT Ropar hackathon

To run:
1) git clone
2) run npm i in both server and client folder
3) in the server/config directory, create a file called keys.js and enter your mongo database details in the following format :
module.exports = {
    mongoURI: YOUR_KEY,
    secretOrKey: ANY HASH FOR JWT
  };
4) run "npm run app" in server directory and "npm start" in client directory to start the server and client side frontend
