import React, { useState } from "react";
import { View, TextInput, Text, Slider } from "react-native";
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

function MyRangeSelector({ onValueChange }) {
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
          Number of notifications : {value}
        </Text>
        <View style={{ width: "50%", alignSelf: "center"}}>
          <Slider
            minimumValue={1}
            maximumValue={12}
            step={1}
            value={value}
            onValueChange={(newValue) => {
              setValue(newValue);
              onValueChange(newValue);
            }}
          />
        </View>

      </View>
    </>
  );
}

export default MyRangeSelector;
