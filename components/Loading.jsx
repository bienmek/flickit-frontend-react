import {Image, SafeAreaView, Text, View} from "react-native";
import {useFonts} from "expo-font";
import logo from "../assets/images/logo-flickit.png"

export default function Loading() {
    const [loaded] = useFonts({
        introScript: require('../assets/font/intro-script-demo-medium.otf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <SafeAreaView
            style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                position: "absolute",
                height: "100%",
                width: "100%",
                zIndex: 999,
                backgroundColor: "white"
            }}
        >
            <Text
                style={{
                    fontWeight: "bold",
                    fontSize: 42,
                    fontFamily: "introScript",
                    marginBottom: 10
                }}
            >
                Flick it
            </Text>

            <Image
                source={logo}
                style={{
                    marginLeft: 10,
                    marginBottom: 5,
                    width: 50,
                    height: 56,
                    resizeMode: "contain",
                }}
            />
        </SafeAreaView>
    )
}