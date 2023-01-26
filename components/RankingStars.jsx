import React from "react";
import { View, Text, FlatList } from "react-native";
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

class RankingStars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    fetch("https://flick-it-ranking-4nyk6wb3ua-ew.a.run.app/v1/ranking", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Mettre à jour l'état de l'application avec les données du classement
        this.setState({ ranking: data.ranking });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View>
        <Text
          style={{
            fontSize: 35,
            paddingStart: 10,
            color: primary,
            fontWeight: "bold",
          }}
        >
          Most stars
        </Text>
        <FlatList
          data={this.state.ranking}
          keyExtractor={(item, index) => item.username}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 35,
                  color: dark_gray,
                  paddingRight: index >= 4 ? 250 : 0
                }}
              >
                {index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : index + 1 + ". "}
              </Text>
              <Text style={{ fontSize: 35, color: dark_gray, paddingStart: 5 }}>
                @{item.username}
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  color: dark_gray,
                  textAlign: "right",
                  paddingStart: 5,
                  flex: 1,
                }}
              >
                {item.totalPoint}
                {"⭐"}
              </Text>
            </View>
          )}
        />
      </View>
    );
  }
}

export default RankingStars;
