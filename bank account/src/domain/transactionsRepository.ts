import {Transaction} from "./transaction";

export interface TransactionsRepository {
    save(date: Date, amount: number): void;
    getTransactions(): Transaction[];
}
