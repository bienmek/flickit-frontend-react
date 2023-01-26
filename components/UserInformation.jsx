import { SafeAreaView, Text, View, StyleSheet, Dimensions } from "react-native";
import {
  dark_gray,
  gray,
  legendary,
  light_gray,
  primary,
  rare,
  secondary,
  super_rare,
} from "../utils/colors";
import { users } from "../samples/flick-object-sample";
import React, {useEffect, useState} from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useUserContext} from "../context/userContext";
import {getAuthedUserStorage} from "../services/storage-manager";
const Settings = require("../assets/images/settings.png");

export default function UserInformation() {
    const [profilePicture, setProfilePicture] = useState("https://firebasestorage.googleapis.com/v0/b/worldtask-test.appspot.com/o/profile_picture%2Fblank_pp.png?alt=media&token=0c6a438a-6dcf-4491-94d5-c1ee187e6c08");

    const navigation = useNavigation()
    const {authedUser, user, updateContext} = useUserContext()

    useEffect(() => {
        getAuthedUserStorage(user?.uid)
            .then((res) => setProfilePicture(res.profilePicture))
    }, [updateContext]);


    return (
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
        <TouchableOpacity
            onPress={() => navigation.navigate("ImageViewer", {routeImage: {uri: profilePicture}})}
        >
              <Image
                source={{uri: profilePicture}}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 50,
                }}
              />
        </TouchableOpacity>
          <View>
            <Text
              style={{
                fontSize: 35,
                paddingStart: 20,
                color: primary,
                fontWeight: "bold",
              }}
            >
              @{authedUser.username}
            </Text>
            <Text
              style={{
                fontSize: 13,
                paddingStart: 20,
                color: dark_gray,
                fontWeight: "bold",
              }}
            >
              {authedUser.mail}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Image
              source={Settings}
              style={{
                height: 40,
                width: 40,
                left: 20,
              }}
            ></Image>
          </TouchableOpacity>
        </View>
    )
}
