import { UserStore } from "../SpaceLaunch";
import * as fs from 'fs';

export class InMemoryUserStore implements UserStore {
    private registeredUsers: Set<string> = new Set();

    add(username: string): void {
       this.registeredUsers.add(username);
    }
    has(username: string): boolean {
        return this.registeredUsers.has(username);
    }

}

export class PersistentUserStore implements UserStore {
    private filePath = 'users.txt';

    add(username: string): void {
        fs.appendFileSync(this.filePath, '\n' + username);
    }

    has(username: string): boolean {
        const result = fs.readFileSync(this.filePath);
        return result.toString().split('\n').includes(username);
    }
    
}