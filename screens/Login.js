import {ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import TopTab from "../components/TopTab";
import {useUserContext} from "../context/userContext";

export default function Login({navigation}) {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {loginUser, loading, setLoading} = useUserContext()

    const onSubmit = () => {
        setLoading(true)
        loginUser(email, password)
            .then(() => {
                setError("")
            })
            .catch(() => setError("E-mail and password doesnt match"))
            .finally(() => setLoading(false))
    }

    return (
        <>
            <TopTab navigation={navigation} />
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
                        Log In
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