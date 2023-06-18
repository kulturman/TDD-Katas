import {Soundex} from "./soundex";

describe('Soundex algorithm', () => {
    let soundex: Soundex;

    beforeEach(() => {
        soundex = new Soundex();
    });

    test('One letter word', () => {
        expect(soundex.encode("A")).toBe("A000");
        expect(soundex.encode("B")).toBe("B000");
    });

    test('Should uppercase one letter word', () => {
        expect(soundex.encode("a")).toBe("A000");
    });

    test('Pad with zeros', () => {
        expect(soundex.encode("a")).toBe("A000");
    });

    test('Encodes consonants value', () => {
        expect(soundex.encode("AT")).toBe("A300");
        expect(soundex.encode("AC")).toBe("A200");
    });

    test('Should encode multiples consonants', () => {
        expect(soundex.encode("ATML")).toBe("A354");
    });

    test('Result should be of length 4', () => {
        expect(soundex.encode("ATMLC").length).toBe(4);
        expect(soundex.encode("ATMLCF").length).toBe(4);
    });

    test('Ignore vowel like letters', () => {
        expect(soundex.encode("AET")).toBe("A300");
        expect(soundex.encode("AETE")).toBe("A300");
        expect(soundex.encode("AHRNAUD")).toBe("A653");
    });

    test('Should encode adjacent letters that encode to the same letter once', () => {
        expect(soundex.encode("ATTML")).toBe(soundex.encode("ATML"));
        expect(soundex.encode("ATTTTDDML")).toBe(soundex.encode("ATML"));
    });

})