package com.example.testingwithspring;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class WordZEndpointTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;

    @Test
    void startsGame() throws Exception {
        String data = objectMapper.writeValueAsString(new StartGameDto("Arnaud"));

        mockMvc.perform(post("/api/game")
                .contentType(MediaType.APPLICATION_JSON)
                .content(data)
            )
            .andExpect(jsonPath("$.id").value(120))
            .andExpect(status().isOk());
    }
}
