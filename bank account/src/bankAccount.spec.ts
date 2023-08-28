import {BankAccount} from "./bankAccount";
import {InMemoryTransactionsRepository} from "./inMemoryTransactionsRepository";
import {DeterministicDateProvider} from "./deterministicDateProvider";

describe('Bank account test', () => {
    let transactionsRepository: InMemoryTransactionsRepository;
    let dateProvider: DeterministicDateProvider;
    const transaction = { amount: 2500, date: new Date() };
    let bankAccount: BankAccount;

    beforeEach(() => {
        transactionsRepository = new InMemoryTransactionsRepository();
        dateProvider = new DeterministicDateProvider();
        dateProvider.currentDate = transaction.date;
        bankAccount = new BankAccount(transactionsRepository, dateProvider);
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
});
