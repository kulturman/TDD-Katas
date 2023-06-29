package com.example.testingwithspring;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class WordzController {
    @PostMapping("game")
    ResponseEntity<CreateGameResponse> startsGame() {
        return ResponseEntity.ok(new CreateGameResponse(120));
    }
}
