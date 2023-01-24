import {ActivityIndicator, TouchableOpacity, View, Text} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {CameraType, FlashMode} from "expo-camera";
import {dark_gray, gray, primary} from "../utils/colors";
import {useEffect, useState} from "react";
import {useFlickContext} from "../context/flickContext";
import Svg, {Defs, Ellipse, RadialGradient, Stop} from "react-native-svg";
import ObjectGradient from "./ObjectGradient";
import Feather from "react-native-vector-icons/Feather";

export default function TakePictureLayout ({navigation, loading, takePicture, toggleCameraType, toggleFlashMode, flashMode}) {
    return (
        <View
            style={{
                position: "absolute",
                height: "100%",
                width: "100%"
            }}
        >

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
                    left: 20,
                    top: 30,
                }}
                onPress={() => navigation.goBack()}
            >
                <Feather
                     name={"arrow-left"}
                     color={"white"}
                     size={25}
                />
                <Text
                    style={{
                        color: "white",
                        fontSize: 15,
                        marginLeft: 10,
                        fontWeight: "bold"
                    }}
                >
                    Back
                </Text>
            </TouchableOpacity>

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
                    onPress={toggleCameraType}
                >
                    <Ionicons
                        name={"camera-reverse-outline"}
                        size={30}
                        color={"black"}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: "white",
                        height: 50,
                        width: 50,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        top: 30
                    }}
                    onPress={toggleFlashMode}
                    activeOpacity={0.7}
                >
                    {flashMode === FlashMode.on ? (
                        <Ionicons
                            name={"flash-outline"}
                            size={30}
                            color={"black"}
                        />
                    ) : (
                        <Ionicons
                            name={"flash-off-outline"}
                            size={30}
                            color={"black"}
                        />
                    )}
                </TouchableOpacity>
            </View>

            {!loading && !loading ? (
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        backgroundColor: primary,
                        borderWidth: 5,
                        borderColor: "white",
                        height: 80,
                        width: 80,
                        borderRadius: 100,
                        bottom: 80,
                        alignSelf: "center"
                    }}
                    activeOpacity={0.7}
                    onPress={takePicture}
                >
                </TouchableOpacity>
            ) : (
                <View
                    style={{
                        position: "absolute",
                        bottom: 80,
                        alignSelf: "center"
                    }}
                >
                    <ActivityIndicator size={"large"} color={"white"} />
                </View>
            )}
        </View>
    )
}