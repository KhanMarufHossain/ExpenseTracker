import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { useSelector } from 'react-redux';

export default function History() {
  const { transactiontrack, code } = useSelector((store) => store.Currency);
  
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No transactions yet</Text>
      <Text style={styles.emptySubText}>Add income or expenses to see your transaction history</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={[
      styles.transactionItem,
      item.isIncome ? styles.incomeItem : styles.expenseItem,
    ]}>
      <View style={styles.transactionContent}>
        <Text style={styles.description} numberOfLines={1}>
          {item.message}
        </Text>
        <Text style={[
          styles.amount,
          item.isIncome ? styles.incomeAmount : styles.expenseAmount
        ]}>
          {item.isIncome ? '+' : '-'} {code} {parseFloat(item.amount).toFixed(2)}
        </Text>
      </View>      <View style={styles.dateTimeContainer}>
        <Text style={styles.date}>{item.date || '10/12/2025'}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Transaction History</Text>
      </View>
      
      <FlatList
        data={transactiontrack}
        keyExtractor={(item) => item.$id || index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  titleContainer: {
    backgroundColor: '#607D8B',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    marginHorizontal: 15,
    borderRadius: 15,
    elevation: 2,
  },
  titleText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  transactionItem: {
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    elevation: 1,
    borderLeftWidth: 5,
  },
  incomeItem: {
    backgroundColor: '#e8f5e9',
    borderLeftColor: '#4CAF50',
  },
  expenseItem: {
    backgroundColor: '#ffebee',
    borderLeftColor: '#E53935',
  },
  transactionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    color: '#37474F',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  incomeAmount: {
    color: '#4CAF50',
  },
  expenseAmount: {
    color: '#E53935',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  date: {
    fontSize: 13,
    color: '#78909C',
    marginRight: 8,
  },
  time: {
    fontSize: 13,
    color: '#78909C',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#546E7A',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#78909C',
    textAlign: 'center',
    paddingHorizontal: 24,
  }
});