import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { users } from "../samples/flick-object-sample";
import MyButton from "../components/MyButton";
import {
  dark_gray,
  gray,
  legendary,
  light_gray,
  primary,
  rare,
  secondary,
  super_rare,
} from "../utils/colors";

const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  return (
    
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        padding: 10,
        placeholderTextColor: "#ff0000",
      }}
    >
      <Text
        style={{
          color: primary,
          fontSize: 26,
          fontWeight: "bold",
        }}
      >
        Username :
      </Text>
      <TextInput
        style={{
          color: primary,
          fontSize: 26,
          fontWeight: "bold",
          borderBottomWidth: 1,
          padding: 10,
          borderColor: "lightgray",
          borderTopWidth: 0,
        }}
        placeholder={users[0].username}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text
        style={{
          color: primary,
          fontSize: 26,
          fontWeight: "bold",
        }}
      >
        Email :
      </Text>
      <TextInput
        style={{
          fontSize: 20,
          color: primary,
          fontWeight: "bold",
          borderBottomWidth: 1,
          borderColor: "lightgray",
          padding: 10,
          borderTopWidth: 0,
        }}
        placeholder={users[0].email}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View
        style={{
            flexDirection: 'row',
            paddingTop: 20,
        }}

      >
        <MyButton title="Save" onPress={() => console.log("Settings saved")} />
        <MyButton title="Logout" onPress={() => console.log("User @ logout")} />
      </View>
    </View>
  );
};

export default EditProfile;
