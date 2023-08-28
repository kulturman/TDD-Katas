import {TransactionsRepository} from "./transactionsRepository";
import {DateProvider} from "./dateProvider";
import {StatementGenerator} from "./statementGenerator";

export class BankAccount {

    constructor(
        private transactionsRepository: TransactionsRepository,
        private dateProvider: DateProvider,
        private statementGenerator: StatementGenerator
    ) {
    }
    async deposit(amount: number) {
        this.transactionsRepository.save(this.dateProvider.now(), amount);
    }

    async withdraw(amount: number) {
        this.transactionsRepository.save(this.dateProvider.now(), - amount);
    }

    async printStatement() {
        const statementRepresentation = this.statementGenerator.generate(this.transactionsRepository.getTransactions());
        this.statementGenerator.print(statementRepresentation);
    }
}
