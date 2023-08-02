/* Create Express Router */
import express from 'express'
const router = express.Router()

import userController from '../../controllers/user.controller';

router.get('/', userController.read)

export default router;