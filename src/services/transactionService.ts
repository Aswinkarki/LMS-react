import api from '../services/api';
import { TransactionData, TransactionResponse } from "../types/index";

const API_BASE_URL = "transactions/";

export const fetchTransactions = async (): Promise<TransactionResponse[]> => {
  try {
    const response = await api.get<TransactionResponse[]>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const createTransaction = async (transactionData: TransactionData): Promise<TransactionResponse> => {
  try {
    const response = await api.post<TransactionResponse>(API_BASE_URL, transactionData);
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};