import {Transaction} from "./transaction";

export interface StatementGenerator {
    generate(transactions: Transaction[]): string;
    print(statement: string): void;
}
