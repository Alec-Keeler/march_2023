// const jwt = require('jsonwebtoken')

// const token = jwt.sign({id: 1, username: 'Alec'}, 'password')

// console.log(token)

// jwt.verify(token, 'password', (err, payload) => {
//     console.log(payload)
// })

const bcrypt = require('bcryptjs')

// const hashPass = async(password) => {
//     const hash = await bcrypt.hash(password, 12)

//     console.log(hash)
// }

// hashPass('password123')

// $2a$08$E5iAfBsvxZaxh48dl5HGGeQ8Vk7NjlXP0qTcHuf0wU5WmFKgN7VKq
// alg
    // cost factor
        // next 22 char - salt
            // remaining characters - hash


const comparePass = async(password, hashedPassword) => {
    const isPass = await bcrypt.compare(password, hashedPassword)
    console.log(isPass)
}

comparePass('password123', '$2a$08$E5iAfBsvxZaxh48dl5HGGeQ8Vk7NjlXP0qTcHuf0wU5WmFKgN7VKq')