import AsyncStorage from '@react-native-async-storage/async-storage';

// Change to use user-specific storage key
export const persistenceMiddleware = store => next => action => {
  const result = next(action);
  
  const state = store.getState();
  // Only save if both Currency data and a user exist
  if (state && state.Currency && state.auth && state.auth.user) {
    try {
      const userId = state.auth.user.$id;
      const STORAGE_KEY = `EXPENSE_TRACKER_${userId}`;
      
      const dataToSave = {
        code: state.Currency.code || 'USD',
        income: {
          number: parseFloat(state.Currency.income.number || 0)
        },
        expense: {
          number: parseFloat(state.Currency.expense.number || 0)
        },
        // We don't need to save transactions locally if we use Appwrite
        // transactiontrack: state.Currency.transactiontrack || []
      };
      
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
        .catch(err => console.error('Error saving state:', err));
    } catch (error) {
      console.error('Error formatting state for persistence:', error);
    }
  }
  
  return result;
};

export const loadPersistedState = async (userId) => {
  if (!userId) return null;
  
  try {
    const STORAGE_KEY = `EXPENSE_TRACKER_${userId}`;
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
        }
        // Don't load transactions from local storage
      };
    }
  } catch (error) {
    console.error('Error loading persisted state:', error);
  }
  return null;
};