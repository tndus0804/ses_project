use sulomon;

INSERT INTO `post` (user_num, title, content, category, views, image_path, visibility, private_password, status, created_at, updated_at)
SELECT user_num, '게시글 제목 1', '게시글 내용 1', '카테고리 1', 0, '/images/path1.jpg', 'visible', NULL, 'active', NOW(), NOW()
FROM `user` WHERE user_id = 'jklfds1';

INSERT INTO `post` (user_num, title, content, category, views, image_path, visibility, private_password, status, created_at, updated_at)
SELECT user_num, '게시글 제목 2', '게시글 내용 2', '카테고리 2', 0, '/images/path2.jpg', 'visible', NULL, 'active', NOW(), NOW()
FROM `user` WHERE user_id = 'jklfds1';

INSERT INTO `post` (user_num, title, content, category, views, image_path, visibility, private_password, status, created_at, updated_at)
SELECT user_num, '게시글 제목 3', '게시글 내용 3', '카테고리 3', 0, '/images/path3.jpg', 'private', 'hashed_password_1', 'active', NOW(), NOW()
FROM `user` WHERE user_id = 'jklfds1';

INSERT INTO `post` (user_num, title, content, category, views, image_path, visibility, private_password, status, created_at, updated_at)
SELECT user_num, '게시글 제목 4', '게시글 내용 4', '카테고리 4', 0, '/images/path4.jpg', 'private', 'hashed_password_2', 'active', NOW(), NOW()
FROM `user` WHERE user_id = 'jklfds1';

INSERT INTO `post` (user_num, title, content, category, views, image_path, visibility, private_password, status, created_at, updated_at)
SELECT user_num, '게시글 제목 5', '게시글 내용 5', '카테고리 5', 0, '/images/path5.jpg', 'visible', NULL, 'active', NOW(), NOW()
FROM `user` WHERE user_id = 'jklfds1';

INSERT INTO `post` (user_num, title, content, category, views, image_path, visibility, private_password, status, created_at, updated_at)
SELECT user_num, '게시글 제목 6', '게시글 내용 6', '카테고리 6', 0, '/images/path6.jpg', 'visible', NULL, 'active', NOW(), NOW()
FROM `user` WHERE user_id = 'jklfds1';

INSERT INTO `post` (user_num, title, content, category, views, image_path, visibility, private_password, status, created_at, updated_at)
SELECT user_num, '게시글 제목 7', '게시글 내용 7', '카테고리 7', 0, '/images/path7.jpg', 'private', 'hashed_password_3', 'active', NOW(), NOW()
FROM `user` WHERE user_id = 'jklfds1';

INSERT INTO `post` (user_num, title, content, category, views, image_path, visibility, private_password, status, created_at, updated_at)
SELECT user_num, '게시글 제목 8', '게시글 내용 8', '카테고리 8', 0, '/images/path8.jpg', 'visible', NULL, 'active', NOW(), NOW()
FROM `user` WHERE user_id = 'jklfds1';