const express = require("express");
const connectDb = require("./db");
const app = express();
const PORT = 3000;


app.use(express.json());

connectDb().then(() => {

  //Adding port Number in server

  app.listen(PORT, () => {
    console.log(`Server is Connected on ${PORT}`);
  });
  
}).catch((error)=>{
  console.log(error.message);
});

// process.on("unhandledRejection",err =>{
//     console.log(`error detected${err.message}`);
//     server.close(()=>process.exit(1));
// })

app.use('/api/auth',require('./Auth/route'));


