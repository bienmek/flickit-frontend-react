import {SafeAreaView, Text, View, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import {
  dark_gray,
  gray,
  primary,
  secondary,
} from "../utils/colors";
import React, {useEffect, useState} from "react";
import { Image } from "react-native";
import {getAuthedUserStorage} from "../services/storage-manager";
import {useUserContext} from "../context/userContext";
import {useNavigation} from "@react-navigation/native";

export default function LastFlick() {
    const [lastFlicks, setLastFlicks] = useState([]);

    const {user, updateContext} = useUserContext()
    const navigation = useNavigation()

    const formatDate = (date) => {
        const submitDate = new Date(date)
        const now = new Date(Date.now())
        const diffTime = now.getTime() - (submitDate.getTime()+3600*1000)
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

        if (diffDays === 0 && diffHours === 0 && diffMinutes === 0) {
            return `${diffSeconds} s`
        }
        if (diffDays === 0 && diffHours === 0 && diffMinutes === 1) {
            return `${diffMinutes} min`
        }
        if (diffDays === 0 && diffHours === 0 && diffMinutes > 1) {
            return `${diffMinutes} mins`
        }
        if (diffDays === 0 && diffHours >= 1) {
            return `${diffHours} h`
        }
        if (diffDays >= 1) {
            return `${diffDays} j`
        }
    }

    useEffect(() => {
        getAuthedUserStorage(user?.uid)
            .then((res) => {
                setLastFlicks(res.lastFlicks)
                console.log(res.lastFlicks[0].flickImage)
            })
    }, [updateContext]);

    return (
      <View
        style={{
          width: "100%",
          justifyContent: "flex-start",
          paddingHorizontal: 10,
          marginBottom: 100
        }}
      >
          <Text
              style={{
                fontSize: 40,
                color: primary,
                fontWeight: "bold",
              }}
          >
            Last Flicks
          </Text>
          {lastFlicks?.length > 0 ? (
              <>
                  {lastFlicks.reverse().map((flick, index) => (
                      <View
                          style={{
                              width: "100%",
                              paddingVertical: 10,
                              flexDirection: "row",
                              justifyContent: "flex-start",
                              alignItems: "flex-end",
                          }}
                          key={index}
                      >
                          <TouchableOpacity
                            onPress={() => navigation.navigate("ImageViewer", {routeImage: {uri: flick.flickImage}})}
                          >
                              <Image
                                  source={{uri: flick.flickImage}}
                                  style={{
                                      height: 200,
                                      width: 120,
                                      borderRadius: 10,
                                  }}
                              />
                          </TouchableOpacity>
                          <Text
                              style={{
                                  fontSize: 30,
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                  color: dark_gray,
                              }}
                          >
                              {JSON.parse(flick.object).reward}
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
                                      fontSize: 70,
                                      color: secondary,
                                      fontWeight: "bold",
                                  }}
                              >
                                  {flick.timeTaken.minutes.toString().length < 2 ? `0${flick.timeTaken.minutes}` : flick.timeTaken.minutes}:
                                  {flick.timeTaken.seconds.toString().length < 2 ? `0${flick.timeTaken.seconds}` : flick.timeTaken.seconds}
                              </Text>
                              <Text
                                  style={{
                                      fontSize: 50,
                                      color: dark_gray,
                                  }}
                              >
                                  {JSON.parse(flick.object).name.toUpperCase()}
                              </Text>

                              <Text
                                  style={{
                                      fontSize: 18,
                                      color: gray,
                                  }}
                              >
                                  {formatDate(flick.date)} ago
                              </Text>
                          </View>
                      </View>
                  ))}
              </>
          ) : (
              <View
                style={{
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20
                }}
              >
                  <Text
                    style={{
                        fontSize: 72
                    }}
                  >
                      😭
                  </Text>
                  <Text
                    style={{
                        color: gray,
                        fontSize: 18,
                    }}
                  >
                      No last Flicks
                  </Text>
              </View>
          )}
      </View>
  );
}
