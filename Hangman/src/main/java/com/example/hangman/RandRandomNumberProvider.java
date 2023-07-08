package com.example.hangman;

import java.util.Random;

public class RandRandomNumberProvider implements RandomNumberProvider {

    @Override
    public int next(int min, int max) {
        //We add 1 because nextInt returns a number between 0 and max (excluded)
        int number = new Random().nextInt(max + 1);

        return number % (max - min) + min;
    }
}
