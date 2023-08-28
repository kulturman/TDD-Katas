import {TransactionsRepository} from "./transactionsRepository";
import {DateProvider} from "./dateProvider";

export class BankAccount {

    constructor(
        private transactionsRepository: TransactionsRepository,
        private dateProvider: DateProvider
    ) {
    }
    async deposit(amount: number) {
        this.transactionsRepository.save(this.dateProvider.now(), amount);
    }

    async withdraw(amount: number) {
        this.transactionsRepository.save(this.dateProvider.now(), - amount);
    }

    async printStatement() {

    }
}
