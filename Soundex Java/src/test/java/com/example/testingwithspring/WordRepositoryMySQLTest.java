package com.example.testingwithspring;

import com.github.database.rider.core.api.configuration.DBUnit;
import com.github.database.rider.core.api.configuration.Orthography;
import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.spring.api.DBRider;
import org.dbunit.operation.DatabaseOperation;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;


@SpringBootTest
@DBRider
@DBUnit(leakHunter = true, caseSensitiveTableNames = true, caseInsensitiveStrategy = Orthography.LOWERCASE)
class WordRepositoryMySQLTest {

    @Autowired
    private WordRepositoryMySQL wordRepository;

    @Test
    void fetchesWord() throws WordRepositoryException {
        var word = wordRepository.fetchWordByNumber(10);
        assertThat(word).isEqualTo("LOVE");
    }

    @Test
    void throwsExceptionForWordNotFound() throws WordRepositoryException {
        assertThatThrownBy(() -> wordRepository.fetchWordByNumber(101))
            .isInstanceOf(WordRepositoryException.class);
    }
}