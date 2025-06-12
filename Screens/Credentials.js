import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function Credentials() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Not logged in</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Credentials</Text>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{user.name}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  value: { fontSize: 16, color: "#333" },
});