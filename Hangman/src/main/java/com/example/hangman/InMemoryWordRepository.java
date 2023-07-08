package com.example.hangman;

public class InMemoryWordRepository implements WordRepository {
    private final String[] words = {
        "HOPE", "LOVE", "DESIGN", "DEVELOPMENT", "DATA",
        "STAGE", "DELIVERY", "TEST"
    };

    @Override
    public String getWord(int wordNumber) {
        return words[wordNumber];
    }

    @Override
    public int getMinWordNumber() {
        return 0;
    }

    @Override
    public int getMaxWordNumber() {
        return words.length - 1;
    }
}
