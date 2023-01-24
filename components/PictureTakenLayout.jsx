import {Dimensions, Image, Text, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {primary} from "../utils/colors";
import Feather from "react-native-vector-icons/Feather";
import {useFlickContext} from "../context/flickContext";


export default function PictureTakenLayout({flick, deleteFlick, isFrontCamera, navigation}) {

    const HEIGHT = Dimensions.get('window').height

    const {
        setTakenFlick,
        computeTimeTaken
    } = useFlickContext()

    function isImagePortrait () {
        return flick.height > flick.width
    }

    return (
        <View
            style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Image
                source={{uri: flick.uri}}
                style={
                (isFrontCamera && isImagePortrait()) ? {
                    height: "100%",
                    width: "100%",
                    resizeMode: "cover",
                    transform: [{ scaleX: -1 }]
                } : !isImagePortrait() ? {
                    height: "100%",
                    width: HEIGHT,
                    resizeMode: "contain",
                    transform: [{rotate: '90deg'}, {scaleX: isFrontCamera ? -1 : 1}],
                    backgroundColor: "blue",
                    position: "absolute"
                } : {
                    height: "100%",
                    width: "100%",
                    resizeMode: "cover"
                }}
            />
            <View
                style={{
                    top: 30,
                    right: 20,
                    alignSelf: "flex-end",
                    flexDirection: "column",
                    height: "20%",
                    position: "absolute",
                    justifyContent: "flex-start",
                    alignItems: "flex-end"
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: "white",
                        height: 50,
                        width: 50,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    activeOpacity={0.7}
                    onPress={deleteFlick}
                >
                    <Ionicons
                        name={"close"}
                        size={30}
                        color={"black"}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={{
                    position: "absolute",
                    backgroundColor: primary,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: 20,
                    flexDirection: "row",
                    right: 20,
                    bottom: 30,
                }}
                activeOpacity={0.7}
                onPress={() => {
                    setTakenFlick(flick)
                    computeTimeTaken()
                    navigation.navigate("ConfirmationScreen")
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 15,
                        marginRight: 10,
                        fontWeight: "bold"
                    }}
                >
                    Next
                </Text>

                <Feather
                    name={"arrow-right"}
                    color={"white"}
                    size={25}
                />
            </TouchableOpacity>
        </View>
    )
}