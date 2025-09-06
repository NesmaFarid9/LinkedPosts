import { createContext, useState } from "react";
// import { CounterContext } from './CounterContext';

export const CounterContext = createContext();


export default function CounterContextProvider({children}){
    const [counter, setCounter] = useState(0);
    return <CounterContext.Provider value={{counter, setCounter}}>
        {children}
    </CounterContext.Provider>

}
