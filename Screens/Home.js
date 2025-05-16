import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Title from "../Components/Title";
import MoneyAmount from "../Components/MoneyAmount";
import { useSelector } from "react-redux";

export default function Home() {
  const Currency = useSelector(store=>store.Currency);
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  const navigation = useNavigation();
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
          <Text style={styles.addHintText}>Tap to Add:</Text>
          <View style={styles.summaryItemsContainer}>
            <Pressable 
              android_ripple={{color: 'green'}} 
              onPress={() => navigation.navigate('Income')} 
              style={styles.summaryItem}
            >
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={[styles.summaryValue, styles.incomeText]}>+{Currency.income}</Text>
            </Pressable>
            <Pressable 
              android_ripple={{color: 'red'}} 
              onPress={() => navigation.navigate('Expense')} 
              style={styles.summaryItem}
            >
              <Text style={styles.summaryLabel}>Expenses</Text>
              <Text style={[styles.summaryValue, styles.expenseText]}>-{Currency.expense}</Text>
            </Pressable>
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
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 10,
    marginTop: 20,
    elevation: 3,
  },
  addHintText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
    marginBottom: 15,
    textAlign: "center"
  },
  summaryItemsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: "#f8f9fa",
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
