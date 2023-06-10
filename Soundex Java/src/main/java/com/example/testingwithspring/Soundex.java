package com.example.testingwithspring;

import java.util.HashMap;
import java.util.Map;

public class Soundex {
    private final int MAX_CODE_LENGTH = 4;
    private final String NOT_A_DIGIT = "*";
    public String encode(String word) {
        return zeroPad(head(word).toUpperCase() + encodeDigits(word));
    }

    private String encodedDigit(char letter) {
        Map<Character, String> conversionMap = new HashMap<>();
        conversionMap.put('b', "1");
        conversionMap.put('f', "1");
        conversionMap.put('p', "1");
        conversionMap.put('v', "1");
        conversionMap.put('c', "2");
        conversionMap.put('g', "2");
        conversionMap.put('j', "2");
        conversionMap.put('k', "2");
        conversionMap.put('q', "2");
        conversionMap.put('s', "2");
        conversionMap.put('x', "2");
        conversionMap.put('z', "2");
        conversionMap.put('d', "3");
        conversionMap.put('t', "3");
        conversionMap.put('l', "4");
        conversionMap.put('m', "5");
        conversionMap.put('n', "5");
        conversionMap.put('r', "6");
        return conversionMap.getOrDefault(Character.toLowerCase(letter), NOT_A_DIGIT);
    }

    private String encodeDigits(String word) {
        var encodedDigits = new StringBuilder();
        String lastEncodedDigit = "";

        for (int i = 1; i < word.length(); i++) {
            String currentEncodedDigit = encodedDigit(word.charAt(i));

            if (isComplete(encodedDigits)) {
                break;
            }

            if (!currentEncodedDigit.equals(NOT_A_DIGIT)  && !lastEncodedDigit.equals(currentEncodedDigit)) {
                if(i == 1 &&  String.valueOf(word.charAt(1)).equalsIgnoreCase(String.valueOf(word.charAt(0)))) {
                    continue;
                }
                encodedDigits.append(currentEncodedDigit);
            }
            lastEncodedDigit = currentEncodedDigit;
        }
        return encodedDigits.toString();
    }

    private boolean isComplete(StringBuilder encodedDigits) {
        return encodedDigits.length() == MAX_CODE_LENGTH - 1;
    }

    private String head(String word) {
        return String.valueOf(word.charAt(0));
    }

    private String zeroPad(String word) {
        int zerosNeeded = MAX_CODE_LENGTH - word.length();
        return word + "0".repeat(zerosNeeded);
    }
}
