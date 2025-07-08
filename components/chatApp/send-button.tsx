import { Button } from "@heroui/react";
import { ArrowUp } from "lucide-react";
import React from "react";
import Cookies from "js-cookie";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store/store";
import Login from "../routes/auth/login";
import { showLogin } from "@/redux/slices/globalSlice";
type Props = {
  disabled: boolean;
};

const SendMessageButton = (props: Props) => {
    const token = Cookies.get("token");
    const {login} = useAppSelector((state:RootState)=>state.gloabal)
    const dispatch = useAppDispatch()

  
  if (token) {
    return (
      <Button
        disabled={props.disabled}
        isIconOnly
        size="sm"
        className="bg-lime-300"
        startContent={<ArrowUp color="black" />}
        onPress={() => console.log("yes")}
      ></Button>
    );
  } else {
    return (
      <Button
      disabled={props.disabled}
        isIconOnly
        size="sm"
        className="bg-lime-300"
        startContent={<ArrowUp color="black" />}
        // onPress={()=>dispatch(showLogin(true))}
      ></Button>
    );
  }
};

export default SendMessageButton;
