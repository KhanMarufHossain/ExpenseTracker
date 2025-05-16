import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import Title from "../Components/Title";
import { useSelector } from "react-redux";

const Income = () => {
  const currency = useSelector((store) => store.Currency);
  const [amount, setAmount] = useState(0);
  const addmoneyHandler = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4ba77b" barStyle="light-content" />
      <Title name="Income Tracker" style={styles.title} />
      <View style={styles.inputContainer}>
        <Text style={styles.currencySymbol}>{currency.code}</Text>
        <TextInput
          style={styles.textInput}
          maxLength={8}
          keyboardType="number-pad"
          placeholder="0.00"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          onChangeText={(text) => setAmount(text)}
          value={amount}
        />
      </View>
      {amount && amount.toString().trim() ? (
        <View style={styles.button}>
          <Button title="nothing" />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4ba77b",
    paddingHorizontal: 16,
  },
  title: {
    backgroundColor: "#38865f",
    borderRadius: 15,
    marginTop: 30,
    marginHorizontal: 30,
    paddingVertical: 18,
    elevation: 4,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  currencySymbol: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 5,
  },
  textInput: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 50,
    borderBottomWidth: 3,
    borderBottomColor: "#fff",
    textAlign: "center",
    minWidth: 150,
    paddingBottom: 8,
  },
  button: {
    marginTop: 30,
    width: 150,
    height: 100,
    alignSelf: "flex-end",
    marginRight: 30,
  },
});

export default Income;
