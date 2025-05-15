import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
} from "react-native";

import Title from "../Components/Title";
import MoneyAmount from "../Components/MoneyAmount";

export default function Home() {
  
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  return (
    
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#fff" barStyle="light-content" />
      <View style={styles.mainContainer}>
        <Title/>
        <Text style= {styles.yourwallettext}>Balance:</Text>
        <MoneyAmount />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  yourwallettext: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 1,
    marginTop: 20,
    marginVertical: 30,
    textAlign: "center",
  }
});
