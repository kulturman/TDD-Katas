package com.example.testingwithspring;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NewGameTest {
    @Mock
    private GameRepository gameRepository;

    @Mock
    private RandomNumbers randomNumbers;

    @Mock
    private WordRepository wordRepository;
    @InjectMocks
    private Wordz wordz;
    private static final Player PLAYER = new Player();;

    @Test
    void selectsRandomWord() throws WordRepositoryException {
        givenWordToSelect("HELLO");
        wordz.newGame(PLAYER);
        var game = getGameInRepository();
        assertThat(game.getCorrectWord()).isEqualTo("HELLO");
    }

    void givenWordToSelect(String word) throws WordRepositoryException {
        final var RANDOM_NUMBER = 2;
        when(randomNumbers.next(anyInt())).thenReturn(RANDOM_NUMBER);
        when(wordRepository.fetchWordByNumber(RANDOM_NUMBER)).thenReturn(word);
    }

    private Game getGameInRepository() {
        var gameArgumentCaptor = ArgumentCaptor.forClass(Game.class);
        verify(gameRepository).create(gameArgumentCaptor.capture());
        return gameArgumentCaptor.getValue();
    }
}
