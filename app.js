const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.send(error.message)
})

app.listen(3000)