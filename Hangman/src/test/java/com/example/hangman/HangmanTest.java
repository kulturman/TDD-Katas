package com.example.hangman;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class HangmanTest {
    WordRepositoryStub wordRepository;
    RandomNumberStub randomNumberProvider;
    Hangman hangman;
    int ATTEMPTS_COUNT = 10;

    @BeforeEach
    void beforeEach() {
        wordRepository = new WordRepositoryStub();
        randomNumberProvider = new RandomNumberStub();
        wordRepository.wordToGuess = "BONJOUR";
        hangman = new Hangman(wordRepository, randomNumberProvider, ATTEMPTS_COUNT);
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
        var hangman = createHangmanInstanceWithReturnWord("A", 1);
        var result = hangman.guess('X');
        assertGameIsOverWithOutcome(result, OutCome.LOSS);
    }

    private static void assertGameIsOverWithOutcome(GuessResult result, OutCome outCome) {
        assertThat(result.isGameOver()).isTrue();
        assertThat(result.outCome()).isEqualTo(outCome);
    }

    @Test
    void endGameIfWordIsFound() {;
        var hangman = createHangmanInstanceWithReturnWord("A", 1);
        var result = hangman.guess('A');
        assertGameIsOverWithOutcome(result, OutCome.WIN);
    }

    Hangman createHangmanInstanceWithReturnWord(String word, int attemptsCount) {
        var wordRepository = new WordRepositoryStub();
        wordRepository.wordToGuess = word;
        return new Hangman(wordRepository, randomNumberProvider, attemptsCount);
    }
}
