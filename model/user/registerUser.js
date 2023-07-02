import {model,Schema,ObjectId} from 'mongoose';

const registerUser= new Schema(
  {
    name: {
        type: String,
        required: true,
      },
       
      phone: {
        type: Number,
        required: true,
      },
   
    email: {
      type: String,
      required: true,
    },
    auditlockdays: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Inactive",
    },
  },
  {
    timestamps: true,
  }
);

export default model('User',registerUser);