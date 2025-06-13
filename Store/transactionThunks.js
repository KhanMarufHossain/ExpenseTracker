import { databases, account } from "./appwrite";
import { updateTransactionTrack, clearTransactions } from "./CurrencySlice";

const DATABASE_ID = "684b0cf90019a37d16ee";
const COLLECTION_ID = "684bc7640025ef61ee6c";

export const addTransaction = (transaction) => async (dispatch) => {
  try {
    const user= await account.get();
    const userId= user.$id;
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      "unique()",
      {...transaction, userId}
    );
    
    dispatch(updateTransactionTrack(response));
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
    dispatch(clearTransactions());
    response.documents.forEach(tx => dispatch(updateTransactionTrack(tx)));
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};