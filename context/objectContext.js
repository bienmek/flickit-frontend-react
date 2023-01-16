import {createContext, useContext, useEffect, useState} from "react";
import {objects} from "../samples/flick-object-sample";


const ObjectContext = createContext({})

export const useObjectContext = () => useContext(ObjectContext)

export default function ObjectContextProvider ({children}) {
    const [currentObject, setCurrentObject] = useState(null);
    const [startTime, setStartTime] = useState(Date.now());
    const [timeLeft, setTimeLeft] = useState(0);
    const [update, setUpdate] = useState(0);
    const [takenFlick, setTakenFlick] = useState(null);

    function computeCurrentObject () {
        setCurrentObject(objects[4])
    }

    function computeMaxTime (rarity) {
        switch (rarity) {
            case 1:
                return 0.1
            case 2:
                return 0.5
            case 3:
                return 1
            case 4:
                return 3
            case 5:
                return 12
        }
    }

    function computeTimeLeft () {
        const submitDate = new Date(startTime)
        const targetDate = new Date(submitDate.getTime() + 1000*(3600*computeMaxTime(currentObject?.rarity)) + 1000)
        const now = new Date(Date.now())
        const diffTime = (targetDate.getTime() - now.getTime()) > 0 ? targetDate.getTime() - now.getTime() : 0
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

        setTimeLeft({
            hours: diffHours,
            minutes: diffMinutes,
            seconds: diffSeconds
        })
    }

    function delay (ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    useEffect(() => {
        computeTimeLeft()
        delay(800)
            .then(() => setUpdate(update+1))
    }, [update])

    useEffect(() => {
        computeCurrentObject()
    }, []);

    const contextValue = {
        currentObject,
        timeLeft,
        setStartTime,
        takenFlick,
        setTakenFlick
    }

    return (
        <ObjectContext.Provider value={contextValue}>
            {children}
        </ObjectContext.Provider>
    )
}