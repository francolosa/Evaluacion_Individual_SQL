const fs = require('fs');
const path = require('path');
let search = 0
module.exports = {
    index: (req,res)=>{
        res.render('index', {search})
        console.log('Se accedió al index')
    }
}