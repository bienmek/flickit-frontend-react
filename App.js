import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Ranking from "./screens/Ranking";
import CameraScreen from "./screens/CameraScreen"
import ObjectContextProvider from "./context/objectContext";
<<<<<<< HEAD
import Settings from "./screens/Settings";
=======
import ConfirmationScreen from "./screens/ConfirmationScreen";
import ImageViewer from "./screens/ImageViewer";
import Loading from "./components/Loading";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase";
import {UserContextProvider} from "./context/userContext";
import EmailVerification from "./screens/EmailVerification";
>>>>>>> 72a078a5ae308529e0fd64cc9102a7c56aabe58e

const Stack = createStackNavigator()

export default function App() {
<<<<<<< HEAD
  return (
      <NavigationContainer>
          <ObjectContextProvider>
              <Stack.Navigator initialRouteName={"Register"}>
                  <Stack.Screen name={"Sign Up"} component={Register} options={{animationEnabled: false, headerShown: false}}/>
                  <Stack.Screen name={"Log In"} component={Login} options={{headerShown: false}}/>
                  <Stack.Screen name={"Home"} component={Home} options={{animationEnabled: false, headerShown: false}}/>
                  <Stack.Screen name={"Profile"} component={Profile} options={{animationEnabled: false, headerShown: false}}/>
                  <Stack.Screen name={"Ranking"} component={Ranking} options={{animationEnabled: false, headerShown: false}}/>
                  <Stack.Screen name={"CameraScreen"} component={CameraScreen} options={{animationEnabled: false, headerShown: false}}/>
                  <Stack.Screen name={"Settings"} component={Settings} options={{headerShown: false}}/>
              </Stack.Navigator>
          </ObjectContextProvider>
      </NavigationContainer>
  );
=======
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (res) => {
            if (res?.emailVerified) {
                setUser(res)
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

    if (user) {
        return (
            <NavigationContainer>
                <ObjectContextProvider>
                    <UserContextProvider>
                        <Stack.Navigator initialRouteName={"Home"}>
                            <Stack.Screen name={"Home"} component={Home} options={{animationEnabled: false, headerShown: false}}/>
                            <Stack.Screen name={"Profile"} component={Profile} options={{animationEnabled: false, headerShown: false}}/>
                            <Stack.Screen name={"Ranking"} component={Ranking} options={{animationEnabled: false, headerShown: false}}/>
                            <Stack.Screen name={"CameraScreen"} component={CameraScreen} options={{animationEnabled: false, headerShown: false}}/>
                            <Stack.Screen name={"ConfirmationScreen"} component={ConfirmationScreen} options={{headerShown: false}}/>
                            <Stack.Screen name={"ImageViewer"} component={ImageViewer} options={{headerShown: false}}/>
                        </Stack.Navigator>
                    </UserContextProvider>
                </ObjectContextProvider>
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

>>>>>>> 72a078a5ae308529e0fd64cc9102a7c56aabe58e
}
