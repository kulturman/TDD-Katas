package com.example.testingwithspring;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Game {
    private Player player;
    private String correctWord;
    private int attemptNumber;

    public Score attempt(String attempt) {
        attemptNumber++;
        Word word = new Word(correctWord);
        return word.guess(attempt);
    }

    public boolean hasNoRemainingGuesses() {
        return attemptNumber == correctWord.length();
    }
}
