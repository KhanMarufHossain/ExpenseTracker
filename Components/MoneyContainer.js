import { View, Text, StyleSheet } from "react-native";

export default function MoneyContainer({ money }) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.moneyText}>{money}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#3498db",
    borderRadius: 50,
    alignItems: "center",
    marginTop: 40,
    marginHorizontal: 50,
    elevation: 3,
  },

  moneyText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
  },
});
