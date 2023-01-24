import {createContext, useContext, useEffect, useState} from "react";
import {onValue, ref} from "firebase/database";
import {db} from "../firebase";
import axios from "axios";
import {useUserContext} from "./userContext";

const FlickContext = createContext({})

export const useFlickContext = () => useContext(FlickContext)

export default function FlickContextProvider ({children}) {
    const [takenFlick, setTakenFlick] = useState(null);
    const [timeTaken, setTimeTaken] = useState(null);



    function computeTimeTaken () {
        const NOW = new Date(Date.now())
        const TIME_FROM_HOUR_SHARP = ((NOW.getTime() - 1000*60*NOW.getMinutes()) - 1000*NOW.getSeconds()) - NOW.getMilliseconds()

        const diffTime =  new Date(Date.now() - TIME_FROM_HOUR_SHARP)
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

        setTimeTaken({
            hours: diffHours,
            minutes: diffMinutes,
            seconds: diffSeconds
        })
    }

    const contextValue = {
        takenFlick,
        setTakenFlick,
        setTimeTaken,
        timeTaken,
        computeTimeTaken
    }

    return (
        <FlickContext.Provider value={contextValue}>
            {children}
        </FlickContext.Provider>
    )
}