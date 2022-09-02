
Job Hunt Full Stack  MERN APP

Frontend - ReactJs

Backend- NodeJs and ExpressJs

Database-MongoDb


In this app user can search jobs using the categories and company.User can apply the jobs while registering himseelf and login to the app. By filling his /her profile he can also get the carrer advice according to their interest filled byu the user. User can also add the jobs to thier watchlist for future use.

In this app we have 4 Microservices:-

1)Authenctication api for sign in ,login using Passport Local and Google Oauth20 .

2)Profile Api for saving and modifying the user data.

3)Watchlist Api for adding the jobs to there watchlist.

4)Fetch Api for fetching the data from the server in the backend.

How to run this app.

Clone this repositry to your system
Build all the docker images using " docker build .t -"name of api" ". You have to build 5 docker images. 4 in backend and 1 in frontend.
3)Then run the "docker compose up" in your terminal to run the docker images in the docker container.
