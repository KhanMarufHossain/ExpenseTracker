import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'EXPENSE_TRACKER_DATA';

export const persistenceMiddleware = store => next => action => {
  const result = next(action);
  
  const state = store.getState();
    if (state && state.Currency) {
    try {
      const dataToSave = {
        code: state.Currency.code || 'USD',
        income: {
          number: parseFloat(state.Currency.income.number || 0)
        },
        expense: {
          number: parseFloat(state.Currency.expense.number || 0)
        },
        transactiontrack: state.Currency.transactiontrack || []
      };
      
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
        .catch(err => console.error('Error saving state:', err));
    } catch (error) {
      console.error('Error formatting state for persistence:', error);
    }
  }
  
  return result;
};

export const loadPersistedState = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue !== null) {
      const parsedData = JSON.parse(jsonValue);
      
      return {
        code: parsedData.code || 'USD',
        income: {
          number: parseFloat(parsedData.income?.number || 0)
        },
        expense: {
          number: parseFloat(parsedData.expense?.number || 0)
        },
        transactiontrack: Array.isArray(parsedData.transactiontrack) 
          ? parsedData.transactiontrack 
          : []
      };
    }
  } catch (error) {
    console.error('Error loading persisted state:', error);
  }
  return null;
};