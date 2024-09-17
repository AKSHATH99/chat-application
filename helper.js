import {Message} from "./DbModel.js"
 
 
 export async function updateDB(msg,username){
    try {
        const message = await new Message({ content: msg, sentby:username });
        const updated = await message.save();
        if(updated){
            console.log("MESSAGE ADDED TO DB")
        }else{
            console.log("ERROR");
            
        }
    } catch (error) {
        console.log(error)
    }
}