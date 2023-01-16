import {SafeAreaView, Text, View, StyleSheet, Dimensions} from "react-native";
import {dark_gray, gray, legendary, light_gray, primary, rare, secondary, super_rare} from "../utils/colors";
import Svg, { Defs, RadialGradient, Stop, Ellipse } from "react-native-svg";
import {useEffect, useState} from "react";
import {useObjectContext} from "../context/objectContext";
import ObjectGradient from "./ObjectGradient";


export default function FlickSubjectManager () {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    const {currentObject, timeLeft, setStartTime} = useObjectContext()

    return (
        <SafeAreaView
            style={{
                width: "100%",
                height: "65%",
                justifyContent: "center",
                alignItems: "center",
            }}
            onLayout={(event) => {
                setHeight(event.nativeEvent.layout.height)
                setWidth(event.nativeEvent.layout.width)
                setStartTime(Date.now())
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

            <Text
                style={{
                    fontSize: 50,
                    color: dark_gray,
                    zIndex: 99,
                }}
            >
                {timeLeft.hours > 0 && `${timeLeft.hours}h`} {timeLeft.minutes.toString().length < 2 ? `0${timeLeft.minutes}m` : `${timeLeft.minutes}m`} {timeLeft.seconds.toString().length < 2 ? `0${timeLeft.seconds}s` : `${timeLeft.seconds}s`}
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20
                }}
            >
                <Text
                    style={{
                        fontSize: 50,
                        zIndex: 99,
                    }}
                >
                    {"⭐"}
                </Text>
                <Text
                    style={{
                        fontSize: 36,
                        color: primary,
                        zIndex: 99,
                        fontWeight: "bold"
                    }}
                >
                    {currentObject?.reward}
                </Text>
            </View>
        </SafeAreaView>
    )
}