package web.dto;

public record Result(float x, float y, float r, boolean hit, String serverTime, long scriptTime) {
}