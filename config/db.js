const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGOURI, 
            {   useCreateIndex: true, 
                useNewUrlParser: true, 
                useFindAndModify:false,
                useUnifiedTopology: true });
        console.log(`DB Connected ${conn.connection.host}`.yellow.bold);
    } catch (error) {
        console.log(error);
        console.log("Error Connectiong Mongo DB");
    }
}

module.exports = connectDB