package com.example.testingwithspring;

public interface GameRepository {
    void create(Game game);

    Game fetchByPlayer(Player player);

    void update(Game capture);
}
