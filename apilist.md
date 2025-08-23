# DevMatch apis

## we will be using express router to manage these routes

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /Profile/view
- PATCH /profile/edit
- PATCH /profile/pasword

## ConnectionRequestRouter
- POST /request/send/:status/:userId

- POST /request/review/:status/:requestId


## userRouter
- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Gets you the profiles of other users on platform

status: ignore, interesteed, accepted, rejected

