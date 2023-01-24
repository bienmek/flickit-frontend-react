import React, { useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import { users } from "../samples/flick-object-sample";
import MyButton from "../components/MyButton";
import { useUserContext } from "../context/userContext";
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
  const { user, logoutUser } = useUserContext();

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
          color: "black",
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
          fontSize: 26,
          color: "black",
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
          flexDirection: "col",
          paddingTop: 20,
        }}
      >
        <TouchableOpacity style={{}} onPress={() => logoutUser()}>
          <Text
            style={{
              color: primary,
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            Change password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 10,
          }}
          //onPress={() => }
        >
          <Text
            style={{
              color: "red",
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 10,
          }}
          //onPress={() => }
        >
          <Text
            style={{
              color: "blue",
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;
