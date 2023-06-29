package com.example.testingwithspring;

public class WordSelection {
    private final WordRepository wordRepository;
    private final RandomNumbers randomNumbers;

    public WordSelection(WordRepository wordRepository, RandomNumbers randomNumbers) {
        this.wordRepository = wordRepository;
        this.randomNumbers = randomNumbers;
    }

    public String getRandomWord() throws WordRepositoryException {
        int randomNumber = randomNumbers.next(wordRepository.highestWordNumber());
        return wordRepository.fetchWordByNumber(randomNumber);
    }
}
