import {BankAccount} from "./bankAccount";
import {InMemoryTransactionsRepository} from "./inMemoryTransactionsRepository";
import {ConsoleStatementGenerator} from "./consoleStatementGenerator";
import {SystemDateProvider} from "./systemDateProvider";

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
