package com.example.testingwithspring;

public class Word {
    private final String correctWord;

    Word(String word) {
        correctWord = word;
    }

    public Score guess(String attempt) {
        var score = new Score(correctWord);
        score.assess(attempt);
        return score;
    }
}

enum Letter {
    INCORRECT,
    CORRECT,
    PART_CORRECT
}