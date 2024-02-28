// ToastNofication.ts
import { notification } from 'antd';

interface NotificationProps {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  description: string;
}

export const ToastNofication = ({ type, message, description }: NotificationProps) => {
  notification[type]({
    message: message,
    description: description,
    placement: 'topRight',
  });
};





// import React from 'react';

//   import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';
  
//   export class ToastNofication{
//     public static addErrorMessage(message: string){
//             return toast.error(message)
//     }

//     public static addSuccessMessage(message: string){
//         return toast.success(message)
//     }

//     public static addWarningMessage(message: string){
//         return toast.warning(message)
//    }
//    public static clearAll(){
//     return  toast.dismiss
//    }


//   }