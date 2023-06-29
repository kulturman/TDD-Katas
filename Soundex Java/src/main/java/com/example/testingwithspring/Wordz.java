package com.example.testingwithspring;

public class Wordz {
    private final GameRepository gameRepository;
    private final WordSelection wordSelection;

    public Wordz(
        GameRepository gameRepository,
        WordRepository wordRepository,
        RandomNumbers randomNumbers
    ) {
        this.gameRepository = gameRepository;
        wordSelection = new WordSelection(wordRepository, randomNumbers);
    }

    public void newGame(Player player) throws WordRepositoryException {
        final var  word = wordSelection.getRandomWord();
        gameRepository.create(new Game(player,  word, 0));
    }

    public GuessResult assess(Player player, String attempt) {
        Game game = gameRepository.fetchByPlayer(player);
        Score score = game.attempt(attempt);
        if (score.allCorrect()) {
            return new GuessResult(score, true);
        }
        gameRepository.update(game);
        return new GuessResult(score, game.hasNoRemainingGuesses());
    }
}
