import {objectSlice} from "../slices/objectSlice";
import {getAuthedUserStorage} from "../../services/storage-manager";
import axios from "axios";
import {delay} from "../../utils/functions";

export const {setCurrentObject, setTimeLeft, setHasUserTookCurrentObject, setIsCountDown, resetObject} = objectSlice.actions

export async function objectRoutine (dispatch, uid, currentObject, hasUserTookCurrentObject, navigation) {
    const authedUserStorage = await getAuthedUserStorage(uid)
    const hoursListNotifications = authedUserStorage.notificationHoursList

    const NOW = new Date(Date.now())

    if (hasUserTookCurrentObject) {
        dispatch(setCurrentObject(null))
        return
    }

    if (!hoursListNotifications.includes(NOW.getHours())) {
        dispatch(setCurrentObject(null))
        return
    }

    if (currentObject) {
        const TIME_FROM_HOUR_SHARP = ((NOW.getTime() - 1000*60*NOW.getMinutes()) - 1000*NOW.getSeconds()) - NOW.getMilliseconds()
        const targetDate = new Date(TIME_FROM_HOUR_SHARP + 1000*3600)
        const diffTime = (targetDate.getTime() - NOW.getTime()) > 0 ? targetDate.getTime() - NOW.getTime() : 0
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

        if (diffMinutes === 0 && diffSeconds === 0) {
            dispatch(resetObject())
            return
        }

        const rawTimeLeft = {
            hours: diffHours,
            minutes: diffMinutes,
            seconds: diffSeconds
        }
        dispatch(setTimeLeft(JSON.stringify(rawTimeLeft)))
        return
    }
    navigation.navigate("Home")
    setIsCountDown(true)
    await delay(5000)
    const {data} = await axios.get("https://flick-it-wordinfo-4nyk6wb3ua-ew.a.run.app/v1/word", {
        accept: "application/json"
    })

    const rawData = {
        name: data.word,
        reward: data.point,
        rarity: data.rarity,
        image: data.image
    }

    dispatch(setCurrentObject(JSON.stringify(rawData)))
}

export async function computeHasUserTookCurrentObject (dispatch, uid) {
    const authedUserStorage = await getAuthedUserStorage(uid)
    const userLastFlicks = authedUserStorage.lastFlicks
    const NOW = new Date(Date.now())

    if (!userLastFlicks) {
        dispatch(setHasUserTookCurrentObject(false))
        return
    }

    if (userLastFlicks.some((item) => {
        const date = new Date(item.date)
        return (date.getHours()+1 === NOW.getHours()) && (date.getDay() === NOW.getDay())
    })) {
        dispatch(setHasUserTookCurrentObject(true))
    } else {
        dispatch(setHasUserTookCurrentObject(false))
    }
}