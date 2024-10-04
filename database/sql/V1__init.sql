use sulomon;
show tables;

select * from user;

-- 유저 관련 테이블 (포인트 포함)
CREATE TABLE user (
    user_num INT AUTO_INCREMENT PRIMARY KEY,    -- 사용자 고유 번호
    user_id VARCHAR(20) UNIQUE NOT NULL,        -- 로그인에 사용되는 유저 아이디
    password VARCHAR(255),                      -- 해시화된 비밀번호
    email VARCHAR(100) UNIQUE NOT NULL,         -- 사용자 이메일 주소 (고유)
    CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'),  -- 이메일 형식 검사
    name VARCHAR(100) NOT NULL,                 -- 사용자 실명
    birthday DATE NOT NULL,                     -- 사용자 생년월일
    gender VARCHAR(10) NOT NULL,                -- 성별
    CHECK (gender IN ('male', 'female', 'other')),  -- 성별 제약 조건
    social_login BOOLEAN DEFAULT FALSE,         -- 소셜 로그인 여부
    role VARCHAR(10) DEFAULT 'user',            -- 사용자 역할
    CHECK (role IN ('user', 'admin')),          -- 역할 제약 조건
    
    -- 수정 가능한 유저 정보
    address VARCHAR(255),                       -- 사용자 주소
    phone_number VARCHAR(30),                   -- 사용자 전화번호
    CHECK (phone_number REGEXP '^\\+?[0-9]{10,15}$'),  -- 전화번호 형식 검사
    mbti CHAR(4),                               -- MBTI 성격 유형
    
    -- 포인트 정보
    points INT DEFAULT 0,                       -- 유저의 초기 포인트는 0
    
    -- 만든 날짜 및 정보 수정한 날짜
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 계정 생성 시간
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 계정 수정 시간
    status VARCHAR(10) DEFAULT 'active',         -- 계정 상태
    CHECK (status IN ('active', 'inactive', 'banned'))  -- 상태 제약 조건
);


-- 설문조사 관련 테이블

-- 설문조사 테이블
CREATE TABLE survey (
    survey_id INT AUTO_INCREMENT PRIMARY KEY, -- 설문조사 고유 ID
    user_num INT NOT NULL,                     -- 설문조사 작성자 번호 (users 테이블과 연결)
    title VARCHAR(255) NOT NULL,               -- 설문조사 제목
    description TEXT,                          -- 설문조사 내용
    form_type VARCHAR(20) DEFAULT 'site_form', -- 폼 타입
    CHECK (form_type IN ('google_form', 'site_form')),  -- 폼 타입 제약 조건
    points INT DEFAULT 0,                      -- 참여자에게 지급할 포인트
    status VARCHAR(20) DEFAULT 'draft',        -- 설문조사 상태 (VARCHAR로 변경)
    CHECK (status IN ('draft', 'active', 'completed', 'closed', 'deleted')),  -- 상태 제약 조건
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 설문조사 생성 시간
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 설문조사 수정 시간
    FOREIGN KEY (user_num) REFERENCES users(user_num) -- users 테이블의 user_num과 연결
);



-- 설문조사 질문 테이블
CREATE TABLE survey_question (
    question_id INT AUTO_INCREMENT PRIMARY KEY, -- 질문 고유 ID
    survey_id INT NOT NULL,                    -- 설문조사 ID (surveys 테이블과 연결)
    question_text TEXT NOT NULL,               -- 질문 내용
    question_type ENUM('multiple_choice', 'text', 'rating') NOT NULL, -- 질문 유형 ('multiple_choice': 객관식, 'text': 서술형, 'rating': 평점)
    options JSON,                              -- 선택지 (객관식 질문일 경우 JSON 형식으로 저장)
    FOREIGN KEY (survey_id) REFERENCES surveys(survey_id) -- surveys 테이블의 survey_id를 참조하는 외래 키
);

-- 설문조사 응답 테이블
CREATE TABLE survey_response (
    response_id INT AUTO_INCREMENT PRIMARY KEY, -- 응답 고유 ID
    survey_id INT NOT NULL,                     -- 설문조사 ID (surveys 테이블과 연결)
    user_num INT NOT NULL,                       -- 응답한 사용자 번호 (users 테이블과 연결)
    responses JSON NOT NULL,                    -- 응답 내용 (JSON 형식으로 저장)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 응답 생성 시간
    FOREIGN KEY (survey_id) REFERENCES surveys(survey_id), -- surveys 테이블의 survey_id를 참조하는 외래 키
    FOREIGN KEY (user_num) REFERENCES users(user_num) -- users 테이블의 user_num을 참조하는 외래 키
);


-- 게시판 관련 테이블

-- 게시판 테이블 (이미지 경로, 공개/비공개 상태, 비공개 게시글 암호 포함)
CREATE TABLE post (
    post_id INT AUTO_INCREMENT PRIMARY KEY,    -- 게시글 고유 ID
    user_num INT NOT NULL,                     -- 작성자 번호 (users 테이블과 연결)
    title VARCHAR(255) NOT NULL,               -- 게시글 제목
    content TEXT NOT NULL,                     -- 게시글 내용
    category VARCHAR(50),                      -- 게시글 카테고리
    views INT DEFAULT 0,                       -- 게시글 조회수
    image_path VARCHAR(255),                   -- 이미지 파일 경로 추가
    visibility VARCHAR(10) DEFAULT 'visible',  -- 공개/비공개 상태
    CHECK (visibility IN ('visible', 'hidden')),  -- 공개/비공개 제약 조건
    private_password VARCHAR(255),             -- 비공개 게시글의 암호 (해시화된 형태로 저장)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 게시글 생성 시간
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 게시글 수정 시간
    status VARCHAR(10) DEFAULT 'active',       -- 게시글 상태
    CHECK (status IN ('active', 'deleted')),   -- 상태 제약 조건
    FOREIGN KEY (user_num) REFERENCES users(user_num) -- users 테이블의 user_num과 연결
);


-- 결제 및 기프티콘 관련 테이블
CREATE TABLE payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY, -- 결제 고유 ID
    user_num INT NOT NULL,                     -- 결제한 사용자 번호 (users 테이블과 연결)
    amount DECIMAL(10, 2) NOT NULL,            -- 결제 금액
    payment_method VARCHAR(20) NOT NULL,       -- 결제 수단
    CHECK (payment_method IN ('toss', 'naver_pay', 'kakao_pay', 'failed')),  -- 결제 수단 제약 조건
    status VARCHAR(20) DEFAULT 'pending',      -- 결제 상태
    CHECK (status IN ('pending', 'completed', 'failed')),  -- 결제 상태 제약 조건
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 결제 생성 시간
    FOREIGN KEY (user_num) REFERENCES users(user_num) -- users 테이블의 user_num을 참조하는 외래 키
);

-- 기프티콘 테이블
CREATE TABLE gifticon (
    gifticon_id INT AUTO_INCREMENT PRIMARY KEY,  -- 기프티콘 고유 ID
    user_num INT NOT NULL,                       -- 기프티콘 구매자 번호 (users 테이블과 연결)
    phone_number VARCHAR(30),                    -- 기프티콘 전송할 전화번호
    gifticon_type VARCHAR(50),                   -- 기프티콘 종류
    amount DECIMAL(10, 2) NOT NULL,              -- 기프티콘 금액
    status VARCHAR(10) DEFAULT 'pending',        -- 기프티콘 상태
    CHECK (status IN ('pending', 'sent', 'failed')),  -- 상태 제약 조건 추가
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 기프티콘 구매 시간
    FOREIGN KEY (user_num) REFERENCES users(user_num) -- users 테이블의 user_num을 참조하는 외래 키
);

-- 포인트 인출 요청 테이블 (은행명 및 계좌번호 추가, 금액 제약 조건 포함)
CREATE TABLE point_withdrawal_request (
    withdrawal_id INT AUTO_INCREMENT PRIMARY KEY,  -- 인출 요청 고유 ID
    user_num INT NOT NULL,                         -- 요청한 사용자 번호 (users 테이블과 연결)
    requested_amount INT NOT NULL,                 -- 요청한 인출 금액 (포인트 단위, 5,500원 이상 100,000원 이하)
    CHECK (requested_amount >= 5500 AND requested_amount <= 100000), -- 금액 제약 조건 추가
    bank_name VARCHAR(100) NOT NULL,               -- 인출할 은행명
    account_number VARCHAR(50) NOT NULL,           -- 인출할 계좌번호
    status VARCHAR(20) DEFAULT 'pending',          -- 인출 요청 상태
    CHECK (status IN ('pending', 'approved', 'rejected')), -- 상태 제약 조건
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 인출 요청 시간
    processed_at DATETIME,                         -- 요청 처리 시간 (승인 또는 거절된 시간)
    FOREIGN KEY (user_num) REFERENCES users(user_num) ON DELETE CASCADE
);

-- 공지사항 관련 테이블
CREATE TABLE notice (
    notice_id INT AUTO_INCREMENT PRIMARY KEY, -- 공지사항 고유 ID
    admin_num INT NOT NULL,                          -- 작성한 관리자 번호 (users 테이블과 연결)
    title VARCHAR(255) NOT NULL,                    -- 공지사항 제목
    content TEXT NOT NULL,                          -- 공지사항 내용
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- 공지사항 생성 시간
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 공지사항 수정 시간
    FOREIGN KEY (admin_num) REFERENCES users(user_num) -- users 테이블의 user_num을 참조하는 외래 키
);



-- 댓글 관련 테이블
CREATE TABLE comment (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,  -- 댓글 고유 ID
    post_id INT NOT NULL,                       -- 게시글 ID (posts 테이블과 연결)
    user_num INT,                               -- 댓글 작성자 번호 (users 테이블과 연결, 탈퇴한 경우 NULL)
    username VARCHAR(100) NOT NULL,             -- 댓글 작성자 이름 (계정 삭제 시에도 남음)
    content TEXT NOT NULL,                      -- 댓글 내용
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 댓글 생성 시간
    status VARCHAR(10) DEFAULT 'active',        -- 댓글 상태
    CHECK (status IN ('active', 'deleted')),    -- 상태 제약 조건
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE, -- 게시글이 삭제되면 관련 댓글도 삭제
    FOREIGN KEY (user_num) REFERENCES users(user_num) ON DELETE SET NULL -- 사용자가 삭제되면 user_num을 NULL로 설정
);

-- 인덱스

-- 유저 조회
SHOW INDEX FROM user;
CREATE INDEX idx_user_id ON users (user_id); -- 유저 아이디 조회할 때
CREATE index idx_user_name ON users (name); -- 이름으로 조회할 때

-- 게시글 조회
show index from post;
CREATE index idx_posts ON posts (user_num); -- 유저 아이디로 게시글 조회

-- 설문조사 조회
show index from survey;
CREATE index idx_survey on surveys (user_num); -- 해당 유저 번호로 설문조사 조회


