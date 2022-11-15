// const express = require("express");
// const mongoose = require("mongoose");
// const morgan = require("morgan"); //better debugging
// const cors = require("cors");
// //allow using a .env file
// require("dotenv").config();   

// //creates a new instance of express application
// const app = express();

// let {EventModel} = require('./models/events');

// let ClientModel = require('./models/clients');

// // add cors header to the server
// app.use(cors({
//   origin: '*'
// }));

// //sets up mongoose for the mongoDB connection
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("Database connection Success!");
//   })
//   .catch((err) => {
//     console.error("Mongo Connection Error", err);
//   });

// //declare port number for the api
// const PORT = process.env.PORT || 3000;

// //setup
// app.use(express.json());
// app.use(morgan("dev"));

// app.post('/create-event', (req, res, next) => { 
//   EventModel.create(req.body, (error, data) => {
//     if (error) {
//       console.log('Something went wrong');
//     } else {
//       res.send('event is added to the database');
//     }
//   });
// });

// app.get('/create-event', (req, res, next) => { 
//   EventModel.find(req.body, (error, data) => {
//     if (error) {
//       console.log('Something went wrong');
//     } else {
//       res.json(data);
//     }
//   });
// });

// app.put("/changeevent/:_id", (req, res, next) => {
//   EventModel.findByIdAndUpdate(
//       req.params._id ,
//       // {$push: {events: req.body.event}},
//       req.body,
//       (error, data) => {
//           if (error) {
//               return next(error);
//           } else {
//               res.json(data);
//           }
//       }
//   );
// });

// app.post('/client', (req, res, next) => { 
//   ClientModel.create(req.body, (error, data) => {
//     if (error) {
//       console.log('Something went wrong');
//     } else {
//       res.send('client is added to the database');
//     }
//   });
// });

// app.get('/client', (req, res, next) => { 
//   ClientModel.find(req.body, (error, data) => {
//     if (error) {
//       console.log('Something went wrong');
//     } else {
//       res.json(data);
//     }
//   });
// });

// //import routes
// // const primaryDataRoute  = require('./routes/primaryData');
// // const eventsDataRoute  = require('./routes/eventsData');

// //setup middle ware for routes
// // app.use('/primaryData', primaryDataRoute);
// // app.use('/eventData', eventsDataRoute)

// app.listen(PORT, () => {
//   console.log("Server started listening on port : ", PORT);
// });

// //error handler
// app.use(function (err, req, res, next) {
//   // logs error and error code to console
//   console.error(err.message, req);
//   if (!err.statusCode)
//     err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });


const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan"); //better debugging
const cors = require("cors");
//allow using a .env file
require("dotenv").config();   

//creates a new instance of express application
const app = express();

// add cors header to the server
app.use(cors({
  origin: '*'
}));

//sets up mongoose for the mongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection Success!");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

//declare port number for the api
const PORT = process.env.PORT || 3000;

//setup
app.use(express.json());
app.use(morgan("dev"));

//import routes
const primaryDataRoute  = require('./routes/primaryData');
const eventsDataRoute  = require('./routes/eventsData');
const organizationDataRoute = require('./routes/organizationData');

//setup middle ware for routes
app.use('/primarydata', primaryDataRoute);
app.use('/eventsData', eventsDataRoute)
app.use('/organizationData', organizationDataRoute)

app.listen(PORT, () => {
  console.log("Server started listening on port : ", PORT);
});

//error handler
app.use(function (err, req, res, next) {
  // logs error and error code to console
  console.error(err.message, req);
  if (!err.statusCode)
    err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});