package com.example.hangman;

public class WordSelector {
    private final WordRepository wordRepository;
    private final RandomNumberProvider randomNumberProvider;

    public WordSelector(WordRepository wordRepository, RandomNumberProvider randomNumberProvider) {
        this.wordRepository = wordRepository;
        this.randomNumberProvider = randomNumberProvider;
    }

    public String selectWord() {
        int number = randomNumberProvider.next(wordRepository.getMinWordNumber(), wordRepository.getMaxWordNumber());
        return wordRepository.getWord(number);
    }
}
