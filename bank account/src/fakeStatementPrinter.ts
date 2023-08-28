import {StatementGenerator} from "./statementGenerator";
import {Transaction} from "./transaction";

export class FakeStatementPrinter implements StatementGenerator {
    printHasBeenCalled: boolean = false;
    generateHasBeenCalled: boolean = false;
    generateParameter!: Transaction[];
    printParamater!: string;
    generateResult!: string;

    generate(transactions: Transaction[]): string {
        this.generateHasBeenCalled = true;
        this.generateParameter = transactions;
        return this.generateResult;
    }

    print(statement: string): void {
        this.printHasBeenCalled = true;
        this.printParamater = statement;
    }

}
