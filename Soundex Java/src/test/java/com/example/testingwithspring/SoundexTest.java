package com.example.testingwithspring;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.springframework.test.util.AssertionErrors.*;


public class SoundexTest {
    Soundex soundex;
    @BeforeEach
    public void beforeEach() {
        soundex = new Soundex();
    }
    @Test
    public void returnSoleLetterOfOneLetterWord() {
        assertEquals("", "A000", soundex.encode("A"));
    }

    @Test
    public void padsWithZerosToEnsureThreeDigits() {
        assertEquals("", "I000", soundex.encode("I"));
    }

    @Test
    public void replaceConsonantsWithAppropriateDigits() {
        assertEquals("", "A400", soundex.encode("Al"));
    }

    @Test
    public void ignoreNonAlphabetics() {
        assertEquals("", "A000", soundex.encode("A#"));
    }

    @Test
    public void replaceMultipleConsonants() {
        assertEquals("", "A234", soundex.encode("Acdl"));
    }

    @Test
    public void resultShouldBeFourCharactersLength() {
        assertEquals("", 4, soundex.encode("Dcdlb").length());
    }

    @Test
    public void ignoresVowelLikeLetters() {
        assertEquals("B234", 4, soundex.encode("Baeiouhycdl").length());
    }

    @Test
    public void combinesDuplicateEncodings() {
        assertEquals("", "A123", soundex.encode("Abfcgdt"));
    }

    @Test
    public void startsWithFirstLetterInCapitalCase() {
        assertTrue("", soundex.encode("abcd").startsWith("A"));
    }

    @Test
    public void ignoreCaseWhenEncodingConsonants() {
        assertEquals("", soundex.encode("BCDL"), soundex.encode("Bcdl"));
    }

    @Test
    public void combinesDuplicateCodesWhen2ndLetterDuplicates1st() {
        assertEquals("", "B230", soundex.encode("Bbcd"));
    }
    @Test
    public void doesNotCombineDuplicateEncodingsSeparatedByVowels() {
        assertEquals("", "J110", soundex.encode("Jbob"));
    }
}
