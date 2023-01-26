import { View, Text, Image, TouchableOpacity, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import {useUserContext} from "../context/userContext";
import {getAuthedUserStorage} from "../services/storage-manager";

const Profil = require("../assets/images/titoux.jpeg");
const Settings = require("../assets/images/settings.png");
const Avatar = require("../assets/images/avatar.png");

export default function UserInformationEditProfile({profilePicture}) {
  const [avatar, setAvatar] = useState(null);
  const [pfp, setPfp] = useState("https://firebasestorage.googleapis.com/v0/b/worldtask-test.appspot.com/o/profile_picture%2Fblank_pp.png?alt=media&token=0c6a438a-6dcf-4491-94d5-c1ee187e6c08");

    const {user} = useUserContext()

    useEffect(() => {
        getAuthedUserStorage(user?.uid)
            .then((res) => setPfp(res.profilePicture ? res.profilePicture : "https://firebasestorage.googleapis.com/v0/b/worldtask-test.appspot.com/o/profile_picture%2Fblank_pp.png?alt=media&token=0c6a438a-6dcf-4491-94d5-c1ee187e6c08"))
    }, []);

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
        profilePicture(result.uri)
      }
    } catch (error) {
      console.error(error)
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
        source={{uri: pfp}}
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
