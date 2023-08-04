/* Create Express Router */
import express from 'express'
const router = express.Router()

import userController from '../../controllers/user.controller';

router.get('/confirm/:token', userController.confirm)
router.post('/login', userController.login)
router.post('/authen-token', userController.authenToken)
router.post('/', userController.create)

export default router;