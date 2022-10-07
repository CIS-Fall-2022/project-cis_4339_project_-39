const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let clientSchema = new Schema({
    OrgId: {
      type: String,
      required: true,
      unique: true
    },
    FirstName: {
        type: String,
        required: true
    },
    MiddleName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String
    },
    PhoneNumbers: {
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
    collection: 'clients'
});

module.exports = mongoose.model('client', clientSchema)