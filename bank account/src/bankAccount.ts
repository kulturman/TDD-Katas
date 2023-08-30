import {TransactionsRepository} from "./transactionsRepository";
import {DateProvider} from "./dateProvider";
import {ConsoleStatementGenerator} from "./consoleStatementGenerator";

export class BankAccount {

    constructor(
        private transactionsRepository: TransactionsRepository,
        /*private dateProvider: DateProvider*/
    ) {
    }

    async deposit(amount: number) {
        this.transactionsRepository.save(new Date(), amount);
    }

    async withdraw(amount: number) {
        this.transactionsRepository.save(new Date(), - amount);
    }

    async printStatement() {
        const statementGenerator = new ConsoleStatementGenerator();
        const statementRepresentation = statementGenerator.generate(this.transactionsRepository.getTransactions());
        statementGenerator.print(statementRepresentation);
    }
}
