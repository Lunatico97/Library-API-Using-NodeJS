
//Just making sure what happens during authentication
//It didn't need to be this way, but I want myself to be authenticated for a good password, lol !
//Author: Diwas Adhikari
module.exports = {
    users: {
        login: {
            name: {
                required: true,
                type: 'string',
                message: 'Invalid name'
            },
            password: {
                required: true,
                message: 'Password cannot be empty'
            }
        },
        changePassword: {
            oldPassword: {
                required: true,
                min: 3,
                message: 'Invalid old password'
            },
            newPassword: {
                required: true,
                min: 3,
                message: 'Invalid new password'
            },
            confirmPassword: {
                required: true,
                min: 3,
                message: 'Invalid confirm password'
            }
        }
    }
};
