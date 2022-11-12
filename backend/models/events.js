const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
    OrgId: {
      type: String,
      required: true
    },
    EventName: {
        type: String,
        required: true
    },
    Date: {
        type: Date
    },
    ServicesOffered: {
        type: String
    },
    Address: [
        {
            AddressLine1: String,
            AddressLine2: String,
            City: String,
            Count: String,
            ZipCode: String
        }
    ]
  }, {
    collection: 'events'
});

let EventModel = mongoose.model('events', eventSchema)
module.exports = {EventModel}