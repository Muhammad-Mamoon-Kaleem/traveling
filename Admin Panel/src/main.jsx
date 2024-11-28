import './index.css';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import Admin_Context_Provider from './Contexts/AdminContext.jsx'
import App_Context_Provider from './Contexts/AppContext.jsx'

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
   <Admin_Context_Provider>
    <App_Context_Provider>
         <App />
    </App_Context_Provider>
   </Admin_Context_Provider>
   
   </BrowserRouter> ,
)
