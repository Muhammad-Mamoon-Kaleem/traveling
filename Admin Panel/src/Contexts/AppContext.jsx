import { createContext, useState } from "react";

export const  AppContext=createContext();

const App_Context_Provider=(props)=>{

    const value={

    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default App_Context_Provider;
