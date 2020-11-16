const fs = require('fs');
const path = require('path');

module.exports = {
    users: (req,res)=>{
        res.render('users')
        console.log('Se accedió a users')
    }
}