import { Token } from "./Token";

export class SpaceLaunch {
    private registeredUsers: Set<string> = new Set();
    private inspectors: Set<string> = new Set();

    register(user: {username: string}): RegistrationSuccessful {
        this.registeredUsers.add(user.username);
        return true;
    }

    isRegistrationSuccessful(result: RegistrationSuccessful) {
        return result === true;
    }

    isLoginSuccessful(result: LoginResult) {
        return result.successful;
    }

    getTokenFromLoginResult(loginResult: LoginResult) {
        if (!loginResult.successful) {
            throw new Error();
        }
        return loginResult.token;
    }

    login(username: string): LoginResult {
        const tokenKey = "123";
        if (this.registeredUsers.has(username)) {
            return  {
                successful: true, token: this.inspectors.has(username) ? Token.inspectorFromString(tokenKey) : Token.fromString(tokenKey)
            }
        }
        return { successful: false }
    }

    makeInspector(username: string) {
        this.inspectors.add(username);
    }
}

type RegistrationSuccessful = true;

type LoginResult = SuccessfulLogin | FailedLogin;

interface SuccessfulLogin {
    successful: true;
    token: Token;
}

interface FailedLogin {
    successful: false;
}