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
import { RedirectSource } from "react-avatar";

const Profil = require("../assets/images/titoux.jpeg");

export default function MostStars() {
  return (
    <>
      <View
        style={{
          width: "100%",
          flexDirection: "col",
          justifyContent: "flex-start",
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontSize: 35,
            paddingStart: 5,
            color: primary,
            fontWeight: "bold",
          }}
        >
          Most stars
        </Text>

        <View
          style={{
            width: "100%",
            paddingVertical: 5,
            marginTop: 5,
            marginVertical: 10,
            flexDirection: "row",
            backgroundColor: "#DDDDDD",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              fontSize: 40,
              paddingStart: 5,
              color: primary,
              fontWeight: "bold",
            }}
          >
            🥇
          </Text>
          <Image
            source={Profil}
            style={{
              height: 60,
              width: 60,
              borderRadius: 50,
            }}
          ></Image>
          <Text
            style={{
              fontSize: 25,
              position: "absolute",
              right: 0,
              top: 0,
              color: dark_gray,
            }}
          >
            {users[0].points}
            {"⭐"}
          </Text>

          <View
            style={{
              marginLeft: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 35,
                color: dark_gray,
              }}
            >
              @{users[0].username}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            paddingVertical: 10,
            flexDirection: "row",
            marginTop: 5,
            marginVertical: 10,
            backgroundColor: "#DDDDDD",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              fontSize: 40,
              paddingStart: 5,
              color: primary,
              fontWeight: "bold",
            }}
          >
            🥈
          </Text>
          <Image
            source={Profil}
            style={{
              height: 60,
              width: 60,
              borderRadius: 50,
            }}
          ></Image>
          <Text
            style={{
              fontSize: 25,
              position: "absolute",
              right: 0,
              top: 0,
              color: dark_gray,
            }}
          >
            {users[0].points}
            {"⭐"}
          </Text>

          <View
            style={{
              marginLeft: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 35,
                color: dark_gray,
              }}
            >
              @{users[0].username}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            paddingVertical: 10,
            marginTop: 5,
            marginVertical: 10,
            flexDirection: "row",
            backgroundColor: "#DDDDDD",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              fontSize: 40,
              paddingStart: 5,
              color: primary,
              fontWeight: "bold",
            }}
          >
            🥉
          </Text>
          <Image
            source={Profil}
            style={{
              height: 60,
              width: 60,
              borderRadius: 50,
            }}
          ></Image>
          <Text
            style={{
              fontSize: 25,
              position: "absolute",
              right: 0,
              top: 0,
              color: dark_gray,
            }}
          >
            {users[0].points}
            {"⭐"}
          </Text>

          <View
            style={{
              marginLeft: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 35,
                color: dark_gray,
              }}
            >
              @{users[0].username}
            </Text>
          </View>
        </View>
      </View>
      <View></View>
    </>
  );
}
