import {useFonts} from "expo-font";
import {ActivityIndicator, Image, SafeAreaView, Text, View} from "react-native";
import logo from "../../assets/images/logo-flickit.png";


export default function LoadingToaster () {
    const [loaded] = useFonts({
        introScript: require('../../assets/font/intro-script-demo-medium.otf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <SafeAreaView
            style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                position: "absolute",
                height: "100%",
                width: "100%",
                zIndex: 999,
                backgroundColor: "white"
            }}
        >
            <View
                style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row"
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
                    Flick It
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
            </View>

            <View
                style={{
                    marginTop: 20
                }}
            >
                <ActivityIndicator size="large" color="#959595" />
            </View>
        </SafeAreaView>
    )
}