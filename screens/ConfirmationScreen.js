import {useObjectContext} from "../context/objectContext";
import {Dimensions, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import TopTab from "../components/TopTab";
import BottomTab from "../components/BottomTab";
import FlickSubjectManager from "../components/FlickSubjectManager";
import ObjectGradient from "../components/ObjectGradient";
import {dark_gray, primary} from "../utils/colors";
import {useState} from "react";


export default function ConfirmationScreen ({navigation}) {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    const {takenFlick, currentObject, timeTaken} = useObjectContext()

    return (
        <>
            <TopTab navigation={navigation} />
            <ScrollView style={{backgroundColor: "white"}}>

                <Title text={"The Object"} />

                <View
                    style={{
                        width: "100%",
                        height: 300,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onLayout={(event) => {
                        setHeight(event.nativeEvent.layout.height)
                        setWidth(event.nativeEvent.layout.width)
                    }}
                >

                    <ObjectGradient
                        currentObject={currentObject}
                        height={height}
                        width={width}
                    />

                    <Text
                        style={{
                            fontSize: 52,
                            color: dark_gray,
                            fontWeight: "bold"
                        }}
                    >
                        {currentObject?.name.toUpperCase()}
                    </Text>
                    <Text
                        style={{
                            fontSize: 150,
                            zIndex: 99
                        }}
                    >
                        {currentObject?.image}
                    </Text>
                </View>

                <Title text={"The Flick"} />

                <TouchableOpacity
                    style={{
                        height: 200,
                        width: "95%",
                        borderRadius: 20,
                        overflow: "hidden",
                        alignSelf: "center",
                        marginTop: 20
                    }}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("ImageViewer", {routeImage: takenFlick})}
                >
                    <Image
                        source={{uri: takenFlick.uri}}
                        style={{
                            height: 200,
                            width: "100%",
                            resizeMode: "cover",
                            backgroundColor: "blue"
                        }}
                    />
                </TouchableOpacity>

                <Title text={"Time Taken"} />

                <View
                    style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        top: 10
                    }}
                >
                    <Text
                        style={{
                            fontSize: 50,
                            color: dark_gray,
                            zIndex: 99,
                        }}
                    >
                        {timeTaken.hours > 0 && `${timeTaken.hours}h`} {timeTaken.minutes.toString().length < 2 ? `0${timeTaken.minutes}m` : `${timeTaken.minutes}m`} {timeTaken.seconds.toString().length < 2 ? `0${timeTaken.seconds}s` : `${timeTaken.seconds}s`}
                    </Text>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: primary,
                        borderRadius: 20,
                        zIndex: 99,
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        marginTop: 50,
                        marginBottom: 100
                    }}

                    activeOpacity={0.7}
                >
                    <Text
                        style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 30,
                        }}
                    >
                        Send Flick !
                    </Text>

                </TouchableOpacity>

            </ScrollView>
            <BottomTab navigation={navigation}/>
        </>
    )
}

function Title ({text}) {
    return (
        <View
            style={{
                backgroundColor: "white",
                borderRadius: 20,
                zIndex: 99,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "flex-start",
                borderColor: primary,
                borderWidth: 3,
                paddingVertical: 5,
                paddingHorizontal: 10,
                marginTop: 20
            }}
        >
            <Text
                style={{
                    color: primary,
                    fontWeight: "bold",
                    fontSize: 30,
                }}
            >
                {text}
            </Text>
        </View>
    )
}