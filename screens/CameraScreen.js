import {Camera, CameraType, FlashMode} from 'expo-camera';
import { useState } from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BottomTab from "../components/BottomTab";
import TopTab from "../components/TopTab";
import {primary} from "../utils/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function CameraScreen ({navigation, route}) {
    const [type, setType] = useState(CameraType.back);
    const [flashMode, setFlashMode] = useState(FlashMode.off);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    function takePicture() {
    }

    function toggleFlashMode() {
        setFlashMode(current => (current === FlashMode.off ? FlashMode.on : FlashMode.off))
    }

    return (
        <>
            <View style={styles.container}>
                <Camera style={styles.camera} type={type} flashMode={flashMode}>

                    <View
                        style={{
                            top: 30,
                            right: 20,
                            alignSelf: "flex-end",
                            flexDirection: "column",
                            height: "20%",
                            position: "absolute",
                            justifyContent: "flex-start",
                            alignItems: "center",
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
                </Camera>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
});