const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Sagar',
        email: 'sagar@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    }
]

module.exports =users