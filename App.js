import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Register from "./screens/Register";
import Login from "./screens/Login";

const Stack = createStackNavigator()
export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName={"Register"}>
              <Stack.Screen name={"SignUp"} component={Register}/>
              <Stack.Screen name={"Login"} component={Login}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}
