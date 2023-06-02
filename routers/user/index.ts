import express from 'express'

import userController from '../../controllers/user/userController'
const router = express.Router()

// 用户登录
router.post('/login',userController.loginController)

router.post('/register',userController.registerController)

export default router