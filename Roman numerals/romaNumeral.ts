export class RomanNumeral {
    private readonly romanNumbersMap: Array<{key: number, value: string}>;
    constructor() {
        this.romanNumbersMap = [
            { "key": 1000, "value": "M" },
            { "key": 900, "value": "CM" },
            { "key": 500, "value": "D" },
            { "key": 400, "value": "CD" },
            { "key": 100, "value": "C" },
            { "key": 90, "value": "XC" },
            { "key": 50, "value": "L" },
            { "key": 40, "value": "XL" },
            { "key": 10, "value": "X" },
            { "key": 9, "value": "IX" },
            { "key": 5, "value": "V" },
            { "key": 4, "value": "IV" },
            { "key": 1, "value": "I" },
        ];
    }
    convert(numberToConvert: number): string {
        let romanNumber = '';

        for (let letterMap of this.romanNumbersMap) {
            while (numberToConvert >= letterMap.key) {
                romanNumber += letterMap.value;
                numberToConvert -= letterMap.key;
            }
        }
        return romanNumber;
    }
}