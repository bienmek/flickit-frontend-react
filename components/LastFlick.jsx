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

const Elephant = require("../assets/images/Elephant.jpeg");
const Bike = require("../assets/images/bike.jpeg");

export default function LastFlick() {
  return (
    <>
      <View
        style={{
          width: "100%",
          flexDirection: "col",
          justifyContent: "flex-start",
          paddingHorizontal: 10,
          paddingVertical: 20,
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
          Last Flicks
        </Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingVertical: 10,
          }}
        >
          <Image
            source={Elephant}
            style={{
              height: 175,
              width: 100,
              borderRadius: 10,
            }}
          ></Image>
          <Text
            style={{
              fontSize: 30,
                left: 195,
                top: -50,
              color: dark_gray,
            }}
          >
            {"\n"}
            {users[0].flicks.find((flick) => flick.object === "Bike").points}
            {"⭐"}
          </Text>
          <Text
            style={{
              fontSize: 80,
              left: -50,
              top: 10,
              color: secondary,
              fontWeight: "bold",
            }}
          >
            {
              users[0].flicks.find((flick) => flick.object === "Elephant")
                .minutes
            }
            :
            {
              users[0].flicks.find((flick) => flick.object === "Elephant")
                .secondes
            }
            {"\n"}
          </Text>
          <Text
            style={{
              fontSize: 50,
              left: -280,
              top: 30,
              color: dark_gray,
            }}
          >
            {"\n"}
            {users[0].flicks.find((flick) => flick.object === "Elephant").object}
          </Text>
          <Text
            style={{
              fontSize: 20,
              left: -480,
              top: 150,
              color: gray,
            }}
          >
            {users[0].flicks.find((flick) => flick.object === "Elephant").heurespic}H
            {users[0].flicks.find((flick) => flick.object === "Elephant").minutespic} -
            {users[0].flicks.find((flick) => flick.object === "Elephant").datepic}


          </Text>
        </View>
        <View></View>

        <Image
          source={Bike}
          style={{
            height: 175,
            width: 100,
            borderRadius: 10,
          }}
        ></Image>
      </View>
      <View></View>
    </>
  );
}
