import {ConsoleStatementGenerator} from "./consoleStatementGenerator";

describe('Console statement generator', () => {
    let consoleStatementGenerator: ConsoleStatementGenerator;
    const headerLine = `Date    ||  Amount  || Balance`;

    beforeEach(() => {
        consoleStatementGenerator = new ConsoleStatementGenerator();
    });

    it('generates headers for empty transactions list', () => {
        const statement = consoleStatementGenerator.generate([]);
        expect(statement).toEqual(`${headerLine}\n`);
    });

    it('generates headers and transactions lines', () => {
       const statement = generateStatmentForTransactions();

       const firstTransactionLine = `2023-01-01  ||  2000  ||  2000`;
       const secondTransactionLine = `2023-10-02  ||  -500  ||  1500`;
       expect(statement).toEqual(`${headerLine}\n${firstTransactionLine}\n${secondTransactionLine}\n`);
    });

    function generateStatmentForTransactions() {
        return consoleStatementGenerator.generate([
            {
                date: new Date('2023-01-01T22:00:00'),
                amount: 2000,
            },
            {
                date: new Date('2023-10-02T22:00:00'),
                amount: -500,
            }
        ]);
    }

});
