require('dotenv').config();
const prisma = require('./src/db/db');
const app = require('./src/app');

const PORT=process.env.PORT || 3000;

async function startServer(){
    try{
        await prisma.$connect();
        console.log("database connected");
        
        app.listen(PORT,()=>{
            console.log("the server is running");
        })
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

startServer();