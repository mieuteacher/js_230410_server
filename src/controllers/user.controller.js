import userModel from "../models/user.model";

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
        console.log("res.body", req.body);
        try {
            let modelRes = await userModel.create(req.body)
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