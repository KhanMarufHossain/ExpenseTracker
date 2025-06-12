import { account } from "./appwrite";
import { setUser, setLoading, setError, logout } from "./authSlice";

// Register user
export const registerUser = ({ email, password, name }) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await account.create('unique()', email, password, name);
    await account.createEmailSession(email, password);
    const user = await account.get();
    dispatch(setUser(user));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

// Login user
export const loginUser = ({ email, password }) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await account.createEmailSession(email, password);
    const user = await account.get();
    dispatch(setUser(user));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

// Logout user
export const logoutUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await account.deleteSession('current');
    dispatch(logout());
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

// Check if user is logged in (on app start)
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