package com.example.hangman;

public class InMemoryWordRepository implements WordRepository {
    public String wordToGuess;
    @Override
    public String getWord() {
        return wordToGuess;
    }
}
