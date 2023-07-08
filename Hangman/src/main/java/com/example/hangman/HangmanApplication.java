package com.example.hangman;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Scanner;

@SpringBootApplication
public class HangmanApplication {
    public static void main(String[] args) {
        SpringApplication.run(HangmanApplication.class, args);
        Hangman hangman = new Hangman(
            new InMemoryWordRepository(),
            new RandRandomNumberProvider(),
            10
        );
        Scanner scanner = new Scanner(System.in);
        System.out.println("Guess a word");

        while (!hangman.isGameOver()) {
            char attempt = scanner.nextLine().charAt(0);
            var result = hangman.guess(attempt);
            System.out.println(result.display());
        }

        if (hangman.outcome() == OutCome.WIN) {
            System.out.println("Congrats, you won");
        }

        else {
            System.out.println("You lost");
        }
    }

}
