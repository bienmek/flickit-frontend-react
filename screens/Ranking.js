import {SafeAreaView, Text} from "react-native";
import BottomTab from "../components/BottomTab";
import TopTab from "../components/TopTab";


export default function Ranking ({navigation}) {
    return (
        <>
            <TopTab navigation={navigation} />
            <SafeAreaView>
                <Text>
                    Hello from Ranking !!
                </Text>
            </SafeAreaView>
            <BottomTab navigation={navigation} />
        </>
    )
}