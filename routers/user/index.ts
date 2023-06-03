import express from 'express'
import tokenMiddle from '../../middleware/tokenMiddle'
import userController from '../../controllers/user/userController'
const router = express.Router()

// 用户登录
router.post('/login',userController.loginController)

router.post('/register',tokenMiddle.verify,userController.registerController)

export default router