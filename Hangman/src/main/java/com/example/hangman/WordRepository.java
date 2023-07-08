package com.example.hangman;

public interface WordRepository {
    String getWord(int wordNumber);
    int getMinWordNumber();
    int getMaxWordNumber();

}
