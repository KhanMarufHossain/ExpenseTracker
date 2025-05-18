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
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content" />
      <View style={styles.mainContainer}>
        <Title name= "WALLET" style={styles.title}/>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <MoneyAmount /> // Here we show the wallet balance
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.addHintText}>Tap to Add:</Text>
          <View style={styles.summaryItemsContainer}>
            <Pressable 
              android_ripple={{color: 'rgba(76, 175, 80, 0.2)'}} 
              onPress={() => navigation.navigate('Income')} 
              style={styles.summaryItem}
            >
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={[styles.summaryValue, styles.incomeText]}>+{Currency.income.number}</Text>
            </Pressable>
            <Pressable
              android_ripple={{color: 'rgba(231, 76, 60, 0.2)'}} 
              onPress={() => navigation.navigate('Expense')} 
              style={styles.summaryItem}
            >
              <Text style={styles.summaryLabel}>Expenses</Text>
              <Text style={[styles.summaryValue, styles.expenseText]}>-{(Currency.expense.number)}</Text>
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
    backgroundColor: "#2196F3",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#2196F3",
    padding: 16,
  },
  title: {
    backgroundColor: "#1976D2",
    borderRadius: 15,
    marginTop: 30,
    marginHorizontal: 30,
    paddingVertical: 18,
    elevation: 4,
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
    color: "#4CAF50",
  },
  expenseText: {
    color: "#e74c3c",
  },
});
