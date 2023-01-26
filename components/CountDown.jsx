import {View, Text, Dimensions} from "react-native";
import {primary} from "../utils/colors";
import {useEffect, useState} from "react";
import {delay} from "../utils/functions";
import {useDispatch, useSelector} from "react-redux";
import {setIsCountDown} from "../redux/actions/objectActions";


export default function CountDown() {
    const [count, setCount] = useState(5);
    const [update, setUpdate] = useState(0);
    const [flickTime, setFlickTime] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        if (count <= 0) {
            setFlickTime(true)
            delay(1000)
                .then(() => {
                    dispatch(setIsCountDown(false))
                    setFlickTime(false)
                })
        }
        delay(1000)
            .then(() => {
                setCount(count-1)
                setUpdate(update+1)
            })
    }, [update,]);


    return (
        <View
            style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                backgroundColor: "white",
                zIndex: 200
            }}
        >
            {flickTime ? (
                <Text
                    style={{
                        color: primary,
                        fontSize: 100,
                        fontWeight: "bold",
                        textAlign: "center"
                    }}
                >
                    Flick Time
                </Text>
            ) : (
                <Text
                    style={{
                        color: primary,
                        fontSize: 300,
                        fontWeight: "bold"
                    }}
                >
                    {count}
                </Text>
            )}

        </View>
    )
}