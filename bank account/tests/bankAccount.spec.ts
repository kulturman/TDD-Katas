import {InMemoryTransactionsRepository} from "../src/infrastructure/inMemoryTransactionsRepository";
import {DeterministicDateProvider} from "../src/infrastructure/deterministicDateProvider";
import {BankAccount} from "../src/domain/bankAccount";
import {FakeStatementPrinter} from "../src/infrastructure/fakeStatementPrinter";


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
        bankAccount = new BankAccount(transactionsRepository, dateProvider, statementGenerator);
    });

    it('adds deposit', () => {
        bankAccount.deposit(transaction.amount);

        const retrievedTransaction = transactionsRepository.getTransactions()[0];
        expect(retrievedTransaction).toMatchObject(transaction);
    });

    it('saves withdrawal', () => {
        bankAccount.withdraw(transaction.amount);

        const retrievedTransaction = transactionsRepository.getTransactions()[0];
        expect(retrievedTransaction).toMatchObject({
            ...transaction,
            amount: -transaction.amount
        });
    });

    it('interacts with printer generator', () => {
        const generatedStatement = 'Statement result';
        statementGenerator.generateResult = generatedStatement;
        bankAccount = new BankAccount(transactionsRepository, dateProvider, statementGenerator);

        bankAccount.printStatement();

        expectGenerateStatementHasBeenCalledWithTransactions();
        expectPrintStatementHasBeenCalledWith(generatedStatement);
    });

    function expectGenerateStatementHasBeenCalledWithTransactions() {
        expect(statementGenerator.generateHasBeenCalled).toBeTruthy();
        expect(statementGenerator.generateParameter).toEqual(transactionsRepository.getTransactions());
    }

    function expectPrintStatementHasBeenCalledWith(statement: string) {
        expect(statementGenerator.printHasBeenCalled).toBeTruthy();
        expect(statementGenerator.printParamater).toEqual(statement);
    }
});
