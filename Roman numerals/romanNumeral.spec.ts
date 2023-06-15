import {RomanNumeral} from "./romaNumeral";

describe("Roman numeral conversion", () => {
    let romanNumeral: RomanNumeral;

    beforeEach(() => {
        romanNumeral = new RomanNumeral();
    })

    it('should return right result', () => {
        expect(romanNumeral.convert(1)).toBe("I");
        expect(romanNumeral.convert(2)).toBe("II");
        expect(romanNumeral.convert(3)).toBe("III");
        expect(romanNumeral.convert(4)).toBe("IV");
        expect(romanNumeral.convert(5)).toBe("V");
        expect(romanNumeral.convert(10)).toBe("X");
        expect(romanNumeral.convert(11)).toBe("XI");
        expect(romanNumeral.convert(12)).toBe("XII");
        expect(romanNumeral.convert(13)).toBe("XIII");
        expect(romanNumeral.convert(20)).toBe("XX");
        expect(romanNumeral.convert(21)).toBe("XXI");
        expect(romanNumeral.convert(22)).toBe("XXII");
        expect(romanNumeral.convert(23)).toBe("XXIII");
        expect(romanNumeral.convert(50)).toBe("L");
        expect(romanNumeral.convert(51)).toBe("LI");
        expect(romanNumeral.convert(52)).toBe("LII");
        expect(romanNumeral.convert(53)).toBe("LIII");
        expect(romanNumeral.convert(100)).toBe("C");
        expect(romanNumeral.convert(101)).toBe("CI");
        expect(romanNumeral.convert(288)).toBe("CCLXXXVIII");
        expect(romanNumeral.convert(4)).toBe("IV");
        expect(romanNumeral.convert(14)).toBe("XIV");
        expect(romanNumeral.convert(9)).toBe("IX");
        expect(romanNumeral.convert(19)).toBe("XIX");
        expect(romanNumeral.convert(90)).toBe("XC");
        expect(romanNumeral.convert(99)).toBe("XCIX");
        expect(romanNumeral.convert(40)).toBe("XL");
        expect(romanNumeral.convert(44)).toBe("XLIV");
        expect(romanNumeral.convert(400)).toBe("CD");
        expect(romanNumeral.convert(444)).toBe("CDXLIV");
        expect(romanNumeral.convert(900)).toBe("CM");
        expect(romanNumeral.convert(998)).toBe("CMXCVIII");
        expect(romanNumeral.convert(999)).toBe("CMXCIX");
    })
})