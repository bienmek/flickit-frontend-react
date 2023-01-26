import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Ranking from "./screens/Ranking";
import CameraScreen from "./screens/CameraScreen"
import Settings from "./screens/Settings";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import ImageViewer from "./screens/ImageViewer";
import Loading from "./components/Loading";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase";
import {UserContextProvider} from "./context/userContext";
import EmailVerification from "./screens/EmailVerification";
import {store} from "./redux/store";
import {Provider} from "react-redux";
import FlickContextProvider from "./context/flickContext";
import {getAuthedUserStorage} from "./services/storage-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator()

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [displaySettingPage, setDisplaySettingPage] = useState(false);

    async function isUserFirstLogin (uid) {
        const storage =  await getAuthedUserStorage(uid)
        setDisplaySettingPage(!storage)
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (res) => {
            if (res?.emailVerified) {
                setUser(res)
                await isUserFirstLogin(res.uid)
                setLoading(false)
            } else {
                setUser(null)
                setLoading(false)
            }
            console.log(`${res?.email} from App.js !`)
        })
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }

    if (user && displaySettingPage) {
        return (
            <NavigationContainer>
                <UserContextProvider>
                    <Provider store={store}>
                        <Stack.Navigator initialRouteName={"Register"}>
                            <Stack.Screen name={"Settings"} component={Settings} options={{headerShown: false}}/>
                        </Stack.Navigator>
                    </Provider>
                </UserContextProvider>
            </NavigationContainer>
        )
    }

    if (user) {
        return (
            <NavigationContainer>
                <UserContextProvider>
                    <Provider store={store}>
                        <FlickContextProvider>
                            <Stack.Navigator initialRouteName={"Home"}>
                                <Stack.Screen name={"Home"} component={Home} options={{animationEnabled: false, headerShown: false}}/>
                                <Stack.Screen name={"Profile"} component={Profile} options={{animationEnabled: false, headerShown: false}}/>
                                <Stack.Screen name={"Ranking"} component={Ranking} options={{animationEnabled: false, headerShown: false}}/>
                                <Stack.Screen name={"CameraScreen"} component={CameraScreen} options={{animationEnabled: false, headerShown: false}}/>
                                <Stack.Screen name={"ConfirmationScreen"} component={ConfirmationScreen} options={{headerShown: false}}/>
                                <Stack.Screen name={"ImageViewer"} component={ImageViewer} options={{headerShown: false}}/>
                                <Stack.Screen name={"Settings"} component={Settings} options={{headerShown: false}}/>
                            </Stack.Navigator>
                        </FlickContextProvider>
                    </Provider>
                </UserContextProvider>
            </NavigationContainer>
        )
    }

    return (
        <NavigationContainer>
            <UserContextProvider>
                <Stack.Navigator initialRouteName={"Register"}>
                    <Stack.Screen name={"Register"} component={Register} options={{headerShown: false}}/>
                    <Stack.Screen name={"Login"} component={Login} options={{headerShown: false}}/>
                    <Stack.Screen name={"EmailVerification"} component={EmailVerification} options={{headerShown: false}}/>
                </Stack.Navigator>
            </UserContextProvider>
        </NavigationContainer>
  )
}
