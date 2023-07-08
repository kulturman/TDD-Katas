package com.example.hangman;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class WordSelectorTest {
    WordRepositoryStub  wordRepository;
    RandomNumberStub randomNumber;
    WordSelector wordSelector;
    int RANDOM_NUMBER = 5;
    int MIN_WORD_NUMBER = 0;
    int MAX_WORD_NUMBER = 100;
    String WORD_TO_GUESS = "HOPE";

    @BeforeEach
    void beforeEach() {
        wordRepository = new WordRepositoryStub();
        wordRepository.min = MIN_WORD_NUMBER;
        wordRepository.max = MAX_WORD_NUMBER;
        wordRepository.wordToGuess = WORD_TO_GUESS;
        randomNumber = new RandomNumberStub();
        randomNumber.nextNumber = RANDOM_NUMBER;
        wordSelector = new WordSelector(wordRepository, randomNumber);
    }

    @Test
    void selectRandomWord() {
        var word = wordSelector.selectWord();
        assertThat(wordRepository.wordNumber).isEqualTo(RANDOM_NUMBER);
        assertThat(randomNumber.min).isEqualTo(MIN_WORD_NUMBER);
        assertThat(randomNumber.max).isEqualTo(MAX_WORD_NUMBER);
        assertThat(word).isEqualTo(WORD_TO_GUESS);
    }
}
