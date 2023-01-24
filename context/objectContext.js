import {createContext, useContext, useEffect, useState} from "react";
import {onValue, ref} from "firebase/database";
import {db} from "../firebase";
import axios from "axios";
import {useUserContext} from "./userContext";

const ObjectContext = createContext({})

export const useObjectContext = () => useContext(ObjectContext)

export default function ObjectContextProvider ({children}) {
    const [currentObject, setCurrentObject] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [update, setUpdate] = useState(0);
    const [takenFlick, setTakenFlick] = useState(null);
    const [timeTaken, setTimeTaken] = useState(null);
    const [updateObjectContext, setUpdateObjectContext] = useState(0);

    const {authedUser} = useUserContext()

    const START_TIME = (((new Date(Date.now())).getTime() - 1000*60*(new Date(Date.now())).getMinutes()) - 1000*(new Date(Date.now())).getSeconds()) - (new Date(Date.now())).getMilliseconds()

    async function computeCurrentObject () {
        const header = {
            accept: 'application/json'
        };
        const docRef = ref(db, `/metadata`)
        let hasFlicked = false

        if (authedUser?.allFlick) {
            onValue(docRef, (snapshot) => {
                snapshot.forEach((child) => {
                    const doc = child.toJSON()
                    const lastFlicks = Object.values(authedUser.allFlick)
                    if (lastFlicks[lastFlicks.length-1] === doc.uri) {
                        hasFlicked = true
                    }
                })
            })
        }


        if (!hasFlicked) {
            const {data} = await axios.get("https://flick-it-wordinfo-4nyk6wb3ua-ew.a.run.app/v1/word", {header})
            setCurrentObject({
                name: data.word,
                reward: data.point,
                rarity: data.rarity,
                image: data.image
            })
        } else {
            setCurrentObject(null)
        }
    }

    function computeTimeLeft () {
        const now = (new Date(Date.now()))
        const submitDate = new Date(START_TIME)
        const targetDate = new Date(submitDate.getTime() + 1000*3600)
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

    function computeTimeTaken () {
        const diffTime =  new Date(Date.now() - START_TIME)
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

        setTimeTaken({
            hours: diffHours,
            minutes: diffMinutes,
            seconds: diffSeconds
        })
    }

    useEffect(() => {
        computeTimeLeft()
        delay(800)
            .then(() => setUpdate(update+1))
    }, [update])

    useEffect(() => {
        computeCurrentObject()
    }, [START_TIME, updateObjectContext,]);

    const contextValue = {
        currentObject,
        timeLeft,
        takenFlick,
        setTakenFlick,
        setTimeTaken,
        timeTaken,
        computeTimeTaken,
        setUpdateObjectContext
    }

    return (
        <ObjectContext.Provider value={contextValue}>
            {children}
        </ObjectContext.Provider>
    )
}