const mongoose = require('mongoose')

mongoose.set('useNewUrlParser',true)
mongoose.set('useUnifiedTopology',true)

const url = 'mongodb://smart-chat-admin-0018:smart-chat-admin-0018@ds349618.mlab.com:49618/smart-chat'

mongoose.connect(url, (err,conn) => {
    if (err) {
        console.log('Mongo error ', err)
    }
    else {
        console.log('Mongoose Connection is Successful')
    }
})