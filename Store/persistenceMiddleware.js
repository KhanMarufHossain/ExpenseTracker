import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'EXPENSE_TRACKER_DATA';

// Middleware to save state to AsyncStorage
export const persistenceMiddleware = store => next => action => {
  const result = next(action);
  
  // After any action is dispatched and state is updated, save to AsyncStorage
  const state = store.getState();
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.Currency))
    .catch(err => console.error('Error saving state:', err));
    
  return result;
};

// Function to load persisted state on app startup
export const loadPersistedState = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }
  } catch (error) {
    console.error('Error loading persisted state:', error);
  }
  return null;
};