import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { carRoute } from './routes/carRoute.js';
import { messageRoute } from './routes/messageRoute.js'
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/user', userRoute)
app.use('/api/car', carRoute)
app.use('/api/messages', messageRoute)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})

