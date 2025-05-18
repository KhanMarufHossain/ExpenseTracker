import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Title from "../Components/Title";
import MoneyAmount from "../Components/MoneyAmount";
import { useSelector } from "react-redux";
import * as Updates from 'expo-updates';

export default function Home() {
  const Currency = useSelector(store => store.Currency);
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  const navigation = useNavigation();
  
  const incomeValue = parseFloat(Currency?.income?.number || 0).toFixed(2);
  const expenseValue = parseFloat(Currency?.expense?.number || 0).toFixed(2);
  
  const checkForUpdates = async () => {
    try {
      Alert.alert("Checking for Updates", "Please wait while we check for new updates...");
      const update = await Updates.checkForUpdateAsync();
      
      if (update.isAvailable) {
        const fetchResult = await Updates.fetchUpdateAsync();
        Alert.alert(
          "Update Available",
          "A new update has been downloaded. The app will now restart to apply the changes.",
          [{ text: "OK", onPress: () => Updates.reloadAsync() }]
        );
      } else {
        Alert.alert("No Updates", "Your app is already up to date!");
      }
    } catch (error) {
      console.log('Error checking for updates:', error);
      Alert.alert("Update Error", "Failed to check for updates. Please try again later.");
    }
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content" />
      <View style={styles.mainContainer}>
        <Title name= "WALLET" style={styles.title}/>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <MoneyAmount />
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
              <Text style={[styles.summaryValue, styles.incomeText]}>
                {`+${incomeValue}`}
              </Text>
            </Pressable>
            <Pressable
              android_ripple={{color: 'rgba(231, 76, 60, 0.2)'}} 
              onPress={() => navigation.navigate('Expense')} 
              style={styles.summaryItem}
            >
              <Text style={styles.summaryLabel}>Expenses</Text>
              <Text style={[styles.summaryValue, styles.expenseText]}>
                {`-${expenseValue}`}
              </Text>
            </Pressable>
          </View>
        </View>
        
        <Pressable 
          style={styles.updateButton}
          android_ripple={{color: 'rgba(255, 255, 255, 0.2)'}} 
          onPress={checkForUpdates}
        >
          <Text style={styles.updateButtonText}>Check for Updates</Text>
        </Pressable>
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
  updateButton: {
    backgroundColor: "#1565C0",
    borderRadius: 10,
    padding: 14,
    marginTop: 30,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
