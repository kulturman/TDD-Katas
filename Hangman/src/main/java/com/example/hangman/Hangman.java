package com.example.hangman;

import java.util.HashSet;
import java.util.Set;

public class Hangman {
    private final String correctWord;
    private final Set<Integer> foundLettersPosition = new HashSet<>();
    private final Set<Character> playedLetters = new HashSet<>();
    private final char HIDING_CHARACTER = '*';
    private int remainingAttempts;
    private OutCome outcome = OutCome.GAME_IN_PROGRESS;
    private WordSelector wordSelector;

    public Hangman(
        WordRepository wordRepository,
        RandomNumberProvider randomNumberProvider,
        int attemptsCount
    ) {
        remainingAttempts = attemptsCount;
        wordSelector = new WordSelector(wordRepository, randomNumberProvider);
        correctWord = wordSelector.selectWord();
    }

    public GuessResult guess(char attempt) {
        updateFoundPositions(attempt);
        updateGameState(attempt);
        return getResult();
    }

    private void updateGameState(char attempt) {
        if (
            !correctWord.contains(String.valueOf(attempt)) &&
            !playedLetters.contains(attempt)
        ) {
            remainingAttempts--;
        }
        playedLetters.add(attempt);
    }

    private void updateFoundPositions(char attempt) {
        for (int index = 0; index < correctWord.length(); index++) {
            if (attempt == correctWord.charAt(index)) {
                foundLettersPosition.add(index);
            }
        }
    }
    private GuessResult getResult() {
        var result = new StringBuilder();

        for (int position = 0; position < correctWord.length(); position++) {
            var currentLetter = correctWord.charAt(position);

            if (foundLettersPosition.contains(position)) {
                result.append(currentLetter);
            }
            else {
                result.append(HIDING_CHARACTER);
            }
        }

        updateOutcome();

        return new GuessResult(result.toString(), remainingAttempts, isGameOver(), outcome);
    }

    private void updateOutcome() {
        if (foundLettersPosition.size() == correctWord.length()) {
            outcome = OutCome.WIN;
        }
        else if (remainingAttempts == 0) {
            outcome = OutCome.LOSS;
        }
    }

    public OutCome outcome() {
        return outcome;
    }

    public boolean isGameOver() {
        return outcome != OutCome.GAME_IN_PROGRESS;
    }
}
