import { account } from "./appwrite";
import { setUser, setLoading, setError, logout } from "./authSlice";
import { fetchTransactions } from "./transactionThunks";
import { clearTransactions } from "./CurrencySlice";

export const registerUser = ({ email, password, name }) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await account.create('unique()', email, password, name);
    await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    dispatch(setUser(user));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const loginUser = ({ email, password }) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    dispatch(setUser(user));
    
    // fetch data from appwrite after user Login- last commit
    dispatch(fetchTransactions());
    
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await account.deleteSession('current');
    dispatch(logout());
    
    // clear transaction data to keep it clean
    dispatch(clearTransactions());
    
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const checkUserSession = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const user = await account.get();
    dispatch(setUser(user));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(logout());
    dispatch(setLoading(false));
  }
};