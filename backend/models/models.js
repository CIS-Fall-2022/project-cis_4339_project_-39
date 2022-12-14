const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//collection for intakeData
let primaryDataSchema = new Schema({
    
    firstName: {
        type: String,
        required: true
  },
    lastName: {
        type: String,
        required: true
    },
    organization: {  
        type: String,
        ref: 'organizationData' 
        
}, 
    email: {
        type: String
},
    phoneNumbers: {
        type: [String],
        required: true
},
    address: {
        line1: {
            type: String
        },  
        line2: {
            type: String,
        },
        city: {
            type: String,
            required: true
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    }
},
{
    collection: 'primaryData',
    timestamps: true
});

//collection for eventData
let eventDataSchema = new Schema({
    
    eventName: {
        type: String,
        required: true
    },
    organization: {  
        type: String,
        ref: 'organizationData'
   },
    services: {
        type: Array
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    description: {
        type: String,
    },
    attendees: [{
        type: String
    }]
}, {
    collection: 'eventData'
});


let organizationDataSchema = new Schema({
    
    organizationName: {
        type: String,
        required: true
    }}, {
        collection: 'organizationData'
    });

// create models from mongoose schemas
const primarydata = mongoose.model('primarydata', primaryDataSchema);
const eventdata = mongoose.model('eventData', eventDataSchema);
const organizationdata = mongoose.model('organizationData', organizationDataSchema)

// package the models in an object to export 
module.exports = { primarydata, eventdata, organizationdata }
