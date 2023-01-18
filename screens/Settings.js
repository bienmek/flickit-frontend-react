import {ScrollView, View, Text, Image, SafeAreaView} from "react-native";
import {useEffect, useState} from "react";
import {users} from "../samples/flick-object-sample";
import BottomTab from "../components/BottomTab";
import TopTab from "../components/TopTab";
import UserInformation from "../components/UserInformation";
import MyRangeSelector from "../components/MyRangeSelector";
import MyButton from "../components/MyButton";
import LastFlick from "../components/LastFlick";
import EditProfile from "../components/EditProfile";
import UserInformationEditProfile from "../components/UserInformationEditProfile";


export default function Settings ({navigation}) {
    const handleValueChange = (newValue) => {
        console.log(`New value: ${newValue}`);
    }
    return (

        
        <>
            <TopTab navigation={navigation} />
            <ScrollView
                style={{
                    backgroundColor: "white"
                }}
            >
                <UserInformationEditProfile/>
            <MyRangeSelector onValueChange={handleValueChange} />
            <EditProfile/>
            </ScrollView>
            <BottomTab navigation={navigation}/>
        </>
    )
}