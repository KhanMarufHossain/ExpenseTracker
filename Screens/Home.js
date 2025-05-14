import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
} from "react-native";

import Title from "../Components/Title";
import MoneyAmount from "../Components/MoneyContainer";

export default function Home() {
  
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  return (
    
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#1a73e8" barStyle="light-content" />
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
    backgroundColor: "#1a73e8",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#1a73e8",
    padding: 16,
  },
  yourwallettext: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
    marginTop: 20,
    marginVertical: 30,
    textAlign: "center",
  }
});
