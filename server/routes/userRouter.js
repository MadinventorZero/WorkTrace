const userController = require('../controllers/userController');
const sessionController = require('./sessionController');
const userRouter = express.router();

// set cookie -> create user -> start session -> set SSID cookie
userRouter.post('/createUser', sessionController.setCookie, userController.createUser, (req, res) => {
  console.log("Reach User Add end of middleware")
  res.status(200).send('New User Successfully added!!!')
})

// set cookie -> check if logged In -> verify user (if not loggedin) -> start session (or renew session) - set (or renew) SSID cookie
userRouter.get('/verifyUser', sessionController.setCookie, sessionController.loggedIn, userController.verifyUser, sessionController.startSession, sessionController.setSSIDCookie,  (req, res) => {
  
})

// verify user -> update user password
userRouter.get('/updatePassword', userController.verifyUSer, userController.updateUserPassword, (req, res) => {
  
})

// verify user -> delete user
userRouter.delete('/deleteUser', userController.verifyUser, userController.deleteUser, (req, res) => {
  
})

module.exports = userRouter;