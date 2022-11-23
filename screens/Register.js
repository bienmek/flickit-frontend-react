import {SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";


export default function Register({navigation}) {
    return (
        <SafeAreaView style={{justifyContent: "center", alignItems: "center", marginTop: 30}}>
            <View>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    placeholder={"Enter username..."}
                    style={styles.input}
                />

                <Text style={styles.label}>E-mail</Text>
                <TextInput
                    placeholder={"Enter email..."}
                    style={styles.input}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder={"Enter password..."}
                    secureTextEntry={true}
                    style={styles.input}
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
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={{color: "white", fontWeight: "bold", fontSize: 15}}>Sign Up</Text>
            </TouchableOpacity>
            
            <Text
                style={{
                    color: "blue",
                    textAlign: "center",
                    textDecorationLine: "underline"
                }}
            >
                Already got an account ? Login here.
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    label: {
        fontWeight: "bold",
        marginTop: 10
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