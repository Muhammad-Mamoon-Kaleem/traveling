import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
export const AdminContext=createContext();

const Admin_Context_Provider=(props)=>{
    const savedToken=localStorage.getItem('aToken')
    const[atoken,setAtoken]=useState(savedToken ? savedToken :'')
    const [allBookings,setAllBookings]=useState([])
    const [DashBoardData,setDashBoardData] =useState(false)
    const backEnd_Url=import.meta.env.VITE_BACKEND_URL
    const getConfig=()=>({
        headers:{
          Authorization: `Bearer ${atoken}`,
        },
      
      });
      const getDashboardData = async ()=>{
        try {
            const {data} =await axios.get(backEnd_Url+'/api/admin/dashboard',getConfig());
            if(data.success){
                setDashBoardData(data.dashBoardData)
                console.log(data.dashBoardData);
                
            }
            else{
              console.log(data.message);
              toast.error(data.message)
            }
        } 
        catch (error) {
            toast.error('Please LogIn Again')
            console.log(error);
        }
      }
const getAllBookings=async()=>{
    try {
        const {data} =await axios.get(backEnd_Url+'/api/admin/allbookings',getConfig());
        if(data.success){
            setAllBookings(data.allBookingsData.reverse())
            console.log(data.allBookingsData);
            
        }
        else{
            toast.error(data.message)
        }
    } 
    catch (error) {
        console.log('error in geting all bookings',error);
        toast.error(error)
    }
}
    const value={

        atoken,setAtoken,
        backEnd_Url,getAllBookings,allBookings,getDashboardData,DashBoardData
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default Admin_Context_Provider