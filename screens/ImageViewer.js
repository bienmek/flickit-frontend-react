import {ActivityIndicator, Dimensions, Image, SafeAreaView, View} from "react-native";
import {useState} from "react";
import {isIphoneX} from "react-native-iphone-x-helper";
import TopTab from "../components/TopTab";
import {primary} from "../utils/colors";

export default function ImageViewer({route, navigation}) {
    const [loading, setLoading] = useState(true);

    const SCREEN_HEIGHT = Dimensions.get('window').height

    const {routeImage} = route.params

    return (
        <>
            <TopTab navigation={navigation}/>
            <SafeAreaView
                style={{
                    height: isIphoneX() ? SCREEN_HEIGHT - 90 : SCREEN_HEIGHT - 75,
                    width: "100%",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    backgroundColor: primary
                }}
            >
                {loading && (
                    <View
                        style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            zIndex: 199,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "white"
                        }}
                    >
                        <ActivityIndicator size="large" color="#959595" />
                    </View>
                )}
                <Image
                    source={{uri: routeImage.uri}}
                    style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                    }}
                    onLoadEnd={() => setLoading(false)}
                />
            </SafeAreaView>
        </>
    )
}