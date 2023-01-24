import {objectSlice} from "../slices/objectSlice";
import {getAuthedUserStorage} from "../../services/storage-manager";
import axios from "axios";

export const {setCurrentObject, setTimeLeft, setHasUserTookCurrentObject} = objectSlice.actions

export async function objectRoutine (dispatch, uid, currentObject, hasUserTookCurrentObject) {
    //const authedUserStorage = await getAuthedUserStorage(uid)
    const hoursListNotifications = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0]
    const NOW = new Date(Date.now())

    if (hasUserTookCurrentObject) {
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

        const rawTimeLeft = {
            hours: diffHours,
            minutes: diffMinutes,
            seconds: diffSeconds
        }

        dispatch(setTimeLeft(JSON.stringify(rawTimeLeft)))
        console.log("DEBUG 4")
    }

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

    if (userLastFlicks.some((item) => {
        const buff = item.date.split('').splice(0, 2)
        const hours = buff.filter((item) => item !== "0").reduce((previousValue, currentValue) => previousValue + currentValue)
        return hours === NOW.getHours().toString()
    })) {
        dispatch(setHasUserTookCurrentObject(true))
    }
}