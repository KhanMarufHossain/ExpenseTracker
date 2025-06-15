import { StatusBar } from "expo-status-bar";
import { loadUserTransactions } from './Store/transactionThunks';
import { StyleSheet, View, Text, ActivityIndicator, Alert, Button, TouchableOpacity, ScrollView } from "react-native";
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
import { setCurrencyCode, setIncome, setExpense, updateTransactionTrack, clearTransactions } from './Store/CurrencySlice.js';
import AboutScreen from './Screens/AboutScreen';
import AuthScreen from "./Screens/AuthScreen";
import Credentials from "./Screens/Credentials";
import NetInfo from '@react-native-community/netinfo';
import { databases, account } from './Store/appwrite';
import { Query, Permission, Role } from 'appwrite';
import { DATABASE_ID, COLLECTION_ID } from './Store/transactionThunks';

function DrawerNavigation() {
  const handleManualUpdate = async () => {
    try {
      Alert.alert("Checking for Updates", "Please wait while we check for updates...");
      
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        Alert.alert(
          "Update Available",
          "A new update is available. Would you like to download and install it now?",
          [
            { text: "Not Now", style: "cancel" },
            { 
              text: "Update", 
              onPress: async () => {
                try {
                  await Updates.fetchUpdateAsync();
                  Alert.alert(
                    "Update Downloaded",
                    "The update has been downloaded. The app will now restart to apply the changes.",
                    [{ text: "OK", onPress: () => Updates.reloadAsync() }]
                  );
                } catch (error) {
                  Alert.alert("Error", "Failed to download the update. Please try again later.");
                  console.error("Update download error:", error);
                }
              }
            }
          ]
        );
      } else {
        Alert.alert("No Updates", "Your app is already up to date!");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to check for updates. Please try again later.");
      console.error("Update check error:", error);
    }
  };

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
      
      
      <Drawer.Screen
        name="CheckForUpdates"
        options={{
          title: "Check for Updates",
          drawerIcon: ({color, size}) => (
            <Ionicons name="refresh-circle-outline" size={size} color={color} />
          )
        }}>
        {() => (
          <View style={styles.updateContainer}>
            <Text style={styles.updateTitle}>App Updates</Text>
            <Text style={styles.updateDescription}>
              Your app automatically checks for updates when it starts.
              You can also manually check for updates here.
            </Text>
            <TouchableOpacity 
              style={styles.updateButton} 
              onPress={handleManualUpdate}
            >
              <Text style={styles.updateButtonText}>Check for Updates</Text>
            </TouchableOpacity>
          </View>
        )}
      </Drawer.Screen>
      
      
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: "About",
          headerStyle: {
            backgroundColor: "#FF9800", 
            elevation: 5,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
          drawerActiveBackgroundColor: "#FFF3E0",
          drawerActiveTintColor: "#E65100",
          drawerIcon: ({ color }) => (
            <Ionicons name="information-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Credentials"
        component={Credentials}
        options={{
          title: "My Credentials",
          headerStyle: { backgroundColor: "#1976D2", elevation: 5 },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          drawerActiveBackgroundColor: "#e3f2fd",
          drawerActiveTintColor: "#1976D2",
          drawerIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function MainApp() {
  const user = useSelector((state) => state.auth.user);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {user ? <DrawerNavigation /> : <AuthScreen />}
    </NavigationContainer>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Check for updates
  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        
        Alert.alert(
          "Update Available",
          "A new update is available. Would you like to download and install it now?",
          [
            { text: "Later", style: "cancel" },
            { 
              text: "Update Now", 
              onPress: async () => {
                try {
                  await Updates.fetchUpdateAsync();
                  Alert.alert(
                    "Update Downloaded",
                    "The update has been downloaded. The app will now restart to apply the changes.",
                    [{ text: "OK", onPress: () => Updates.reloadAsync() }]
                  );
                } catch (error) {
                  Alert.alert("Error", "Failed to download the update. Please try again later.");
                  console.error("Update download error:", error);
                }
              }
            }
          ]
        );
      }
    } catch (error) {
      console.log('Error checking for updates:', error);
      
    }
  };

  const syncOfflineTransactions = async () => {
    const state = Store.getState();
    if (state?.Currency?.transactiontrack) {
      const pendingTransactions = state.Currency.transactiontrack.filter(tx => tx.pendingSync);
      
      for (const tx of pendingTransactions) {
        try {
          const { pendingSync, $id, ...transactionData } = tx;
          
          await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            "unique()",
            transactionData,
            [
              Permission.read(Role.user(tx.userId)),
              Permission.update(Role.user(tx.userId)),
              Permission.delete(Role.user(tx.userId)),
              Permission.write(Role.user(tx.userId)),
            ]
          );
          
          Store.dispatch({ 
            type: 'currency/removeTransaction', 
            payload: { id: $id } 
          });
          
        } catch (error) {
          console.error("Failed to sync transaction:", error);
        }
      }
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && Store.getState().auth?.user) {
        syncOfflineTransactions();
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const initializeStore = async () => {
      try {
        const persistedState = await loadPersistedState();
        if (persistedState) {
          Store.dispatch(setCurrencyCode(persistedState.code || 'USD'));
          Store.dispatch(setIncome({number: persistedState.income.number || 0}));
          Store.dispatch(setExpense({number: persistedState.expense.number || 0}));
          
          Store.dispatch(clearTransactions());
          
          if (persistedState.transactiontrack && persistedState.transactiontrack.length > 0) {
            persistedState.transactiontrack.forEach(transaction => {
              Store.dispatch(updateTransactionTrack(transaction));
            });
          }
        }
        
        try {
          const session = await account.getSession('current');
          if (session) {
            const user = await account.get();
            Store.dispatch(setUser(user));
          }
        } catch (sessionError) {
          console.log('No active session');
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
      <MainApp />
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
  },
  updateContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  updateTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  updateDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
    lineHeight: 24,
  },
  updateButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  }
});
