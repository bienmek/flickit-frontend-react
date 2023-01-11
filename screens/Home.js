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



export default function Home({navigation}) {
    const [handleEyes, setHandleEyes] = useState(eyes);
    const [objectList, setObjectList] = useState(objects);

    const computeObject = () => {
        return objectList[3]
    }


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

                {objectList.length > 0 ? (
                    <FlickSubjectManager object={computeObject()} />
                ) : (
                    <EyesRoutine handleEyes={handleEyes}/>
                )}
            </SafeAreaView>
            <BottomTab navigation={navigation} isFlickTime={objectList.length > 0}/>
        </>

    )
}