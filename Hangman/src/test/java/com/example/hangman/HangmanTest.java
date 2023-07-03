package com.example.hangman;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class HangmanTest {
    Hangman hangman;
    int ATTEMPTS_COUNT = 10;

    @BeforeEach
    void beforeEach() {
        hangman = new Hangman("BONJOUR", ATTEMPTS_COUNT);
    }

    @Test
    void letterIsNotInTheWord() {
        GuessResult result = hangman.guess('A');
        assertThat(result.display()).isEqualTo("*******");
    }

    @Test
    void letterIsInTheWord() {
        GuessResult result = hangman.guess('N');
        assertThat(result.display()).isEqualTo("**N****");
    }

    @Test
    void sameLetterAppearsAtMultiplePositions() {
        GuessResult result = hangman.guess('O');
        assertThat(result.display()).isEqualTo("*O**O**");
    }

    @Test
    void keepTrackOfPreviousResults() {
        hangman.guess('O');
        hangman.guess('N');
        var result = hangman.guess('B');
        assertThat(result.display()).isEqualTo("BON*O**");
    }

    @Test
    void decrementsRemainingAttemptsNumber() {
        var result = hangman.guess('W');
        assertThat(result.getRemainingAttempts()).isEqualTo(ATTEMPTS_COUNT - 1);
    }

    @Test
    void attemptsCountIsNotDecrementedIfLetterIsInTheWord() {
        var result = hangman.guess('B');
        assertThat(result.getRemainingAttempts()).isEqualTo(ATTEMPTS_COUNT);
    }

    @Test
    void attemptsCountNotDecrementedIfLetterWasAlreadyPlayed() {
        hangman.guess('Z');
        var result = hangman.guess('Z');
        assertThat(result.getRemainingAttempts()).isEqualTo(ATTEMPTS_COUNT - 1);
    }

    @Test
    void endGameOnLastAttempt() {
        var hangman = new Hangman("TEST", 1);
        var result = hangman.guess('X');
        assertThat(result.isGameOver()).isTrue();
        assertThat(result.outCome()).isEqualTo(OutCome.LOSS);
    }

    @Test
    void endGameIfWordIsFound() {
        var hangman = new Hangman("A", 1);
        var result = hangman.guess('A');
        assertThat(result.isGameOver()).isTrue();
        assertThat(result.outCome()).isEqualTo(OutCome.WIN);
    }
}
