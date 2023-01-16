import {SafeAreaView, Text, View, StyleSheet, Dimensions} from "react-native";
import {dark_gray, gray, legendary, light_gray, primary, rare, secondary, super_rare} from "../utils/colors";
import { users } from "../samples/flick-object-sample";
import React from 'react';
import { Image } from 'react-native';

const Profil = require('../assets/images/titoux.jpeg');
const Settings = require('../assets/images/settings.png');

export default function UserInformation(){
    return(
        <View
            style={{
                width: "100%",
                flexDirection: "row", 
                justifyContent: "flex-start",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 20,

            }}
        >
           <Image
            source={Profil}
            style={{
                height: 80,
                width: 80,
                borderRadius: 50
            }}
            >
            </Image>
            <View
        >
            <Text                 
            style={{
                fontSize:35,
                paddingStart: 20,
                color: primary,
                fontWeight: "bold"
                }}
        >
                @{users[0].username}
            </Text>
            <Text                 
            style={{
                fontSize:10,
                paddingStart: 20,
                color: dark_gray,
                fontWeight: "bold"
                }}
        
        >
                @{users[0].email}
            </Text>
            </View>

            <Image
            source={Settings}
            style={{
                height: 40,
                width: 40,
                left: 20
                       }}
                       >
            </Image>
        </View>


        

    )
}
