import {BankAccount} from "./bankAccount";
import {InMemoryTransactionsRepository} from "./inMemoryTransactionsRepository";
import {DeterministicDateProvider} from "./deterministicDateProvider";
import {FakeStatementPrinter} from "./fakeStatementPrinter";

describe('Bank account test', () => {
    let transactionsRepository: InMemoryTransactionsRepository;
    let dateProvider: DeterministicDateProvider;
    const transaction = { amount: 2500, date: new Date() };
    let bankAccount: BankAccount;
    let statementGenerator: FakeStatementPrinter;

    beforeEach(() => {
        transactionsRepository = new InMemoryTransactionsRepository();
        dateProvider = new DeterministicDateProvider();
        statementGenerator = new FakeStatementPrinter();
        dateProvider.currentDate = transaction.date;
        bankAccount = new BankAccount(transactionsRepository);
    });

    it('adds deposit', () => {
        bankAccount.deposit(transaction.amount);

        expectsTransactionToHaveBeenSaved(transaction.amount);
    });

    it('saves withdrawal', () => {
        bankAccount.withdraw(transaction.amount);

        expectsTransactionToHaveBeenSaved(-transaction.amount);
    });

    it('interacts with printer generator', () => {
        const headerLine = `Date    ||  Amount  || Balance\n`;
        bankAccount = new BankAccount(transactionsRepository);

        const logSpy = jest.spyOn(console, 'log');

        bankAccount.printStatement();

        expect(logSpy).toHaveBeenCalledWith(headerLine);
    });

    it('Allows composition on the printStatement', () => {
        const headerLine = `Date    ||  Amount  || Balance\n`;
        bankAccount = new BankAccount(transactionsRepository);
        const returningBankAccountPrinter = new ReturningBankAccountPrinter(bankAccount);

        expect (returningBankAccountPrinter.printStatementAsString()).toEqual(headerLine);
    });

    function expectsTransactionToHaveBeenSaved(amount: number) {
        const returningBankAccountPrinter = new ReturningBankAccountPrinter(bankAccount);
        const formattedDate = transaction.date.getFullYear() + '-' + '0' + (transaction.date.getMonth() + 1) + '-' + '0' + (transaction.date.getDay() + 1);
        expect(returningBankAccountPrinter.getStatement(1)).toEqual(`${formattedDate}  ||  ${amount}  ||  ${amount}`);
    }
});

class ReturningBankAccountPrinter {
    constructor(private bankAccount: BankAccount) {

    }
    
    getStatement(index: number) {
        return this.printStatementAsString().split('\n')[index];
    }

    printStatementAsString(): string {
        let buffer = '';
        const old = console.log;
        const writer = (s: string) => buffer += s;
        console.log = writer;
        this.bankAccount.printStatement();

        console.log = old;
        return buffer;
    }
}
