import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

function AboutScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>About Expense Tracker</Text>
        
        <Text style={styles.sectionTitle}>App Version</Text>
        <Text style={styles.text}>1.0.0</Text>
        
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.text}>
          Expense Tracker helps you manage your personal finances by tracking
          your expenses and earnings. Keep an eye on your spending habits and
          take control of your financial health.
        </Text>
        
        <Text style={styles.sectionTitle}>Developer</Text>
        <Text style={styles.text}>Khan Maruf Hossain</Text>
        
        <Text style={styles.sectionTitle}>Contact</Text>
        <Text style={styles.text}>khan.hossain.242@northsouth.edu</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF9800", 
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', 
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
});

export default AboutScreen;