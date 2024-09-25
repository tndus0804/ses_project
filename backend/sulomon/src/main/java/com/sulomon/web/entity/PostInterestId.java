package com.sulomon.web.entity;

import java.io.Serializable;
import java.util.Objects;

public class PostInterestId implements Serializable {
    private int postId;
    private int interestId;

    // 기본 생성자
    public PostInterestId() {}

    // 매개변수 있는 생성자
    public PostInterestId(int postId, int interestId) {
        this.postId = postId;
        this.interestId = interestId;
    }

    // equals()와 hashCode()는 복합키 비교를 위해 필요
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PostInterestId that = (PostInterestId) o;
        return postId == that.postId && interestId == that.interestId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(postId, interestId);
    }
}