import userModel from "../models/user.model";
import mailService from '../services/mail';
import ejs from 'ejs'
import path from 'path'
import jwt from '../services/jwt';

export default {
    read: async (req, res) => {
        try {
            let modelRes = await userModel.read()
            res.status(modelRes.status ? 200 : 413).json(modelRes)

        } catch (err) {
            return res.status(500).json(
                {
                    message: "Bad request !"
                }
            )
        }
    },
    create: async (req, res) => {
        try {
            let modelRes = await userModel.create(req.body)

            /* Xử lý email */
            try {
                if (modelRes.status) {
                    let token = jwt.createToken({
                        user_name: req.body.user_name,
                        email: req.body.email
                    }, 300000)

                    if (!token) {
                        return res.status(200).json({
                            message: "Đăng ký thành công, nhưng gửi mail thất bại!"
                        })
                    }
                    let template = await ejs.renderFile(
                        path.join(__dirname, "../templates/email_confirm.ejs"), 
                        {user: req.body, token}
                    )

                    if (modelRes.status) {
                        let mailOptions = {
                            to: req.body.email,
                            subject: "Xác thực email!",
                            html: template
                        }
                        let mailSent = await mailService.sendMail(mailOptions);
                        if(mailSent) {
                            modelRes.message += " Đã gửi email xác thực, vui lòng kiểm tra!"
                        }
                    }
                }
            }catch(err) {
                modelRes.message += " Lỗi trong quá trình gửi mail xác thực, bạn có thể gửi lại email trong phần profile"
            }

            res.status(modelRes.status ? 200 : 413).json(modelRes)
        } catch (err) {
            return res.status(500).json(
                {
                    message: "Lỗi xử lý!"
                }
            )
        }
    },
    confirm: async (req, res) => {
        let decode = jwt.verifyToken(req.params.token)
        console.log("decode", decode)
        if (!decode) {
            return res.send("Email đã hết hiệu lực!")
        }
        try {
            let modelRes = await userModel.confirm(decode)

            res.status(modelRes.status ? 200 : 413).json(modelRes)

        } catch (err) {
            return res.status(500).json(
                {
                    message: "Bad request !"
                }
            )
        }
    },
}

