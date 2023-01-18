import ImagePicker from 'react-native-image-picker';
import { TouchableOpacity, Image } from 'react-native';
import React, { useState } from "react";


const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Avatar = require("../assets/images/avatar.png");

function HandleChooseImage() {
  const [avatar, setAvatar] = useState(null);
  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      setAvatar(response);
    }
  });
  return (
    <TouchableOpacity onPress={HandleChooseImage}>
      <Image
        source={Avatar}
        style={{
          height: 86,
          marginLeft: 10,
          width: 86,
          borderRadius: 50,
        }}
      />
    </TouchableOpacity>
  )
}
