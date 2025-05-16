import { View, Text, StyleSheet, FlatList, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import Title from '../Components/Title';

const History = () => {
  const currency = useSelector((store) => store.Currency);
  
  // Combine income and expense tracks with transaction type
  const allTransactions = [
    ...currency.incometrack.map(item => ({...item, type: 'income'})),
    ...currency.expensetrack.map(item => ({...item, type: 'expense'}))
  ];
  
  // Create a function to convert date strings to Date objects for sorting
  const getDateFromString = (dateStr, timeStr) => {
    // Check if dateStr and timeStr exist
    if (!dateStr || !timeStr) {
      // Return a default old date for items without dates
      return new Date(0); // January 1, 1970
    }
    
    try {
      // Parse date parts properly
      const [month, day, year] = dateStr.split('/');
      
      // Parse time parts
      let hours = 0;
      let minutes = 0;
      let seconds = 0;
      
      // Handle different time formats
      if (timeStr.includes('AM') || timeStr.includes('PM')) {
        // 12-hour format (e.g., "10:45:25 PM")
        const timeParts = timeStr.match(/(\d+):(\d+):(\d+)\s?(AM|PM)/i);
        if (timeParts) {
          hours = parseInt(timeParts[1], 10);
          minutes = parseInt(timeParts[2], 10);
          seconds = parseInt(timeParts[3], 10);
          
          // Convert to 24-hour format if PM
          if (timeParts[4].toUpperCase() === 'PM' && hours < 12) {
            hours += 12;
          }
          // Convert 12 AM to 0 hours
          if (timeParts[4].toUpperCase() === 'AM' && hours === 12) {
            hours = 0;
          }
        }
      } else {
        // 24-hour format
        const timeParts = timeStr.match(/(\d+):(\d+):(\d+)/);
        if (timeParts) {
          hours = parseInt(timeParts[1], 10);
          minutes = parseInt(timeParts[2], 10);
          seconds = parseInt(timeParts[3], 10);
        }
      }
      
      // Create date using specific parameters instead of string parsing
      // Note: months in JavaScript are 0-indexed (0 = January, 11 = December)
      return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), hours, minutes, seconds);
      
    } catch (error) {
      console.log("Date parsing error:", error);
      return new Date(0);
    }
  };
    // Sort by newest first
  const sortedTransactions = [...allTransactions].sort((a, b) => {
    // Check if items have date and time properties
    if (!a.date || !a.time) return 1;  // Push items without date to the end
    if (!b.date || !b.time) return -1; // Push items without date to the end
    
    try {
      const dateA = getDateFromString(a.date, a.time);
      const dateB = getDateFromString(b.date, b.time);
      
      // Debug logging to ensure dates are parsed correctly
      console.log(`Comparing: 
        - ${a.type} ${a.amount} (${a.date} ${a.time}) => ${dateA.toISOString()}
        - ${b.type} ${b.amount} (${b.date} ${b.time}) => ${dateB.toISOString()}
      `);
      
      return dateB - dateA; // Sort descending (newest first)
    } catch (error) {
      console.log("Sorting error:", error);
      return 0;
    }
  });

  // Group transactions by date - with null check
  const groupedTransactions = sortedTransactions.reduce((groups, transaction) => {
    // Skip transactions without a date
    if (!transaction.date) return groups;
    
    if (!groups[transaction.date]) {
      groups[transaction.date] = [];
    }
    groups[transaction.date].push(transaction);
    return groups;
  }, {});
  // Convert grouped transactions to array for FlatList and sort transactions within each date
  const groupedData = Object.entries(groupedTransactions).map(([date, transactions]) => {
    // Sort transactions within each date group by time (earliest first)
    const sortedByTime = [...transactions].sort((a, b) => {
      if (!a.time || !b.time) return 0;
      const timeA = getDateFromString(a.date, a.time);
      const timeB = getDateFromString(b.date, b.time);
      return timeA - timeB; // Sort ascending (earliest first)
    });
    
    return {
      date,
      transactions: sortedByTime
    };
  });

  const renderTransactionItem = ({ item }) => (
    <View style={[
      styles.transactionItem, 
      item.type === 'income' ? styles.incomeItem : styles.expenseItem
    ]}>
      <View style={styles.transactionHeader}>
        <Text style={[
          styles.amountText,
          item.type === 'income' ? styles.incomeAmountText : styles.expenseAmountText
        ]}>
          {item.type === 'income' ? '+' : '-'} {currency.code} {
            item.amount ? parseFloat(item.amount).toFixed(2) : "0.00"
          }
        </Text>
        <Text style={styles.timeText}>{item.time || "No time"}</Text>
      </View>
      {item.message ? (
        <Text style={styles.descriptionText}>{item.message}</Text>
      ) : null}
    </View>
  );

  const renderDateGroup = ({ item }) => (
    <View style={styles.dateGroup}>
      <View style={styles.dateHeader}>
        <Text style={styles.dateText}>{item.date}</Text>
        <View style={styles.dateLine} />
      </View>
      <FlatList
        data={item.transactions}
        keyExtractor={(item, index) => `transaction-${index}`}
        renderItem={renderTransactionItem}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#607D8B" barStyle="light-content" />
      <Title name="Transaction History" style={styles.title} />
      
      {sortedTransactions.length > 0 ? (
        <FlatList
          data={groupedData}
          keyExtractor={(item) => `date-${item.date}`}
          renderItem={renderDateGroup}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No transactions yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Your transaction history will appear here
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    backgroundColor: '#607D8B',
    borderRadius: 15,
    marginTop: 20,
    marginHorizontal: 30,
    paddingVertical: 18,
    elevation: 4,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  dateGroup: {
    marginBottom: 20,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#607D8B',
    marginRight: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#ECEFF1',
    borderRadius: 4,
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#CFD8DC',
  },
  transactionItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    marginHorizontal: 4,
  },
  incomeItem: {
    backgroundColor: '#E8F5E9',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  expenseItem: {
    backgroundColor: '#FFEBEE',
    borderLeftWidth: 4,
    borderLeftColor: '#E74C3C',
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  incomeAmountText: {
    color: '#4CAF50',
  },
  expenseAmountText: {
    color: '#E74C3C',
  },
  timeText: {
    fontSize: 12,
    color: '#757575',
  },
  descriptionText: {
    fontSize: 14,
    color: '#424242',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#757575',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
  },
});

export default History;