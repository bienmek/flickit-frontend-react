import {SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator} from "react-native";
import {useFonts} from "expo-font";
import {useEffect, useState} from "react";
import TopTab from "../components/TopTab";
import {useUserContext} from "../context/userContext";
import {sendEmailVerification, updateProfile} from "firebase/auth";
import {auth} from "../firebase";


export default function Register({navigation}) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const {registerUser, loading, errorContext, setLoading} = useUserContext()

    const onSubmit = () => {
        if (username.length < 4) {
            setError("The username must have a minimum length of 4 characters")
            return
        }

        if ((regex.test(email) === false)) {
            setError("Invalid email address")
            return
        }

        if (password.length < 6) {
            setError("The password must have a minimum length of 6 characters")
            return
        }

        setError("")
        registerUser(username, email, password)
            .then(() =>
                updateProfile(auth.currentUser, {
                    displayName: username
                })
            )
            .then(() => {
                sendEmailVerification(auth.currentUser, {
                    handleCodeInApp: true,
                    url: "https://flick-it-373707.firebaseapp.com"
                })
                    .then(() => navigation.navigate("EmailVerification", {routeUser: username, routeMail: email, routePassword: password}))
            })
            .catch(() => setError("The email is already use by an other user"))
            .finally(() => setLoading(false));
    }

    return (
        <>
            <TopTab navigation={navigation} />
            <SafeAreaView
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 30
                }}
            >
                {error && (
                    <Text
                        style={{
                            color: "red",
                            fontWeight: "bold",
                            fontSize: 13,
                            textAlign: "center"
                        }}
                    >
                        {error}
                    </Text>
                )}

                {errorContext && (
                    <Text
                        style={{
                            color: "red",
                            fontWeight: "bold",
                            fontSize: 13,
                            textAlign: "center"
                        }}
                    >
                        {errorContext}
                    </Text>
                )}

                {loading && (
                    <View
                        style={{
                            marginTop: 20
                        }}
                    >
                        <ActivityIndicator size="large" color="#959595" />
                    </View>
                )}
                <View>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        placeholder={"Enter an username..."}
                        style={styles.input}
                        onChangeText={setUsername}
                        autoCorrect={false}
                    />

                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        placeholder={"Enter an email..."}
                        style={styles.input}
                        autoCorrect={false}
                        onChangeText={setEmail}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        placeholder={"Enter a password..."}
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={setPassword}
                    />
                </View>
                <TouchableOpacity
                    style={{
                        marginTop: 10,
                        backgroundColor: "#8800FF",
                        width: 150,
                        height: 40,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onPress={() => onSubmit()}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 15,
                            fontWeight: "bold",
                        }}
                    >
                        Sign Up
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text
                        style={{
                            color: "blue",
                            textAlign: "center",
                            textDecorationLine: "underline",
                            marginTop: 20
                        }}
                    >
                        Already got an account ? Login here
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>

    )
}

const styles = StyleSheet.create({
    label: {
        marginTop: 10,
    },
    input: {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 20,
        width: 250,
        borderColor: "black",
        borderWidth: 1,
        marginTop: 3
    }
})