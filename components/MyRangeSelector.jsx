import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import {
  primary,
} from "../utils/colors";
import {Slider} from "@miblanchard/react-native-slider";

function MyRangeSelector({ slideValue }) {
  const [value, setValue] = useState(1);
  
  return (
    <>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          padding: 10,
          borderWidth: 1, borderColor: 'lightgray' 
        }}
      >
        <Text
          style={{
            color: primary,
            fontSize: 26,
            fontWeight: "bold",
          }}
        >
          Notifications per day: {value}
        </Text>
        <View style={{ width: "80%", alignSelf: "center"}}>
          <Slider
            minimumValue={1}
            maximumValue={24}
            step={1}
            value={value}
            onValueChange={(newValue) => {
              setValue(newValue);
              slideValue(newValue);
            }}
          />
        </View>

      </View>
    </>
  );
}

export default MyRangeSelector;
