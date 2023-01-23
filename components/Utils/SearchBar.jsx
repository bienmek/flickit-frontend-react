import {TextInput, View} from "react-native";
import Feather from "react-native-vector-icons/Feather";

export default function SearchBar ({callbackText, placeholder}) {

    return (
        <View
            style={{
                backgroundColor: "white",
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 20,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                width: "80%",
                top: 10,
                borderColor: "#959595",
                borderWidth: 1,
            }}
        >
            <Feather
                name="search"
                size={20}
                color="black"
            />

            <TextInput
                placeholder={placeholder}
                style={{
                    backgroundColor: "white",
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    fontSize: 15,
                    width: "100%"
                }}
                keyboardType={"twitter"}
                onChangeText={(text) => callbackText(text)}
            />
        </View>
    )
}