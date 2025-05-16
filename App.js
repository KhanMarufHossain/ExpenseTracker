import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
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
const Drawer = createDrawerNavigator();
function DrawerNavigation() {
  const currency = useSelector((store) => store.Currency);
  
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
        headerStyle: {
          backgroundColor: "#4CAF50",
          elevation: 5,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -10,
        },
        drawerActiveBackgroundColor: "#e8f5e9",
        drawerActiveTintColor: "#2E7D32",
      }}
      initialRouteName= 'Home'
      backBehavior="initialRoute"
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          drawerIcon: ({ color }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Currency"
        component={ChooseCurrency}
        options={{
          headerShown: true,
          title: "Change Currency",
          drawerIcon: ({ color }) => (
            <Ionicons name="cash-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Income"
        component={Income}
        options={{
          title: "Add Earning",
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
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="cash-minus" size={22} color={color} />
          ),
        }}
      />

    </Drawer.Navigator>
  );
}

export default function App() {
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
});
