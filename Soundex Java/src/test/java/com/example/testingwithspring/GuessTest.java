package com.example.testingwithspring;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.assertj.core.api.Assertions.assertThat;
import static com.example.testingwithspring.Letter.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GuessTest implements WordRepository, RandomNumbers, GameRepository {
    private static final Player PLAYER = new Player();
    private final String CORRECT_WORD = "ARISE";
    private static final String WRONG_WORD = "RIVER";
    @Mock
    private GameRepository gameRepository;

    private Wordz wordz;

    @BeforeEach
    void beforeEach() throws WordRepositoryException {
        wordz = new Wordz(this, this, this);
        wordz.newGame(PLAYER);
    }

    @Test
    void returnScoreForGuess() throws WordRepositoryException {
        GuessResult guessResult = wordz.assess(PLAYER, WRONG_WORD);
        assertThat(guessResult.score().letter(0)).isEqualTo(PART_CORRECT);
    }

    @Test
    void reportsAllCorrect() {
        var word = new Word("ARISE");
        var score = word.guess("ARISE");
        assertThat(score.allCorrect()).isTrue();
    }

    @Test
    void reportsNotAllCorrect() {
        var word = new Word("ARISE");
        var score = word.guess("ARI*E");
        assertThat(score.allCorrect()).isFalse();
    }

    @Test
    void updateAttemptsNumber() {
        var wordz = new Wordz(gameRepository, this, this);
        when(gameRepository.fetchByPlayer(PLAYER)).thenReturn(new Game(PLAYER, CORRECT_WORD, 0));
        wordz.assess(PLAYER, WRONG_WORD);
        var game = getGameAfterUpdate();
        assertThat(game.getAttemptNumber()).isEqualTo(1);
    }

    @Test
    void reportsGameOverOnCorrectGuess() {
        var wordz = new Wordz(gameRepository, this, this);
        when(gameRepository.fetchByPlayer(PLAYER)).thenReturn(new Game(PLAYER, CORRECT_WORD, 0));
        var result = wordz.assess(PLAYER, CORRECT_WORD);
        assertThat(result.isGameOver()).isTrue();
    }

    @Test
    void gameOverOnTooManyIncorrectGuesses() {
        int maximumGuesses = 5;
        var wordz = new Wordz(gameRepository, this, this);
        when(gameRepository.fetchByPlayer(PLAYER)).thenReturn(new Game(PLAYER, CORRECT_WORD, maximumGuesses - 1));
        var result = wordz.assess(PLAYER, WRONG_WORD);
        assertThat(result.isGameOver()).isTrue();
    }

    Game getGameAfterUpdate() {
        var gameArgumentCaptor = ArgumentCaptor.forClass(Game.class);
        verify(gameRepository).update(gameArgumentCaptor.capture());
        return gameArgumentCaptor.getValue();
    }

    @Override
    public int next(int highestNumber) {
        return 0;
    }

    @Override
    public String fetchWordByNumber(int wordNumber) throws WordRepositoryException {
        return CORRECT_WORD;
    }

    @Override
    public int highestWordNumber() {
        return 5;
    }

    @Override
    public void create(Game game) {

    }

    @Override
    public Game fetchByPlayer(Player player) {
        return new Game(player, CORRECT_WORD, 0);
    }

    @Override
    public void update(Game capture) {

    }
}
