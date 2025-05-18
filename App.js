import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, ActivityIndicator, Alert, Button } from "react-native";
import * as Updates from 'expo-updates';
import Home from "./Screens/Home";
import ChooseCurrency from "./Screens/Currency";
import { Store } from "./Store/store.js";
import { Provider, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Income from "./Screens/Incoming.js";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Expense from './Screens/Expense.js';
const Stack = createNativeStackNavigator();
import History from "./Screens/ShowHistory.js";
const Drawer = createDrawerNavigator();
import React, { useState, useEffect } from 'react';
import { loadPersistedState } from './Store/persistenceMiddleware.js';
import { setCurrencyCode, setIncome, setExpense, updateTransactionTrack } from './Store/CurrencySlice.js';

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#f8f9fa",
          width: 250,
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
          paddingTop: 10,
        },
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -10,
        },
      }}
      initialRouteName= 'Home'
      backBehavior="initialRoute"
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "#2196F3",
            elevation: 5,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
          drawerActiveBackgroundColor: "#e3f2fd",
          drawerActiveTintColor: "#1976D2",
          drawerIcon: ({ color }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      
      <Drawer.Screen
        name="Income"
        component={Income}
        options={{
          title: "Add Earning",
          headerStyle: {
            backgroundColor: "#4CAF50",
            elevation: 5,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
          drawerActiveBackgroundColor: "#e8f5e9",
          drawerActiveTintColor: "#2E7D32",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="cash-plus" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Expense"
        component={Expense}
        options={{
          title: "Add Expense",
          headerStyle: {
            backgroundColor: "#e74c3c",
            elevation: 5,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
          drawerActiveBackgroundColor: "#fadbd8",
          drawerActiveTintColor: "#c0392b",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="cash-minus" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen  
        name="history" 
        component={History}
        options={{
          title: "Transaction History",
          headerStyle: {
            backgroundColor: "#607D8B",
            elevation: 5,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
          drawerActiveBackgroundColor: "#ECEFF1",
          drawerActiveTintColor: "#455A64",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Currency"
        component={ChooseCurrency}
        options={{
          headerShown: true,
          title: "Change Currency",
          headerStyle: {
            backgroundColor: "#9C27B0",
            elevation: 5,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
          drawerActiveBackgroundColor: "#f3e5f5",
          drawerActiveTintColor: "#7B1FA2",
          drawerIcon: ({ color }) => (
            <Ionicons name="cash-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for updates
  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        Alert.alert(
          "Update Available",
          "A new update is ready. The app will now restart to apply the changes.",
          [{ text: "OK", onPress: () => Updates.reloadAsync() }]
        );
      }
    } catch (error) {
      console.log('Error checking for updates:', error);
    }
  };

  useEffect(() => {
    const initializeStore = async () => {
      try {
        const persistedState = await loadPersistedState();
        
        if (persistedState) {
          Store.dispatch(setCurrencyCode(persistedState.code || 'USD'));
          Store.dispatch(setIncome({number: persistedState.income.number}));
          Store.dispatch(setExpense({number: persistedState.expense.number}));
            if (persistedState.transactiontrack && persistedState.transactiontrack.length > 0) {
            Store.dispatch({ type: 'currency/clearTransactions' });
            
            persistedState.transactiontrack.forEach(transaction => {
              Store.dispatch(updateTransactionTrack(transaction));
            });
          }
        }
      } catch (error) {
        console.error('Failed to initialize store:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeStore();
    checkForUpdates();
  }, []);
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading your wallet...</Text>
      </View>
    );
  }

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <DrawerNavigation />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#2196F3",
  }
});
