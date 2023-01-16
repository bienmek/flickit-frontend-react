import {Camera, CameraType, FlashMode} from 'expo-camera';
import {useEffect, useRef, useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TakePictureLayout from "../components/TakePictureLayout";
import PictureTakenLayout from "../components/PictureTakenLayout";
import {useObjectContext} from "../context/objectContext";

export default function CameraScreen ({navigation}) {
    const [type, setType] = useState(CameraType.back);
    const [flashMode, setFlashMode] = useState(FlashMode.off);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [flick, setFlick] = useState(null);
    const [loading, setLoading] = useState(false);
    const [lastTap, setLastTap] = useState(null);

    const cameraRef = useRef(null)

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
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

    async function takePicture() {
        try {
            if (cameraRef) {
                setLoading(true)
                const pic = await cameraRef.current.takePictureAsync()
                setLoading(false)
                setFlick(pic)
            }
        } catch (e) {
            console.error(e)
        }
    }

    function toggleFlashMode() {
        setFlashMode(current => (current === FlashMode.off ? FlashMode.on : FlashMode.off))
    }

    function handleDoubleTap() {
        const now = Date.now();
        if (lastTap && (now - lastTap) < 200) {
            toggleCameraType()
        }
        setLastTap(now);
    }

    return (
        <>
            <TouchableOpacity
                style={styles.container}
                activeOpacity={1}
                onPress={handleDoubleTap}
            >
                <Camera
                    style={styles.camera}
                    type={type}
                    flashMode={flashMode}
                    ref={cameraRef}
                >

                    {flick ? (
                        <PictureTakenLayout
                            flick={flick}
                            deleteFlick={() => setFlick(null)}
                            isFrontCamera={(type === CameraType.front)}
                            navigation={navigation}
                        />
                    ) : (
                        <TakePictureLayout
                            flashMode={flashMode}
                            loading={loading}
                            takePicture={takePicture}
                            toggleCameraType={toggleCameraType}
                            toggleFlashMode={toggleFlashMode}
                            navigation={navigation}
                        />
                    )}
                </Camera>
            </TouchableOpacity>
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