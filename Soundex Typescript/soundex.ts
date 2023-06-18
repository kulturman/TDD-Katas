export class Soundex {
    private MAX_ENCODED_STRING_LENGTH = 4;
    encode(word: string) {
        const encodedWord = this.head(word).toUpperCase() + this.encodeWord(this.tail(word));
        return this.zeroPads(encodedWord);
    }

    private zeroPads(encodedWord: string) {
        return encodedWord + "0".repeat(4 - encodedWord.length);
    }

    private tail(word: string): string {
        return word.substring(1);
    }

    head(word: string): string {
        return word.substring(0, 1);
    }

    private encodeWord(word: string) {
        let encodedWord = "";
        let lastEncodedLetter = "";

        for (const letter of word) {
            if (this.isComplete(encodedWord))
                break;
            let encodedLetter = this.encodeLetter(letter);

            if (lastEncodedLetter !== encodedLetter) {
                encodedWord += encodedLetter;
            }
            lastEncodedLetter = encodedLetter;
        }

        return encodedWord;
    }

    private isComplete(encodedWord: string) {
        return encodedWord.length === this.MAX_ENCODED_STRING_LENGTH - 1;
    }

    private encodeLetter(letter: string): string {
        const encodings: Map<string, string> = new Map<string, string>([
            ['b', '1'], ['f', '1'], ['p', '1'], ['v', '1'],
            ['c', '2'], ['g', '2'], ['j', '2'], ['k', '2'], ['q', '2'],
            ['s', '2'], ['x', '2'], ['z', '2'],
            ['d', '3'], ['t', '3'],
            ['l', '4'],
            ['m', '5'], ['n', '5'],
            ['r', '6']
        ]);

        const returnValue = encodings.get(letter.toLowerCase());

        return returnValue !== undefined ? returnValue: "";
    }
}