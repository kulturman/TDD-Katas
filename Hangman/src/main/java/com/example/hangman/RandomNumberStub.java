package com.example.hangman;

public class RandomNumberStub implements RandomNumberProvider {
    public int nextNumber;
    public int min;
    public int max;

    @Override
    public int next(int min, int max) {
        this.min = min;
        this.max = max;
        return nextNumber;
    }
}
