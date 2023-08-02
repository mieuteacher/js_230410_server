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
    }
}