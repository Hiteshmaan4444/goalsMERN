const moongoose = require('mongoose');

const connectDb = async ()=>{
    try {
        const conn = await moongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connected: ${conn.connection.host}`.cyan.underline);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports=connectDb;