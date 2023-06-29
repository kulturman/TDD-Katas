package com.example.testingwithspring;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.persistence.*;
import java.util.Optional;

@Service
@AllArgsConstructor
public class WordRepositoryMySQL implements WordRepository {
    private JpaWordRepository jpaWordRepository;
    @Override
    public String fetchWordByNumber(int wordNumber) throws WordRepositoryException {
        var wordEntity = jpaWordRepository.findByWordNumber((long) wordNumber);
        if (wordEntity.isEmpty()) {
            throw new WordRepositoryException("Word with number " + wordNumber + " not found");
        }
        return wordEntity.get().getWord();
    }

    @Override
    public int highestWordNumber() {
        return 0;
    }
}

@Entity(name = "words")
@Data
class WordEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String word;

    @Column(name = "word_number")
    private Long wordNumber;
}

@Repository
interface JpaWordRepository extends JpaRepository<WordEntity, Long> {
    Optional<WordEntity> findByWordNumber(Long wordNumber);
}