use sulomon;

INSERT INTO `notice` (admin_num, title, content, created_at, updated_at)
SELECT user_num, '공지사항 제목 1', '공지사항 내용 1', NOW(), NOW()
FROM `user`
WHERE user_id = 'jklfds2';

INSERT INTO `notice` (admin_num, title, content, created_at, updated_at)
SELECT user_num, '공지사항 제목 2', '공지사항 내용 2', NOW(), NOW()
FROM `user`
WHERE user_id = 'jklfds2';

INSERT INTO `notice` (admin_num, title, content, created_at, updated_at)
SELECT user_num, '공지사항 제목 3', '공지사항 내용 3', NOW(), NOW()
FROM `user`
WHERE user_id = 'jklfds2';