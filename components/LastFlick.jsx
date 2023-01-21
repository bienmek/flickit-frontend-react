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
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          <Image
            source={Elephant}
            style={{
              height: 200,
              width: 120,
              borderRadius: 10,
            }}
          />
          <Text
            style={{
              fontSize: 30,
              position: "absolute",
              top: 0,
              right: 0,
              color: dark_gray,
            }}
          >
            {users[0].flicks.find((flick) => flick.object === "Bike").points}
            {"⭐"}
          </Text>

          <View
            style={{
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center"
            }}
          >
            <Text
                style={{
                    fontSize: 70,
                    color: secondary,
                    fontWeight: "bold",
                }}
            >
                {users[0].flicks.find((flick) => flick.object === "Elephant").minutes}
                :
                {users[0].flicks.find((flick) => flick.object === "Elephant").secondes}
            </Text>
            <Text
                style={{
                    fontSize: 50,
                    color: dark_gray,
                }}
          >
            {users[0].flicks.find((flick) => flick.object === "Elephant").object}
          </Text>

          <Text
            style={{
              fontSize: 20,
              color: gray,
            }}
          >
            {
              users[0].flicks.find((flick) => flick.object === "Elephant")
                .heurespic
            }
            H
            {
              users[0].flicks.find((flick) => flick.object === "Elephant")
                .minutespic
            }{" "}
            -
            {
              users[0].flicks.find((flick) => flick.object === "Elephant")
                .datepic
            }
          </Text>
        </View>
          
          
          
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          <Image
            source={Elephant}
            style={{
              height: 200,
              width: 120,
              borderRadius: 10,
            }}
          />
          <Text
            style={{
              fontSize: 30,
              position: "absolute",
              top: 0,
              right: 0,
              color: dark_gray,
            }}
          >
            {users[0].flicks.find((flick) => flick.object === "Bike").points}
            {"⭐"}
          </Text>

          <View
            style={{
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center"
            }}
          >
            <Text
                style={{
                    fontSize: 70,
                    color: secondary,
                    fontWeight: "bold",
                }}
            >
                {users[0].flicks.find((flick) => flick.object === "Elephant").minutes}
                :
                {users[0].flicks.find((flick) => flick.object === "Elephant").secondes}
            </Text>
            <Text
                style={{
                    fontSize: 50,
                    color: dark_gray,
                }}
          >
            {users[0].flicks.find((flick) => flick.object === "Elephant").object}
          </Text>

          <Text
            style={{
              fontSize: 20,
              color: gray,
            }}
          >
            {
              users[0].flicks.find((flick) => flick.object === "Elephant")
                .heurespic
            }
            H
            {
              users[0].flicks.find((flick) => flick.object === "Elephant")
                .minutespic
            }{" "}
            -
            {
              users[0].flicks.find((flick) => flick.object === "Elephant")
                .datepic
            }
          </Text>
        </View>
          
          
          
        </View>

      </View>
      <View></View>
    </>
  );
}
