import { View, Text, Image, TouchableOpacity, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';

const Profil = require("../assets/images/titoux.jpeg");
const Settings = require("../assets/images/settings.png");
const Avatar = require("../assets/images/avatar.png");

export default function UserInformation() {
  const [avatar, setAvatar] = useState(null);

  const handleChooseImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setAvatar(result.uri);
      }
    } catch (error) {
      Alert.alert("An error occured", error.message);
    }
  };

  return (
    <View style={{
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 20,
    }}>
      <Image
        source={Profil}
        style={{
          height: 80,
          width: 80,
          marginRight: 10,
          borderRadius: 50,
        }}
      />
      <TouchableOpacity onPress={handleChooseImage}>
        <Image
          source={avatar ? { uri: avatar } : Avatar}
          style={{
            height: 86,
            marginLeft: 10,
            width: 86,
            borderRadius: 50,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
