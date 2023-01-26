import React, {useEffect, useState} from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { users } from "../samples/flick-object-sample";
import { useUserContext } from "../context/userContext";
import {
  primary,
} from "../utils/colors";
import MyRangeSelector from "./MyRangeSelector";
import {getAuthedUserStorage, setAuthedUserStorage} from "../services/storage-manager";
import * as Updates from "expo-updates"
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {hideToaster, showToaster} from "../redux/actions/toasterActions";
import {delay} from "../utils/functions";
import UserInformationEditProfile from "./UserInformationEditProfile";

const EditProfile = () => {
    const [slideValue, setSlideValue] = useState(0);
    const [username, setUsername] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const {user, logoutUser, forgotPassword, setUpdateContext} = useUserContext();
    const [error, setError] = useState("");

    const navigation = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {
        getAuthedUserStorage(user?.uid)
            .then((res) => setProfilePicture(res.profilePicture ? res.profilePicture : "https://firebasestorage.googleapis.com/v0/b/worldtask-test.appspot.com/o/profile_picture%2Fblank_pp.png?alt=media&token=0c6a438a-6dcf-4491-94d5-c1ee187e6c08"))
    }, []);

    async function onSave () {
        if (username && username.length < 4) {
            setError("The username must have a minimum length of 4 characters")
            return
        }
        await setAuthedUserStorage(user?.uid, slideValue[0], null, profilePicture)
        if (!navigation.canGoBack()) {
            await Updates.reloadAsync()
        } else {
            setUpdateContext(Date.now())
            navigation.goBack()
            await delay(600)
            dispatch(showToaster({
                type: "SUCCESS",
                text: "Informations successfully updated !"
            }))

        }
    }

    async function changePassword () {
        try {
            dispatch(showToaster({
                type: "LOADING",
                text: ""
            }))

            await forgotPassword(user.email)

            dispatch(hideToaster())

            navigation.goBack()
            await delay(600)
            dispatch(showToaster({
                type: "SUCCESS",
                text: "A password change link has been sent in your mail-box !"
            }))

        } catch (e) {
            console.error(e)
            dispatch(hideToaster())
            navigation.goBack()
            await delay(600)
            dispatch(showToaster({
                type: "ERROR",
                text: "Too many mail sent, slowdown and check your mail-box"
            }))
        }
    }

  return (
      <>
          <UserInformationEditProfile profilePicture={setProfilePicture} />
          <MyRangeSelector slideValue={setSlideValue}/>
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
                  placeholder={user.displayName}
                  value={username}
                  onChangeText={(text) => setUsername(text)}
              />
              <View
                  style={{
                      flexDirection: "col",
                      paddingTop: 20,
                  }}
              >
                  <TouchableOpacity
                    onPress={changePassword}
                  >
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
                      onPress={() => logoutUser()}
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
                      onPress={onSave}
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

                      {error && (
                          <Text
                              style={{
                                  color: "red",
                                  fontWeight: "bold",
                                  fontSize: 13,
                                  textAlign: "center",
                                  marginTop: 10
                              }}
                          >
                              {error}
                          </Text>
                      )}
                  </TouchableOpacity>
              </View>
          </View>
      </>
  );
};

export default EditProfile;
