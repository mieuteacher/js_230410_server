/* Create Express Router */
import express from 'express'
const router = express.Router()

import userController from '../../controllers/user.controller';

router.get('/confirm/:token', userController.confirm)
router.get('/', userController.read)
router.post('/', userController.create)

export default router;