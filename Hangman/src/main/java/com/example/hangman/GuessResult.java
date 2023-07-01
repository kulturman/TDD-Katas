package com.example.hangman;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class GuessResult {
    private String result;
    private int remainingAttempts;
    private boolean isGameOver;
    private OutCome outCome = OutCome.GAME_IN_PROGRESS;

    public GuessResult(String result, int remainingAttempts) {
        this.result = result;
        this.remainingAttempts = remainingAttempts;
    }

    public GuessResult(String result, int remainingAttempts, boolean isGameOver) {
        this.result = result;
        this.remainingAttempts = remainingAttempts;
        this.isGameOver = isGameOver;
    }

    public String display() {
        return result;
    }

    public int getRemainingAttempts() {
        return remainingAttempts;
    }

    public boolean isGameOver() {
        return isGameOver;
    }

    public OutCome outCome() {
        return outCome;
    }
}
