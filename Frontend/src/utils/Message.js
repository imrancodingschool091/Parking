import { toast } from "react-toastify";

export const handleSucess=(msg)=>{
    toast.success(msg,{position:"top-center"})
}

export const handleError=(msg)=>{
    toast.error(msg,{position:"top-center"})
}



