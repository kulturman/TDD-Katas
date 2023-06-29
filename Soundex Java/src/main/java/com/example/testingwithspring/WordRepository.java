package com.example.testingwithspring;

public interface WordRepository {
    String fetchWordByNumber(int wordNumber) throws WordRepositoryException;
    int highestWordNumber();
}
