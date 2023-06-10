export class Token {
    private constructor(private key: string, private role: UserRole = 'user') {}

    static fromString(key: string): Token {
        this.validate(key);
        return new Token(key);
    }

    static inspectorFromString(key: string): Token {
        this.validate(key);
        return new Token(key, 'inspector');
    }

    isValid() {
        return Token.validate(this.key);
    }

    static validate(key: string) {
        if (key.startsWith("123")) {
            return true;
        }
        throw new Error(`${key} is not a valid token`);
    }

    equals(token: Token) {
        return token.key === this.key;
    }

    getRole(): UserRole {
        return this.role;
    }
}

type UserRole =  'user' | 'inspector'