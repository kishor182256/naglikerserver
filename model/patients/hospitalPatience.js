import {model,Schema,ObjectId} from 'mongoose';

const hospitalpatientSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  pat_id: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  city: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  reportCategory:[{
    type: Schema.Types.ObjectId,
    ref: 'TestCategory'
  }],
  reportSubcategory:[{
    type: Schema.Types.ObjectId,
    ref: 'TestSubcategory',
  }],
  sample: {
    type: String,
    required: true
  },
  pickupTime: {
    type: Date,
    required: true
  },
  hospitalName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['CASH', 'ONLINE', 'Other'],
    required: true
  }
});


export default model('HospitalPatient',hospitalpatientSchema);

