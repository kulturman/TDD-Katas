package com.example.testingwithspring;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WordSelectionTest {
    int HIGHEST_NUMBER = 5;
    int NUMBER_FOR_WORD_TEST = 2;
    String WORD_TEST = "TEST";
    @Mock
    private WordRepository wordRepository;
    @Mock
    private RandomNumbers randomNumbers;

    @Test
    void reportsWordNotFound() throws WordRepositoryException {
        doThrow(new WordRepositoryException("")).when(wordRepository).fetchWordByNumber(anyInt());
        var wordSelection = new WordSelection(wordRepository, randomNumbers);

        assertThatExceptionOfType(WordRepositoryException.class).isThrownBy(
            wordSelection::getRandomWord
        );
    }

    @BeforeEach
    public void beforeEach() throws WordRepositoryException {
        when(wordRepository.highestWordNumber()).thenReturn(HIGHEST_NUMBER);
    }
    @Test
    void selectsWordAtRandom() throws WordRepositoryException {
        when(wordRepository.fetchWordByNumber(NUMBER_FOR_WORD_TEST)).thenReturn(WORD_TEST);
        when(randomNumbers.next(HIGHEST_NUMBER)).thenReturn(NUMBER_FOR_WORD_TEST);

        var selection = new WordSelection(wordRepository, randomNumbers);
        String word = selection.getRandomWord();
        assertThat(word).isEqualTo(WORD_TEST);
    }
}
