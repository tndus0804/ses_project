package com.sulomon.web.entity;

import java.io.Serializable;
import java.util.Objects;

public class UserInterestId implements Serializable {
    private int userNum;
    private int interestId;

    // 기본 생성자
    public UserInterestId() {}

    // 매개변수 있는 생성자
    public UserInterestId(int userNum, int interestId) {
        this.userNum = userNum;
        this.interestId = interestId;
    }

    // equals()와 hashCode() 구현
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserInterestId that = (UserInterestId) o;
        return userNum == that.userNum && interestId == that.interestId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userNum, interestId);
    }
}