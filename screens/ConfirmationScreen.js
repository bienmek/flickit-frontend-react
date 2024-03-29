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
import {useDispatch, useSelector} from "react-redux";
import {showToaster} from "../redux/actions/toasterActions";
import {delay, parser} from "../utils/functions";
import {getAuthedUserStorage, setAuthedUserStorage} from "../services/storage-manager";


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

        const {data: {message: metadataId}} = await axios.post(`https://flick-it-take-data-4nyk6wb3ua-ew.a.run.app/v1/upload/${user.uid}`, formData, {headers})
        let status = 0
        let metadata = null

        do {
            const {data} = await axios.get(`https://flick-it-metadata-4nyk6wb3ua-ew.a.run.app/v1/metadata/${metadataId}`, {accept: 'application/json'})
            metadata = data
            status = data.status
            await delay(100)
            console.log(status)
        } while (status === 0)

        console.log(metadata)

        if (status === 1) {
            const userStorage = await getAuthedUserStorage(user?.uid)
            console.log(userStorage)
            const newLastFlick = [...userStorage.lastFlicks]
            newLastFlick.push({
                flickImage: takenFlick.uri,
                timeTaken: timeTaken,
                object: object.currentObject,
                date: metadata.date
            })
            await setAuthedUserStorage(user?.uid, null, newLastFlick, null)
            navigation.navigate("Home")
            setUpdateContext(Date.now())
            setLoading(false)
            dispatch(showToaster({
                type: "SUCCESS",
                text: `Great shot, flick validated +${metadata.point}⭐`
            }))
        } else {
            setTakenFlick(null)
            navigation.goBack()
            setLoading(false)
            dispatch(showToaster({
                type: "ERROR",
                text: `What is this flick ? You are supposed to take a ${metadata.word}, try again`
            }))
        }
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