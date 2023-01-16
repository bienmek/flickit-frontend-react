import {ScrollView, View, Text, Image, SafeAreaView} from "react-native";
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

export default function Home({navigation, route}) {
    const [handleEyes, setHandleEyes] = useState(eyes);

    const {currentObject, takenFlick} = useObjectContext()

    useEffect(() => {
        console.log(takenFlick)
    }, [])

    return (
        <>
            <TopTab navigation={navigation} />
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
                {!!takenFlick && (
                    <Image
                        source={{uri: takenFlick.uri}}
                        style={{
                            height: 300,
                            width: 150,
                            resizeMode: "contain"
                        }}
                    />
                )}
                {!!currentObject && !takenFlick ? (
                    <FlickSubjectManager />
                ) : !takenFlick && (
                    <EyesRoutine handleEyes={handleEyes}/>
                )}
            </SafeAreaView>
            <BottomTab navigation={navigation}/>
        </>
    )
}