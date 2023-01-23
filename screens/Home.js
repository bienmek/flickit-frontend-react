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
import {useObjectContext} from "../context/objectContext";
import {useUserContext} from "../context/userContext";
import axios from "axios";
import ToasterContainer from "../components/Toasters/ToasterContainer";

export default function Home({navigation, route}) {
    const [handleEyes, setHandleEyes] = useState(eyes);

    const {currentObject, takenFlick} = useObjectContext()
    const {user} = useUserContext()

    useEffect(() => {
        console.log("USERR", user?.email)
    }, [])

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
                {!!currentObject ? (
                    <FlickSubjectManager />
                ) : !takenFlick && (
                    <EyesRoutine handleEyes={handleEyes}/>
                )}
            </SafeAreaView>
            <BottomTab navigation={navigation}/>
        </>
    )
}