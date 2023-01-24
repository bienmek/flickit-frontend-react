import {ScrollView, View, Text, Image, SafeAreaView, TouchableOpacity} from "react-native";
import sleep from "../assets/images/eyes_sleep.png"
import sleepy from "../assets/images/eyes_sleepy.png"
import wokup from "../assets/images/eyes_wokup.png"
import eyes from "../assets/images/eyes.png"
import {useEffect, useState} from "react";
import {dark_gray, gray, primary} from "../utils/colors";
import FlickSubjectManager from "../components/FlickSubjectManager";
import EyesRoutine from "../components/EyesRoutine";
import {objects} from "../samples/flick-object-sample";
import BottomTab from "../components/BottomTab";
import TopTab from "../components/TopTab";
import {useUserContext} from "../context/userContext";
import ToasterContainer from "../components/Toasters/ToasterContainer";
import {useDispatch, useSelector} from "react-redux";
import {computeHasUserTookCurrentObject, objectRoutine} from "../redux/actions/objectActions";
import {delay, parser} from "../utils/functions";

export default function Home({navigation, route}) {
    const [update, setUpdate] = useState(0);

    const {user} = useUserContext()

    const object = useSelector((state) => state.object)
    const dispatch = useDispatch()

    function handleEyes () {
        const NOW = new Date(Date.now())
        const hoursListNotifications = [6, 18, 24]
        let nextHour

        let timeLeft = {
            hours: 0,
            minutes: 0,
            seconds: 0
        }

        for (let i = 0; i < hoursListNotifications.length; i++) {
            if (hoursListNotifications[i] > NOW.getHours()) {
                nextHour = hoursListNotifications[i]
                break;
            }
        }

        if (nextHour === 0) {
            nextHour = hoursListNotifications[0]
        }

        timeLeft.hours = nextHour - NOW.getHours()
        if (timeLeft.hours < 0) {
            timeLeft.hours += 24
        }
        timeLeft.minutes = 60 - NOW.getMinutes()
        timeLeft.seconds = 60 - NOW.getSeconds()

        const nextTime = new Date(NOW.getTime() + (timeLeft.hours * 60 * 60 * 1000) + (timeLeft.minutes * 60 * 1000) + (timeLeft.seconds * 1000))
        console.log(nextTime.getMinutes())

        return wokup
    }

    useEffect(() => {
        //computeHasUserTookCurrentObject(dispatch, user?.uid)
        objectRoutine(dispatch, user?.uid, object.currentObject, object.hasUserTookCurrentObject)
            .then(() =>
                delay(1000)
                    .then(() => setUpdate(update+1)))
    }, [update])

    return (
        <>
            <TopTab navigation={navigation} />
            <ToasterContainer />
            <SafeAreaView
                style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "column",
                    backgroundColor: "white"
                }}
            >
                {object.currentObject !== null ? (
                    <FlickSubjectManager currentObject={parser(object.currentObject)} timeLeft={parser(object.timeLeft)}/>
                ) : (
                    <EyesRoutine handleEyes={handleEyes()}/>
                )}
            </SafeAreaView>
            <BottomTab navigation={navigation}/>
        </>
    )
}