package com.example.testingwithspring;

import java.util.ArrayList;
import java.util.List;

public class Score {
    private final String correctWord;
    private final List<Letter> results;

    private int position;

    private boolean allCorrect;

    Score(String correctWord) {
        this.correctWord = correctWord;
        results = new ArrayList<>();
    }

    public Letter letter(int position) {
        return results.get(position);
    }

    public void assess(String attempt) {
        if (attempt.equals(correctWord)) {
            allCorrect = true;
        }

        for (char letter: attempt.toCharArray()) {
            results.add(scoreFor(letter));
            position++;
        }
    }

    private Letter scoreFor(char letter) {

        if (isCorrectLetter(letter, position)) {
            return Letter.CORRECT;
        }

        else if (occursInWord(letter)) {
            return Letter.PART_CORRECT;
        }

        return Letter.INCORRECT;
    }

    private boolean occursInWord(char letter) {
        return correctWord.contains(String.valueOf(letter));
    }

    private boolean isCorrectLetter(char letter, int position) {
        return correctWord.charAt(position) == letter;
    }

    public boolean allCorrect() {
        return allCorrect;
    }
}
