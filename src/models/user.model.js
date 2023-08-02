import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

let users = [
    {
        id: 1,
        name: "Abc"
    },
    {
        id: 1,
        name: "Xyz"
    }
];

export default {
    read: async () => {
        return {
            status: true,
            messsage: "Read users success !",
            data: users
        }
    }, 
    create: async (newUser) => {
        try {
           let user = await prisma.users.create({
            data: newUser
           })
           
           return {
                status: true,
                message: "Register thành công! Vui Lòng kiểm tra email"
           }
        }catch(err) {
            return {
                status: false,
                message: "Lỗi truy vấn!"
            }
        }
    }
}