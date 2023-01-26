import {ScrollView} from "react-native";
import TopTab from "../components/TopTab";
import EditProfile from "../components/EditProfile";
import ToasterContainer from "../components/Toasters/ToasterContainer";


export default function Settings ({navigation}) {
    return (
        <>
            <TopTab navigation={navigation} />
            <ToasterContainer />
            <ScrollView
                style={{
                    backgroundColor: "white"
                }}
            >
                <EditProfile/>
            </ScrollView>
        </>
    )
}