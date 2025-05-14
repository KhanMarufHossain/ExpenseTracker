import { View, TextInput, StyleSheet, Button } from "react-native";
import { useState } from "react";

export default function ChooseCurrency() {
  const [enteredText, setEnteredText] = useState('');
  return (
    <View>
      <TextInput
        placeholder="Currency: "
        onChangeText={(text) => setEnteredText(text)}
      />
      
    </View>
  );
}
