import {ScrollView, View, Text, Image, SafeAreaView} from "react-native";
import {useEffect, useState} from "react";
import {users} from "../samples/flick-object-sample";
import BottomTab from "../components/BottomTab";
import TopTab from "../components/TopTab";
import UserInformation from "../components/UserInformation";
import LastFlick from "../components/LastFlick";


export default function Profile ({navigation}) {
    return (
        <>
            <TopTab navigation={navigation} />
            <ScrollView
                style={{
                    backgroundColor: "white"
                }}
            >
                <UserInformation/>
                <LastFlick/>
            </ScrollView>
            <BottomTab navigation={navigation}/>
        </>
    )
}