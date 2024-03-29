import {TouchableOpacity, View, Text} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useDispatch} from "react-redux";
import {hideToaster, showToaster} from "../../redux/actions/toasterActions";
import {useEffect} from "react";
import LoadingBar from "../Utils/LoadingBar";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {primary} from "../../utils/colors";

export default function SuccessToaster ({successMessage}) {

    const dispatch = useDispatch()

    return (
        <View
            style={{
                width: "95%",
                borderRadius: 20,
                position: "absolute",
                top: 20,
                backgroundColor: primary,
                alignSelf: "center",
                zIndex: 99,
                paddingVertical: 5,
            }}
        >
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => dispatch(hideToaster())}
                style={{
                    position: "absolute",
                    alignSelf: "flex-end",
                    height: 25,
                    width: 25,
                    justifyContent: "center",
                    alignItems: "center",
                    top: 5,
                    right: 5,
                    zIndex: 200
                }}
            >
                <AntDesign
                    name={"close"}
                    size={25}
                    color={"white"}
                />
            </TouchableOpacity>

            <View
                style={{
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    zIndex: 100,
                    alignItems: "center",
                    justifyContent: "flex-end",
                    bottom: 0
                }}
            >
                <LoadingBar color={primary}/>

            </View>

            <View
                style={{
                    paddingHorizontal: 30,
                    paddingVertical: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    borderRadius: 20,
                    flexDirection: "row"
                }}
            >

                <FontAwesome5
                    name={"check-circle"}
                    size={25}
                    color={"white"}
                />
                <Text
                    style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginLeft: 5
                    }}
                >
                    {successMessage}
                </Text>
            </View>
        </View>
    )
}