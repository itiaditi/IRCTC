const express = require('express');
const sequelize = require('./config/database');
const router = require('./routes/user');
const cors=require("cors");
const userRouter = require('./routes/user');
const trainRouter = require('./routes/train');
const bookingRouter = require('./routes/booking');
const stationRouter = require('./routes/station');
// const bodyParser = require('body-parser');
// const http = require('http');
// const { Server } = require('socket.io');

const app = express();
app.use(express.json());
app.use(cors());
// const server = http.createServer(app);
// const io = new Server(server);
const PORT = process.env.PORT || 5000;



app.use('/',userRouter);
app.use('/',trainRouter);
app.use("/",bookingRouter);
app.use('/',stationRouter)

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });



app.listen(PORT, async () => {
    try{
        await sequelize.authenticate();
        console.log(`Server is running on port ${PORT}`);
    }
    catch(err){
        console.log(err);
    }
    
});
