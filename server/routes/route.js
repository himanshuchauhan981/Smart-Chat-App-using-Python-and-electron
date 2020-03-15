const express = require('express')

const { userController } = require('../controllers')

module.exports = () =>{
    const router = express.Router()

    router.post('/signup',
        userController.signUp
    )

    router.post('/login',
        userController.login
    )

    router.get('/validateToken',
        userController.validateToken
    )

    router.get('/logout',
        userController.logoutExistingUser
    )

    return router
}