import express from 'express';
const app = express();
import dotenv from 'dotenv'
dotenv.config();
const port = process.env.PORT || 4400
import mongoose from 'mongoose'
import { MONGO_URI } from './config/db'

mongoose.connect(MONGO_URI)


app.use(express.json());

app.get('/test', (req, res) => {
    return res.status(200).json({Name:"prakash"})
})


import userRoutes from './routes/user' 
userRoutes(app)


app.listen(port, () => console.log(`Server started on http://localhost:${port}`));

mongoose.connection.on('connected', () => {
  console.info('Mongoose is connected✳️')
})

mongoose.connection.on('error', (err) => {
  console.error('mongoose connection error' + err.message)
})

mongoose.connection.on('disconnected', (err) => {
  console.error('mongoose connection is disconnected')
})
