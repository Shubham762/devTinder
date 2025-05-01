# DevTinder API


## authRouter
POST/signup
POST/login
POST/logout

## profileRouter
GET/profile/view
PATCH/profile/edit
PATCH/profile/password


## connectionRequestRouter
POST/request/send/interested/:userId
POST/request/send/ignored/:userId
POST/request/review/accepted/:requestId
POST/request/review/rejected/:requestId


## userRouter
GET/user/connection
GET/user/request/received
GET/user/feed   -gets you the profile of other users on the platform

