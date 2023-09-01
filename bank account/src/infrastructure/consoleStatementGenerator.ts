import {StatementGenerator} from "../domain/statementGenerator";
import {Transaction} from "../domain/transaction";


export class ConsoleStatementGenerator implements StatementGenerator {
    generate(transactions: Transaction[]): string {
        let statement = "Date    ||  Amount  || Balance\n";
        let balance = 0;

        transactions.forEach(transaction => {
            const formattedDate = this.formatDate(transaction);

            balance += transaction.amount;

            statement += `${formattedDate}  ||  ${transaction.amount}  ||  ${balance}\n`;
        });

        return statement;
    }

    private formatDate(transaction: Transaction) {
        return transaction.date.toISOString().split('T')[0];
    }

    print(statement: string): void {
        console.log(statement);
    }
}
