import { socket } from "@/config/socket-config";
import { setMessage } from "@/redux/slices/chatSocketSlice";
import { setShowRequest } from "@/redux/slices/globalSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store/store";
import { useDispatch } from "react-redux";

  
 export const sendMessage = (session_id:string,sender:string,reciever:string,description:string) => {
    const dispatch = useAppDispatch()
    const {payed} =useAppSelector((state:RootState)=>state.gloabal)
    if(payed){
    dispatch(setShowRequest(true))
    }else{

      const data = {
        session_id:session_id,
        sender: sender,
        receiver: reciever,
        data: {
          type:"text",
          text: description,
          created_at: String(new Date()),
          status:"pending",
        }
      }
      
      dispatch(setMessage(data))
      socket.emit("test_message", data );
    }
  };