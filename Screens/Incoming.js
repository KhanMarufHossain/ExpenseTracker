import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import Title from "../Components/Title";
import { setIncome } from "../Store/CurrencySlice";

const Income = () => {
  const dispatch = useDispatch();
  const currency = useSelector((store) => store.Currency);

  const [amount, setAmount] = useState(0);
  const buttonhandler = () => {
    let  income = parseFloat(amount).toFixed(2) + parseFloat(currency.income.number);
    
    dispatch(setIncome({number: income}));
    setAmount('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />
      <Title name="Income Tracker" style={styles.title} />
      <Text style={styles.instructionText}>Add Money to track:</Text>
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
          <Button 
            title="Add" 
            onPress={buttonhandler} 
            color="#2E7D32"
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
  },
  title: {
    backgroundColor: "#2E7D32",
    borderRadius: 15,
    marginTop: 30,
    marginHorizontal: 30,
    paddingVertical: 18,
    elevation: 4,
  },
  instructionText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 25,
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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
