import {Image, Text, View} from "react-native";
import {dark_gray, primary} from "../utils/colors";
import sleep from "../assets/images/eyes_sleep.png";
import sleepy from "../assets/images/eyes_sleepy.png";
import wokup from "../assets/images/eyes_wokup.png";
import eyes from "../assets/images/eyes.png";


export default function EyesRoutine ({handleEyes}) {

    const computeTitles = () => {
        switch (handleEyes) {
            case sleep:
                return "Not for now"
            case sleepy:
                return "In a moment"
            case wokup:
                return "Soon"
            case eyes:
                return "Very soon"
        }
    }

    return (
        <>
            <View>
                <Image
                    source={handleEyes}
                    style={{
                        height: 150,
                        width: 150,
                        resizeMode: "cover"
                    }}
                />
            </View>
            <View
                style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <Text
                    style={{
                        color: dark_gray,
                        fontSize: 46,
                    }}
                >
                    Next flick
                </Text>

                <Text
                    style={{
                        color: primary,
                        fontSize: 22,
                        fontWeight: "bold",
                        marginTop: 5
                    }}
                >
                    {computeTitles()}
                </Text>
            </View>
        </>
    )
}