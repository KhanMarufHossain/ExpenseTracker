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
      <StatusBar backgroundColor="#1a73e8" barStyle="light-content" />
      <View style={styles.mainContainer}>
        <Title name= "WALLET"/>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <MoneyAmount />
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={[styles.summaryValue, styles.incomeText]}>+$0.00</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Expenses</Text>
            <Text style={[styles.summaryValue, styles.expenseText]}>-$0.00</Text>
          </View>
        </View>
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
  balanceContainer: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
    letterSpacing: 1,
  },
  summaryContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 10,
    marginTop: 20,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  incomeText: {
    color: "#4ba77b",
  },
  expenseText: {
    color: "#e74c3c",
  },
});
