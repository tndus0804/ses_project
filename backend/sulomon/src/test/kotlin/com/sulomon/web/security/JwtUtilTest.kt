package com.sulomon.web.security

import io.kotest.core.spec.style.StringSpec
import kotlin.test.* // assert~

class JwtUtilTest: StringSpec({
    // var <- mutable
    // val <- immutable
    lateinit var secret: String
    var expirationTime: Long
    lateinit var userId: String
    lateinit var jwtUtil: JwtUtil

    beforeTest {
        userId = "jklfds1"
        secret = "abcd1234abcd1234abcd1234abcd1234"
        expirationTime = 10L
        jwtUtil = JwtUtil(secret, expirationTime)
    }

    "generateToken에 username을 넣으면, JWT에 role이 자동으로 user로 담긴다." {
        val token = jwtUtil.generateToken(userId)

        assertNotNull(token)
        assertTrue { token.isNotBlank() }
    }
})