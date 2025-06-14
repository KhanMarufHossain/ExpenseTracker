import { databases, account } from "./appwrite";
import { Query, Permission, Role } from "appwrite";
import { updateTransactionTrack, clearTransactions, setIncome, setExpense } from "./CurrencySlice";

const DATABASE_ID = "684b0cf90019a37d16ee";
const COLLECTION_ID = "684bc7640025ef61ee6c";

export const addTransaction = (transaction) => async (dispatch) => {
  try {
    const user = await account.get();
    const userId = user.$id;
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      "unique()",
      { ...transaction, userId },
      [
        Permission.read(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
        Permission.write(Role.user(userId)), // Optional, covers update/delete
      ]
    );
    dispatch(updateTransactionTrack(response));
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
};

export const fetchTransactions = () => async (dispatch) => {
  try {
    const user = await account.get();
    const userId = user.$id;

    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("userId", userId)]
    );
    dispatch(clearTransactions());
    response.documents.forEach((tx) => dispatch(updateTransactionTrack(tx)));
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};

// Add this new function
export const loadUserTransactions = () => async (dispatch) => {
  try {
    const user = await account.get();
    const userId = user.$id;

    // Get user transactions
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("userId", userId)]
    );
    
    // Clear previous transactions
    dispatch(clearTransactions());
    
    // Calculate total income and expense from transactions
    let totalIncome = 0;
    let totalExpense = 0;
    
    // Add each transaction and calculate totals
    response.documents.forEach((tx) => {
      dispatch(updateTransactionTrack(tx));
      
      if (tx.isIncome) {
        totalIncome += parseFloat(tx.amount || 0);
      } else {
        totalExpense += parseFloat(tx.amount || 0);
      }
    });
    
    // Update income and expense totals
    dispatch(setIncome({ number: totalIncome }));
    dispatch(setExpense({ number: totalExpense }));
    
  } catch (error) {
    console.error("Error loading user transactions:", error);
  }
};