import {ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {setDoc, doc} from "firebase/firestore"
import {useUserContext} from "../context/userContext";
import {db} from "../firebase";
import TopTab from "../components/TopTab";
import {primary} from "../utils/colors";
import {useRegisterUser} from "../services/flickitApi";
import axios from "axios"

export default function EmailVerification({route, navigation}) {
    const {routeMail, routePassword} = route.params
    const [error, setError] = useState("");
    const {loginUser, loading, setLoading, sendEmail, logoutUser} = useUserContext()

    async function addUser (username, mail) {
        const data = {
            username,
            mail
        };

        const headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        const response = await axios.post('https://flick-it-auth-4nyk6wb3ua-ew.a.run.app/v1/register', data, {headers})
        console.log(response.data)
    }

    const emailVerified = async () => {
        setLoading(true)
        loginUser(routeMail, routePassword)
            .then(async (res) => {
                if (res.user.emailVerified) {
                    logoutUser()
                    loginUser(routeMail, routePassword)
                    await addUser(res.user.displayName, routeMail)
                }
                else {
                    setError("You need to verify your email address")
                }
            })
            .finally(() => setLoading(false))
    }

    const resendEmail = () => {
        sendEmail()
    }

    return (
        <>
            <TopTab navigation={navigation}/>
            <SafeAreaView
                style={{
                    justifyContent: "flex-start",
                    marginTop: 30,
                    marginLeft: 10,
                    flex: 1,
                    alignItems: "center"
                }}
            >
                {loading && (
                    <View style={{marginTop: 20}}>
                        <ActivityIndicator size="large" color="#959595" />
                    </View>
                )}
                {error && (
                    <Text
                        style={{
                            color: "red",
                            fontWeight: "bold",
                            fontSize: 13,
                            textAlign: "center",
                            marginBottom: 20
                        }}
                    >
                        {error}
                    </Text>
                )}
                <View style={{alignItems: "flex-start"}}>
                    <Text style={{fontSize: 18}}>
                        Un e-mail de vérification a été envoyé à l'adresse suivante: <Text style={{fontWeight: "bold"}}>{routeMail}</Text>
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={emailVerified}
                >
                    <Text style={{color: "white", fontSize: 16 ,fontWeight: "bold"}}>
                        Suivant
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonWhite}
                    onPress={resendEmail}
                >
                    <Text style={{color: primary, fontSize: 16 ,fontWeight: "bold"}}>
                        Renvoyer
                    </Text>
                </TouchableOpacity>

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 300,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: primary,
        borderRadius: 10,
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonWhite: {
        width: 300,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: primary,
        borderWidth: 1,
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center"
    }
})