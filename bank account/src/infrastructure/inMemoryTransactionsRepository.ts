import {TransactionsRepository} from "../domain/transactionsRepository";
import {Transaction} from "../domain/transaction";


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
