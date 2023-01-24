import React, {useState, useEffect} from 'react';
import {View, Animated} from 'react-native';
import {useDispatch} from "react-redux";
import {hideToaster} from "../../redux/actions/toasterActions";

export default function LoadingBar ({color}) {
    const [progress, setProgress] = useState(new Animated.Value(0));

    const dispatch = useDispatch()

    useEffect(() => {
        Animated
            .timing(progress, {
                toValue: 1,
                duration: 5000,
                onComplete: () => dispatch(hideToaster()),
                useNativeDriver: false
            })
            .start()
    }, []);

    return (
        <View
            style={{
                width: '90%',
                height: 3,
                backgroundColor: color,
                borderRadius: 5,
            }}
        >
            <Animated.View
                style={{
                    width: progress.interpolate({inputRange: [0, 1], outputRange: ['0%', '100%']}),
                    height: 3,
                    backgroundColor: 'white',
                    borderRadius: 5,
                }}
            />
        </View>
    );
};