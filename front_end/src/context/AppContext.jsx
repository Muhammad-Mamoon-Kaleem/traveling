import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
export const AppContext = createContext()
const AppContextProvider = (props) => {
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [places, setAllplaces] = useState([])
    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
    const [usrData,setUserData]=useState(false)
    

    const LoadUserData=async()=>{
         try {
            const {data} =await axios.get(backend_url+'/api/user/getuserdata',{ headers: { Authorization: `Bearer ${token}` } }
            )
            if(data.success){
                setUserData(data.userData)
                console.log(data.userData);
                toast.success(data.userData)
            }
            else{
                toast.error(data.message)
                console.log('error in fetching user data at api calling ',data.message);
                
            }
         } 
         catch (error) {
            console.log('catch block error in fetching user data',error);
         }
    }

    useEffect(()=>{
        if(token){
          LoadUserData();
        }
        else{
            setUserData(false)
        }

    },[token])

    const getAllPlaces = async () => {
        try {
            const { data } = await axios.get(backend_url+'/api/user/allplaces', {})
            if (data.success) {
                console.log(data.success);
                setAllplaces(data.message.reverse())
            }
            else {
                console.log("cant get data",data.message);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const value = { places,backend_url ,token,setToken,usrData,setUserData,LoadUserData};
    useEffect(()=>{
getAllPlaces()
    },[])
return(
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
)
}
export default AppContextProvider