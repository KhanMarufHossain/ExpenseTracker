import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function MoneyAmount({ money = "0.00" }) {
  
  const Currency= useSelector((store)=>store.Currency);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.currencycode}>{Currency.code}</Text>
      <Text style={styles.moneyText}>{money}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#4ba77b",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    paddingVertical: 22,
    paddingHorizontal: 40,
    elevation: 4,// shadow for ios
    flexDirection: "row",
  },
  currencycode: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 5,
    opacity: 0.9,
  },
  moneyText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
  },
});
