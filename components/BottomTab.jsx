import {Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import home from "../assets/images/lens_outline.png"
import flickTime from "../assets/images/lens_outline_colored.png"
import ranking from "../assets/images/classement.png"
import home_black from "../assets/images/lens_fill.png"
import ranking_black from "../assets/images/classement_black.png"
import {gray, light_gray, primary} from "../utils/colors";
import {useRoute} from "@react-navigation/native";
import {useEffect} from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {useFlickContext} from "../context/flickContext";
import {useSelector} from "react-redux";

export default function BottomTab({navigation}) {

    const route = useRoute()

    const object = useSelector((state) => state.object)

    useEffect(() => {
        console.log(route.name)
    }, []);


    return (
        <SafeAreaView
            style={{
                width: "100%",
                height: 75,
                position: "absolute",
                backgroundColor: "white",
                alignSelf: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                bottom: 0,
                borderTopWidth: 1,
                borderColor: light_gray
            }}
        >
            <TouchableOpacity
                style={{
                    height: 30,
                    width: 30,
                    left: 10
                }}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Profile")}
            >
                {route.name === "Profile" ? (
                    <FontAwesome
                        name={"user"}
                        size={30}
                        color={"black"}
                    />
                ) : (
                    <FontAwesome
                        name={"user-o"}
                        size={30}
                        color={"black"}
                    />
                )}

            </TouchableOpacity>

            {(!!object.currentObject && route.name === "Home") && (
                <View
                    style={{
                        position: "absolute",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        top: 0
                    }}
                >
                    <Text
                        style={{
                            color: primary,
                            fontSize: 11,
                            fontWeight: "bold"
                        }}
                    >
                        Flick it!
                    </Text>
                </View>

            )}

            <TouchableOpacity
                style={{
                    height: 50,
                    width: 50
                }}
                activeOpacity={0.7}
                onPress={() => {
                    if (!!object.currentObject && route.name === "Home") {
                        navigation.navigate("CameraScreen")
                    } else {
                        navigation.navigate("Home")
                    }
                }}
            >
                <Image
                    source={
                    !!object.currentObject && route.name === "Home" ? flickTime :
                        (route.name === "Home" || route.name === "ConfirmationScreen") ? home_black :
                            home
                    }
                    style={{
                        height: "100%",
                        width: "100%"
                    }}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    height: 30,
                    width: 30,
                    right: 10
                }}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Ranking")}
            >
                <Image
                    source={route.name === "Ranking" ? ranking_black : ranking}
                    style={{
                        height: "100%",
                        width: "100%"
                    }}
                />
                </TouchableOpacity>
        </SafeAreaView>
    )
}