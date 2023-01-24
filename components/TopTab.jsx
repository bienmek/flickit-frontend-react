import {View, StyleSheet, Image, TouchableOpacity, StatusBar, Text, SafeAreaView} from "react-native";
import arrow from "../assets/images/arrow-thin.png"
import logo from "../assets/images/logo-flickit.png"
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";
import {isIphoneX} from "react-native-iphone-x-helper";
import {users} from "../samples/flick-object-sample";
import {useUserContext} from "../context/userContext";

export default function TopTab({navigation}) {

    const route = useRoute()
    const {authedUser} = useUserContext()

    return (
        <>
            <StatusBar barStyle={"dark-content"}/>
            <SafeAreaView style={styles.tab}>
                <View style={styles.container}>
                    {(navigation.canGoBack() && route.name !== "Profile" && route.name !== "Home" && route.name !== "Ranking") ? (
                        <View style={{flex: 1}}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Image
                                    source={arrow}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        marginLeft: 15,
                                        resizeMode: "contain",
                                        transform: [{rotateZ: "90deg"}]
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : (<View style={{flex: 1}}></View>)}

                    <TouchableOpacity
                        style={{
                            flex: 5,
                            width: 50,
                            height: 50,
                        }}
                        activeOpacity={1}
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Image
                            source={logo}
                            style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "contain",
                            }}
                        />
                    </TouchableOpacity>

                    {(route.name !== "Register" && route.name !== "Login") ? (
                        <>
                            <View style={{flex: 1}}></View>
                            <View
                                style={{
                                    position: "absolute",
                                    borderRadius: 20,
                                    borderWidth: 1,
                                    borderColor: "black",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingHorizontal: 5,
                                    paddingVertical: 7,
                                    right: 10,
                                    width: 90,
                                    overflow: "hidden",
                                    bottom: 5
                                }}
                            >

                                <View>
                                    <Text
                                        style={{
                                            fontSize: 18
                                        }}
                                    >
                                        {"⭐"}
                                    </Text>
                                </View>

                                <View>
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            color: "black",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {authedUser?.totalPoint}
                                    </Text>
                                </View>
                            </View>
                        </>
                    ) : (<View style={{flex: 1}}></View>)}
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    tab: {
        height: isIphoneX() ? 100 : 80,
        backgroundColor: "white",
        borderBottomWidth: 0.5,
        borderBottomColor: "#959595",
    },
    container: {
        height: "100%",
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        bottom: 5
    }
})