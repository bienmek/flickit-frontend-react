import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Ranking from "./screens/Ranking";
import CameraScreen from "./screens/CameraScreen"
import ObjectContextProvider from "./context/objectContext";

const Stack = createStackNavigator()

export default function App() {
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
              </Stack.Navigator>
          </ObjectContextProvider>
      </NavigationContainer>
  );
}
