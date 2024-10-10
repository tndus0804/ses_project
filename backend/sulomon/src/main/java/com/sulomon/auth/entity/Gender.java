package com.sulomon.auth.entity;

public enum Gender {
    MALE("male"),
    FEMALE("female"),
    OTHER("other");

    private final String content;

    Gender(String content) {
        this.content = content;
    }

    public String content() {
        return content;
    }
}
