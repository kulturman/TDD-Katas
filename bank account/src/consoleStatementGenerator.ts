import {StatementGenerator} from "./statementGenerator";
import {Transaction} from "./transaction";

export class ConsoleStatementGenerator implements StatementGenerator {
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
