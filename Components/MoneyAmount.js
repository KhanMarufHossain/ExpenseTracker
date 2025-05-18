import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function MoneyAmount() {
  const Currency = useSelector((store) => store.Currency);
  
  const incomeNumber = parseFloat(Currency?.income?.number || 0);
  const expenseNumber = parseFloat(Currency?.expense?.number || 0);
  
  const balance = (incomeNumber - expenseNumber).toFixed(2);
  const isNegative = parseFloat(balance) < 0;
  
  const displayBalance = isNegative ? 
    `-${Math.abs(parseFloat(balance)).toFixed(2)}` : 
    balance;
  
  return (
    <View style={[
      styles.mainContainer, 
      isNegative ? styles.negativeContainer : styles.positiveContainer
    ]}>
      <Text style={styles.currencycode}>{Currency?.code || 'USD'}</Text>
      <Text style={[
        styles.moneyText, 
        isNegative ? styles.negativeText : styles.positiveText
      ]}>
        {displayBalance}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  positiveContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  negativeContainer: {
    backgroundColor: "rgba(231, 76, 60, 0.2)",
  },
  currencycode: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginRight: 8,
  },
  moneyText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  positiveText: {
    color: "#ffffff",
  },
  negativeText: {
    color: "#ffccbc",
  },
});
