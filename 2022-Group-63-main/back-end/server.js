require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

const db = require("./models")
db.mongoose.set('strictQuery', true);

db.mongoose.connect(db.url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to the database!");
})
.catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
})

require("./routes/song.routes.js")(app);
require("./routes/artists.routes.js")(app);

app.listen(8000, () => console.log('Server running on port 8000'))  

