import {TransactionsRepository} from "./transactionsRepository";
import {Transaction} from "./transaction";

export class InMemoryTransactionsRepository implements TransactionsRepository {
    transactions: Transaction[];

    constructor() {
        this.transactions = [];
    }
    async save(date: Date, amount: number) {
        this.transactions.push({
            date,
            amount
        });
    }

    getTransactions(): Transaction[] {
        return this.transactions;
    }

}
