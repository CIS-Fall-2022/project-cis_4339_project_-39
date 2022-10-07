const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
    OrgId: {
      type: String,
      required: true,
      unique: true
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
    Addresses: [
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

module.exports = mongoose.model('create-event', eventSchema)