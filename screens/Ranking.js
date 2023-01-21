import {SafeAreaView, Text} from "react-native";
import BottomTab from "../components/BottomTab";
import MostStars from "../components/MostStars";
import TopTab from "../components/TopTab";
import BestAverageTime from "../components/BestAverageTime";
import { ScrollView } from "react-native-gesture-handler";
import MostFlicks from "../components/MostFlicks";


export default function Ranking ({navigation}) {
    return (
        <>
            <TopTab navigation={navigation} />
            <ScrollView>
                <MostStars/>
                <BestAverageTime/>
                <MostFlicks/>
            </ScrollView>
            <BottomTab navigation={navigation} />
        </>
    )
}