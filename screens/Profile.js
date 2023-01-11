import {SafeAreaView, Text} from "react-native";
import BottomTab from "../components/BottomTab";
import TopTab from "../components/TopTab";


export default function Profile ({navigation}) {

    return (
        <>
            <TopTab navigation={navigation} />
            <SafeAreaView>
                <Text>
                    Hello from profile !
                </Text>
            </SafeAreaView>
            <BottomTab navigation={navigation} />
        </>
    )
}