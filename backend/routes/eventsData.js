const express = require("express");
const router = express.Router();

//importing data model schemas
let { eventdata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    eventdata.find( 
        {organization:process.env.ORGANIZATION},
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => { 
    eventdata.find({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//GET entries based on search query
//Ex: '...?eventName=Food&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = {
            date:  req.query["eventDate"]
        }
    };
    eventdata.find( 
        dbQuery, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET events for which a client is signed up
router.get("/client/:id", (req, res, next) => { 
    eventdata.find( 
        { attendees: req.params.id }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//POST
router.post("/", (req, res, next) => { 
    const newbody={...req.body,organization:process.env.ORGANIZATION}
    eventdata.create( 
        newbody, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//PUT
router.put("/:id", (req, res, next) => {
    eventdata.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//PUT add attendee to event
router.put("/addAttendee/:id", (req, res, next) => {
    //only add attendee if not yet signed uo
    eventdata.updateOne(
        { _id: req.params.id }, 
        { $push: { attendees: req.body.attendee } },
        (error, data) => {
            console.log(data)
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//DELETE
router.delete("/:id", (req, res, next) => { 
    eventdata.deleteOne(
        {_id:req.params.id} ,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    )
});
 
//GET all event past 2 months
router.get("/totalAttendees", (req, res, next) => { 
    const currentdate = new Date(Date.now())
    const currentmonth = currentdate.getMonth()
    const pastdate = new Date(currentdate)
    pastdate.setMonth(currentmonth - 2)
    eventdata.aggregate([
        {$match: {date:{$gte:pastdate}, organization: process.env.ORGANIZATION}}, // filter query
        {
      $project: {
        attendeeSize: {
          $size: "$attendees"
        },
        eventName: 1
      }
    },
    {
      $group: {
        _id: "$_id",
        totalAttendees: {
          $sum: "$attendeeSize"
        },
        eventName: {
          $first: "$eventName"
        }
      }
    }
    ]).exec(
        (error, data) => {
            console.log(data)
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    )
});

module.exports = router;