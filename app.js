const express= require ("express")
const app = express();
const cors = require("cors");
const http = require('http')
const  morgan =  require('morgan');
app.use(morgan("dev"))

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended:true}));

//const server = http.createServer(app);


require("./database/db");


app.use(express.static(__dirname + ('/')))
app.use("/patientsimg", express.static('patientsimg'));

const patientsRouter = require("./routes/patientsRouter");
app.use(patientsRouter);

const userRouter = require("./routes/userRouter");
app.use(userRouter);

const reminderRouter = require("./routes/reminderRouter");
app.use(reminderRouter);

const  bookingRouter =  require("./routes/bookingRouter");
app.use(bookingRouter);



app.listen(5000,function(){console.log("Server Started")});