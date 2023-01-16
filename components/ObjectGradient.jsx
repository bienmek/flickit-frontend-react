import Svg, {Defs, Ellipse, RadialGradient, Stop} from "react-native-svg";
import {View} from "react-native";
import {legendary, light_gray, primary, rare, super_rare} from "../utils/colors";


export default function ObjectGradient ({currentObject, height, width}) {

    const computeColor = (rarity) => {
        switch (rarity) {
            case 1:
                return light_gray
            case 2:
                return rare
            case 3:
                return super_rare
            case 4:
                return primary
            case 5:
                return legendary
        }
    }

    return (
        <View
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            <Svg height={height} width={width}>
                <Defs>
                    <RadialGradient
                        id="grad"
                        cx={width/2}
                        cy={height/2}
                        rx={width/2}
                        ry={height/2}
                        fx={width/2}
                        fy={height/2}
                        gradientUnits="userSpaceOnUse"
                    >
                        <Stop offset="0" stopColor={computeColor(currentObject?.rarity)} stopOpacity="1" />
                        <Stop offset="1" stopColor="white" stopOpacity="1" />
                    </RadialGradient>
                </Defs>
                <Ellipse cx={width/2} cy={height/2} rx={width} ry={height} fill="url(#grad)" />
            </Svg>
        </View>
    )
}