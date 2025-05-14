import { View, TextInput, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { setCurrency } from "../Store/CurrencySlice";
import { useDispatch , useSelector} from "react-redux";

export default function ChooseCurrency() {
  const [enteredText, setEnteredText] = useState('');
  const dispatch= useDispatch();
  const currency = useSelector((state)=>state.CurrencyReducer);
  return (
    <View>
      <TextInput
        placeholder="Currency: "
        onChangeText={(text) => setEnteredText(text)}
      />
      <Button title="Add Currency" onPress={()=>dispatch(setCurrency(enteredText))} />
        <Button title= "check store" onPress={()=>console.log(currency.code)}/>
      
    </View>
  );
}
