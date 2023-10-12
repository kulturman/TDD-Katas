class Fizzbuzz {
    transform(number: number): string {
        if (number % 3 === 0 && number % 5 === 0)
            return "FizzBuzz";
        if (number % 3 === 0)
            return "Fizz";
        if (number % 5 === 0)
            return "Buzz";
        return number.toString();
    }
}

describe('Fizzbuzz tests', function () {
    let fizzbuzz: Fizzbuzz;

    beforeEach(() => {
        fizzbuzz = new Fizzbuzz();
    });

    /*it('returns Fizz if number is mutiple of 3', () => {
        const result = fizzbuzz.transform(3);
        expect(result).toEqual("Fizz");
    })

    it('returns Buzz if number is mutiple of 5', () => {
        const result = fizzbuzz.transform(5);
        expect(result).toEqual("Buzz");
    })

    it('returns FizzBuzz if number is both mutiple of 3 and 5', () => {
        const result = fizzbuzz.transform(15);
        expect(result).toEqual("FizzBuzz");
    })

    it('returns number itself if its not multiple or 3 or 3', () => {
        expect(fizzbuzz.transform(8)).toEqual('8');
    })*/

    it.each([
        ['1', 1],
        ['2', 2],
        ['Buzz', 5],
        ['Fizz', 3],
        ['FizzBuzz', 15],
        ['Buzz', 50],
    ])('returns %s when given %s', (expected, number) => {
        expect(fizzbuzz.transform(number)).toEqual(expected);
    });
});
