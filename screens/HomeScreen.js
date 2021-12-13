import React from "react";
import { Image, View } from "react-native";
import { styles } from "../styles";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: require('../assets/Stundenplan.png')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={this.state.image} style={{width: '100%'}} />
      </View>
    );
  }
}

export default HomeScreen;