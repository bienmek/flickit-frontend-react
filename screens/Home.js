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
import {
    delay,
    findClosestNumber,
    findExactOrSmallerNumber,
    findNextHigherNumber,
    findSmallerNumber,
    parser
} from "../utils/functions";
import {getAuthedUserStorage} from "../services/storage-manager";
import CountDown from "../components/CountDown";

export default function Home({navigation, route}) {
    const [update, setUpdate] = useState(0);
    const [displaySettingPage, setDisplaySettingPage] = useState(false);
    const [animatedEye, setAnimatedEye] = useState(sleep);

    const {user} = useUserContext()

    const object = useSelector((state) => state.object)
    const dispatch = useDispatch()

    async function handleEyes () {
        const NOW = new Date(Date.now())
        const authedUserStorage = await getAuthedUserStorage(user.uid)
        const hoursListNotifications = authedUserStorage.notificationHoursList
        const previous = findSmallerNumber(hoursListNotifications, NOW.getHours())
        const next = findNextHigherNumber(hoursListNotifications, NOW.getHours())
        const TIME_FROM_HOUR_SHARP = new Date(((NOW.getTime() - 1000*60*NOW.getMinutes()) - 1000*NOW.getSeconds()) - NOW.getMilliseconds())
        const diffPrev = new Date(TIME_FROM_HOUR_SHARP.getTime() - (TIME_FROM_HOUR_SHARP.getHours()*3600*1000 - previous*3600*1000)+3600*1000)
        const diffNext = new Date(TIME_FROM_HOUR_SHARP.getTime() + (next*3600*1000 - TIME_FROM_HOUR_SHARP.getHours()*3600*1000)+3600*1000)
        const proportion =  ((NOW - diffPrev) / (diffNext - diffPrev)) > 0 ? ((NOW - diffPrev) / (diffNext - diffPrev)) : 1 - Math.abs((NOW - diffPrev) / (diffNext - diffPrev))

        if (proportion >= 0.75) {
            setAnimatedEye(eyes)
        } else if (proportion >= 0.5) {
            setAnimatedEye(wokup)
        } else if (proportion >= 0.25) {
            setAnimatedEye(sleepy)
        } else {
            setAnimatedEye(sleep)
        }
    }

    useEffect(() => {
        if (user) {
            handleEyes()
            computeHasUserTookCurrentObject(dispatch, user?.uid)
            objectRoutine(dispatch, user?.uid, object.currentObject, object.hasUserTookCurrentObject, navigation)
                .then(() =>
                    delay(1000)
                        .then(() => setUpdate(update+1)))
        } else {
            setUpdate(update+1)
        }
    }, [update,])

    return (
        <>
            <TopTab navigation={navigation} />
            <ToasterContainer />
            {object.isCountDown && (
                <CountDown />
            )}
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
                    <EyesRoutine handleEyes={animatedEye}/>
                )}
            </SafeAreaView>
            <BottomTab navigation={navigation}/>
        </>
    )
}