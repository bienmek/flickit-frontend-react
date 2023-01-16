import {SafeAreaView, Text, View, StyleSheet, Dimensions} from "react-native";
import {dark_gray, gray, legendary, light_gray, primary, rare, secondary, super_rare} from "../utils/colors";
import Svg, { Defs, RadialGradient, Stop, Ellipse } from "react-native-svg";
import {useEffect, useState} from "react";


export default function FlickSubjectManager ({object}) {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [timeLeft, setTimeLeft] = useState({hours: 0, minutes: 0, seconds: 0});
    const [update, setUpdate] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());

    const computeTimeLeft = () => {
        const submitDate = new Date(startTime)
        const targetDate = new Date(submitDate.getTime() + 1000*(3600*computeMaxTime(object.rarity)) + 1000)
        const now = new Date(Date.now())
        const diffTime = (targetDate.getTime() - now.getTime()) > 0 ? targetDate.getTime() - now.getTime() : 0
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

        setTimeLeft({
            hours: diffHours,
            minutes: diffMinutes,
            seconds: diffSeconds
        })
    }

    const computeMaxTime = (rarity) => {
        switch (rarity) {
            case 1:
                return 0.1
            case 2:
                return 0.5
            case 3:
                return 1
            case 4:
                return 3
            case 5:
                return 12
        }
    }

    const computeColor = (rarity) => {
        switch (rarity) {
            case 1:
                return light_gray
            case 2:
                return rare
            case 3:
                return super_rare
            case 4:
                return primary
            case 5:
                return legendary
        }
    }

    useEffect(() => {
        computeTimeLeft()
        delay(800)
            .then(() => setUpdate(update+1))
    }, [update])

    const delay = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

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
            {/*---------------------------------------------------------------------------------------------------------------------*/}
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden"
                }}
            >
                <Svg height={height} width={width}>
                    <Defs>
                        <RadialGradient
                            id="grad"
                            cx={width/2}
                            cy={height/2}
                            rx={width/2}
                            ry={height/2}
                            fx={width/2}
                            fy={height/2}
                            gradientUnits="userSpaceOnUse"
                        >
                            <Stop offset="0" stopColor={computeColor(object.rarity)} stopOpacity="1" />
                            <Stop offset="1" stopColor="white" stopOpacity="1" />
                        </RadialGradient>
                    </Defs>
                    <Ellipse cx={width/2} cy={height/2} rx={width} ry={height} fill="url(#grad)" />
                </Svg>
            </View>

            {/*---------------------------------------------------------------------------------------------------------------------*/}
            <Text
                style={{
                    fontSize: 52,
                    color: dark_gray,
                    fontWeight: "bold"
                }}
            >
                {object.name.toUpperCase()}
            </Text>
            <Text
                style={{
                    fontSize: 150,
                    zIndex: 99
                }}
            >
                {object.image}
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
                    {object.reward}
                </Text>
            </View>
        


        </SafeAreaView>
    )
}
