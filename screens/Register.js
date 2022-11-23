import {SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import {useFonts} from "expo-font";
import {useEffect, useState} from "react";


export default function Register({navigation}) {
    let [fontsLoaded] = useFonts({
        oxygen_regular: require('../assets/font/Oxygen-Regular.ttf'),
        oxygen_bold: require('../assets/font/Oxygen-Bold.ttf'),
        oxygen_light: require('../assets/font/Oxygen-Light.ttf'),
        introScript: require('../assets/font/intro-script-demo-medium.otf')
    });

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onSubmit = () => {
        if ((regex.test(email) === false) && email) {
            setError("Invalid email address")
        }  else if (username.length < 4) {
            setError("The username must have a minimum length of 4 characters")
        } else if (password.length < 6) {
            setError("The password must have a minimum length of 6 characters")
        } else {
            setError("")
            console.log("C'est bon")
        }
    }

    if (!fontsLoaded)
        return null

    return (
        <SafeAreaView style={{justifyContent: "center", alignItems: "center", marginTop: 30}}>
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
                        fontFamily: "oxygen_bold",
                        marginTop: 20
                    }}
                >
                    Already got an account ? Login here
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    label: {
        marginTop: 10,
        fontFamily: "oxygen_bold",
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