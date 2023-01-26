import { TouchableOpacity, Text, View } from "react-native";

function MyButton({ title, onPress }) {
  return (
    <View style={{flex: 1, justifyContent: "center"}}>
    <TouchableOpacity
      style={{ 
        backgroundColor: "blue", 
        padding: 10,
        width: '50%', 
        alignItems: "center", 
        alignSelf: "center", 
        borderRadius: 20
      }}
      onPress={onPress}
    >
      <Text style={{ color: "white" }}>{title}</Text>
    </TouchableOpacity>
  </View>
  
  );
}

export default MyButton;
