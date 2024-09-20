import mongoose from "mongoose";

// Define the message schema
const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sentby:{
    type:String,  
    required: true,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create the model



export const Message = mongoose.model('Message', messageSchema); 
