import {useFlickContext} from "../context/flickContext";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import TopTab from "../components/TopTab";
import BottomTab from "../components/BottomTab";
import ObjectGradient from "../components/ObjectGradient";
import {dark_gray, primary} from "../utils/colors";
import {useState} from "react";
import {useUserContext} from "../context/userContext";
import axios from "axios";
import {manipulateAsync, SaveFormat} from "expo-image-manipulator";
import Loading from "../components/Loading";
import {onValue, ref} from "firebase/database";
import {db} from "../firebase";
import ToasterContainer from "../components/Toasters/ToasterContainer";
import {useDispatch, useSelector} from "react-redux";
import {showToaster} from "../redux/actions/toasterActions";
import Bold from "../components/Utils/Bold";
import {setCurrentObject, setHasUserTookCurrentObject} from "../redux/actions/objectActions";
import {parser} from "../utils/functions";


export default function ConfirmationScreen ({navigation}) {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [loading, setLoading] = useState(false);

    const {takenFlick, timeTaken, setTakenFlick,} = useFlickContext()
    const {user, setUpdateContext} = useUserContext()

    const object = useSelector((state) => state.object)
    const dispatch = useDispatch()

    async function sendFlick () {
        setLoading(true)
        const headers = {
            accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        };

        const image = await manipulateAsync(
            takenFlick.uri,
            [{ resize: { width: Number(takenFlick.width)/4, height: Number(takenFlick.height)/4 } }],
            { format: SaveFormat.JPEG, compress: 0.8 }
        );

        const formData = new FormData();
        formData.append('image', {
            uri: image.uri,
            type: 'image/jpeg',
            name: 'image.jpeg'
        });

        const {data: {message: metadataId}} = await axios.post(`https://flick-it-take-data-4nyk6wb3ua-ew.a.run.app/v1/upload/${user.displayName}`, formData, {headers})
        const docRef = ref(db, `/metadata/${metadataId}`)
        onValue(docRef, (snapshot) => {
            const doc = snapshot.toJSON()
            if (doc.status === 1) {
                dispatch(setHasUserTookCurrentObject(true))
                dispatch(setCurrentObject(null))
                navigation.navigate("Home")
                dispatch(showToaster({
                    type: "SUCCESS",
                    text: `Great shot, flick validated +${doc.point}⭐`
                }))
                setUpdateContext(Date.now())
                setLoading(false)
            } else if (doc.status === 2) {
                setLoading(false)
                setTakenFlick(null)
                navigation.goBack()
                dispatch(showToaster({
                    type: "ERROR",
                    text: `What is this flick ? You are supposed to take a ${doc.word}, try again`
                }))
            }
        })

    }

    return (
        <>
            <TopTab navigation={navigation} />
            {loading && (
                <Loading />
            )}
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
                        currentObject={parser(object?.currentObject)}
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
                        {parser(object?.currentObject)?.name.toUpperCase()}
                    </Text>
                    <Text
                        style={{
                            fontSize: 150,
                            zIndex: 99
                        }}
                    >
                        {parser(object?.currentObject)?.image}
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
                        source={{uri: takenFlick?.uri}}
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
                    onPress={sendFlick}
                    activeOpacity={0.7}
                >
                    <Text
                        style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 30,
                        }}
                    >
                        Send it
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