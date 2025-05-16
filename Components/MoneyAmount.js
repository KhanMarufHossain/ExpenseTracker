import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function MoneyAmount() {
  
  const Currency = useSelector((store) => store.Currency);
  const Balance = Currency.income - Currency.expense;
  const isNegative = Balance < 0;
  
  return (
    <View style={[
      styles.mainContainer, 
      isNegative ? styles.negativeContainer : null
    ]}>
      <Text style={styles.currencycode}>{Currency.code}</Text>
      <Text style={[
        styles.moneyText, 
        isNegative ? styles.negativeText : null
      ]}>
        {isNegative ? `-${Math.abs(Balance)}` : Balance}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#1976D2",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    paddingVertical: 22,
    paddingHorizontal: 40,
    elevation: 4,
    flexDirection: "row",
  },
  negativeContainer: {
    backgroundColor: "#d32f2f",
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
  negativeText: {
    color: "#ffcdd2",
  },
});
