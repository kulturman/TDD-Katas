package com.example.testingwithspring;

import static com.example.testingwithspring.Letter.*;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import org.junit.jupiter.api.Test;

public class WordTest {
    @Test
    void incorrectLetter() {
        var word = new Word("A");
        var score = word.guess("Z");
        assertScoreForGuess(score, INCORRECT);
    }

    @Test
    void oneCorrectLetter() {
        var word = new Word("A");
        var score = word.guess("A");
        assertScoreForGuess(score,CORRECT);
    }

    @Test
    void multipleLetters() {
        var word = new Word("ARMD");
        var score = word.guess("ZAMB");
        assertScoreForGuess(score, INCORRECT, PART_CORRECT, CORRECT, INCORRECT);
    }

    private void assertScoreForGuess(Score score, Letter ...expectedLetters) {
        for (int position = 0; position < expectedLetters.length; position++) {
            Letter expected = expectedLetters[position];

            assertThat(score.letter(position)).isEqualTo(expected);
        }
    }
}
