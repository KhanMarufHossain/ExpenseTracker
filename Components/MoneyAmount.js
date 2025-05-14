import { View, Text, StyleSheet } from "react-native";

export default function MoneyAmount({ money }) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.moneyText}>{money}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#4ba77b",
    borderRadius: 50,
    alignItems: "center",
    // marginTop: 40,
    marginHorizontal: 50,
    elevation: 3,
    height: 100,
  },

  moneyText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
  },
});
