import { databases } from "./appwrite";


const DATABASE_ID = "684b0cf90019a37d16ee";
const COLLECTION_ID = "684b0ee400015725bbac";

//Adding transaction here....
export const addTransaction = (transaction) => async (dispatch, getState) => {
  try {
    await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      "unique()",
      transaction
    );
    // Optionally: dispatch an action to update Redux state
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
};


export const fetchTransactions = () => async (dispatch) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      []
    );
   
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};