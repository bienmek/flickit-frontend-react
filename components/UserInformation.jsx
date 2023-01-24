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
import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useUserContext} from "../context/userContext";

const Profil = require("../assets/images/titoux.jpeg");
const Settings = require("../assets/images/settings.png");

export default function UserInformation() {

    const navigation = useNavigation()
    const {authedUser} = useUserContext()

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
          <Image
            source={Profil}
            style={{
              height: 80,
              width: 80,
              borderRadius: 50,
            }}
          >
          </Image>
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
                fontSize: 10,
                paddingTop: 10,
                paddingStart: 20,
                color: dark_gray,
                fontWeight: "bold",
              }}
            >
              @{authedUser.mail}
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
