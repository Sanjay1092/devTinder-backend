const express = require('express');
const app = express();
const port = 1010; 

app.use("/check",(req,res)=>{
res.send('Hello world from checking!')
})

app.use("/user",(req,res)=>{
res.send("Sanjay senthil !!")
})
app.use((req,res)=>{
    res.send('Hello world from server!')
})



app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})