import {Message} from "./DbModel.js"
 
 
export async function updateDB(messageObject, username) {
    try {
      // Use messageObject.msg to store the content as a string
      const message = new Message({
        content: messageObject.msg,  // Pass the 'msg' field
        sentby: username
      });
  
      const updated = await message.save();
      if (updated) {
        console.log("MESSAGE ADDED TO DB");
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      console.log(error);
    }
  }