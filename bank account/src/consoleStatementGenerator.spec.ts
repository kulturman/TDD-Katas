import {StatementGenerator} from "./statementGenerator";
import {Transaction} from "./transaction";

class ConsoleStatementGenerator implements StatementGenerator {
    generate(transactions: Transaction[]): string {
        let statement = "Date    ||  Amount  || Balance\n";
        let balance = 0;

        transactions.forEach(transaction => {
            const year = transaction.date.getFullYear();
            const month = transaction.date.getMonth() + 1;
            const day = transaction.date.getDay() + 1;

            balance += transaction.amount;

            statement += `${year}-${this.getZeroStringPadded(month)}-${this.getZeroStringPadded(day)}  ||  ${transaction.amount}  ||  ${balance}\n`;
        });

        return statement;
    }

    private getZeroStringPadded(numberToPad: number): string {
        return numberToPad >= 10 ? numberToPad.toString(): '0' + numberToPad;
    }

    print(statement: string): void {
        console.log(statement);
    }
}

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
       const secondTransactionLine = `2023-01-02  ||  -500  ||  1500`;
       expect(statement).toEqual(`${headerLine}\n${firstTransactionLine}\n${secondTransactionLine}\n`);
    });

    function generateStatmentForTransactions() {
        return consoleStatementGenerator.generate([
            {
                date: new Date('2023-01-01T22:00:00'),
                amount: 2000,
            },
            {
                date: new Date('2023-01-02T22:00:00'),
                amount: -500,
            }
        ]);
    }

});
