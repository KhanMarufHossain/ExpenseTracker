import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Home from "./Screens/Home";
import ChooseCurrency from "./Screens/Currency";
import { Store } from "./Store/store.js";
import { Provider, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerNavigation() {
  const currency = useSelector((store) => store.Currency);
  const initialRoute = currency?.code ? "Home" : "Currency";
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {backgroundColor: '#fff'},
        headerStyle : {backgroundColor: '#fff'}
      }}
      initialRouteName={initialRoute}
      backBehavior="firstroute"
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: "Expense Tracker",
          headerBackTitle: "Back",
          
        }}
      />
      <Drawer.Screen
        name="Currency"
        component={ChooseCurrency}
        options={{
          headerShown: true,
          title: "Select Currency",
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
