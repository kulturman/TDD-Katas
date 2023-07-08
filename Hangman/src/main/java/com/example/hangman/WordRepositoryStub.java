package com.example.hangman;

public class WordRepositoryStub implements WordRepository {
    public String wordToGuess;
    public int min;
    public int max;
    public int wordNumber;

    @Override
    public String getWord(int wordNumber) {
        this.wordNumber = wordNumber;
        return wordToGuess;
    }

    @Override
    public int getMinWordNumber() {
        return min;
    }

    @Override
    public int getMaxWordNumber() {
        return max;
    }
}
