import express from 'express'
import mongoose  from 'mongoose'
import config  from './config/config.js';
import serverConfig from './frameworks/webserver/server.js'
import routes from './frameworks/webserver/routes/index.js'
import 'dotenv/config';



const app = express();

app.get("/",(req,res)=>{
    res.send({msg:"success "})
})

serverConfig(app, mongoose, config).startServer()
app.use(express.json());

routes(app,express)