import { SpaceLaunch } from "../src/SpaceLaunch";
import { Token } from "../src/Token";

describe('User registration', () => {
    let spaceLaunch: SpaceLaunch;

    beforeEach(() => {
        spaceLaunch = new SpaceLaunch();
    })

    it('Should register user successfully', () => {
        const result = spaceLaunch.register({
            username: 'test'
        });
        expect(spaceLaunch.isRegistrationSuccessful(result)).toBeTruthy();
    })

    it('Should allow registered users to login', () => {
        expect(spaceLaunch.isLoginSuccessful(spaceLaunch.login('Arnaud'))).toBeFalsy();
        spaceLaunch.register({ username: 'Arnaud'});
        const result = spaceLaunch.login('Arnaud');
        expect(spaceLaunch.isLoginSuccessful(result)).toBeTruthy();
        expect(spaceLaunch.getTokenFromLoginResult(result)).toBeTruthy();
        expect(spaceLaunch.getTokenFromLoginResult(result).equals(Token.fromString("123"))).toBeTruthy();
    })

    it('Admin users can assign users the role of Inspector', () => {
        spaceLaunch.register({ username: 'Arnaud'});
        let token = spaceLaunch.getTokenFromLoginResult(spaceLaunch.login('Arnaud'));
        expect(token.getRole()).toBe('user');
        spaceLaunch.register({ username: 'Bob'});
        spaceLaunch.makeInspector('Bob');
        token = spaceLaunch.getTokenFromLoginResult(spaceLaunch.login('Bob'));
        expect(token.getRole()).toBe('inspector');
        spaceLaunch.makeInspector('Arnaud');
        token = spaceLaunch.getTokenFromLoginResult(spaceLaunch.login('Arnaud'));
        expect(token.getRole()).toBe('inspector');
    })
})