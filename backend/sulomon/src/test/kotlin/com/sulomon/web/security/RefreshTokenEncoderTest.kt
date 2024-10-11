package com.sulomon.web.security

import io.kotest.core.spec.style.StringSpec
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import java.security.SecureRandom
import java.util.*
import kotlin.test.*

class RefreshTokenEncoderTest: StringSpec({
    lateinit var refreshTokenEncoder: PasswordEncoder
    lateinit var refreshTokenBase64: String

    beforeTest {
        // 여기서 생성해도 되고, 빈으로 주입받는 방식도 있음.
        refreshTokenEncoder = BCryptPasswordEncoder(8)

        // refreshTokenBase64
        val bytes = ByteArray(16)
        val secureRandom = SecureRandom()
        secureRandom.nextBytes(bytes)
        val encoder = Base64.getEncoder().withoutPadding()
        refreshTokenBase64 = encoder.encodeToString(bytes)
    }

    "리프레시 토큰 인코더로 인코딩을 한 문자열은 \$2a\$08로 시작해야 한다." {
        val encodedRefreshToken = refreshTokenEncoder.encode(refreshTokenBase64)

        assertNotNull(encodedRefreshToken)
        assertTrue { encodedRefreshToken.startsWith("$2a$08") }
    }
})