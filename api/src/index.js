const express = require('express');
const route = require('./route');
const mongoose = require('mongoose');
const app = express();
var cors = require('cors')

app.use(express.json());
app.use(cors())



mongoose.connect("mongodb+srv://Bidipta-BG:wHFCxvYIKQmhPro5@cluster0.n5vfx.mongodb.net/FeymannDashboard", {
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route)


app.listen(process.env.PORT || 4000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 4000))
});