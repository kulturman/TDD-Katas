import {InMemoryTransactionsRepository} from "./infrastructure/inMemoryTransactionsRepository";
import {SystemDateProvider} from "./infrastructure/systemDateProvider";
import {ConsoleStatementGenerator} from "./infrastructure/consoleStatementGenerator";
import {BankAccount} from "./domain/bankAccount";


const bankAccount = new BankAccount(
    new InMemoryTransactionsRepository(),
    new SystemDateProvider(),
    new ConsoleStatementGenerator()
);

bankAccount.deposit(3500).then();
bankAccount.withdraw(3000).then();
bankAccount.withdraw(500).then();
bankAccount.deposit(2000).then();

bankAccount.printStatement();
