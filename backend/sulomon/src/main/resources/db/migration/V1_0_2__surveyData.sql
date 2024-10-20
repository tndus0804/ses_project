use sulomon;

INSERT INTO `survey` (user_num, title, description, form_type, points, status, startdate, enddate)
SELECT user_num, '설문조사 제목 1', '설문조사 내용 1', 'site_form', 100, 'active', NOW(), NOW() + INTERVAL 7 DAY
FROM `user`
WHERE user_id = 'jklfds1';

INSERT INTO `survey` (user_num, title, description, form_type, points, status, startdate, enddate)
SELECT user_num, '설문조사 제목 2', '설문조사 내용 2', 'site_form', 200, 'active', NOW(), NOW() + INTERVAL 7 DAY
FROM `user`
WHERE user_id = 'jklfds1';

INSERT INTO `survey` (user_num, title, description, form_type, points, status, startdate, enddate)
SELECT user_num, '설문조사 제목 3', '설문조사 내용 3', 'site_form', 300, 'active', NOW(), NOW() + INTERVAL 7 DAY
FROM `user`
WHERE user_id = 'jklfds1';

INSERT INTO `survey` (user_num, title, description, form_type, points, status, startdate, enddate)
SELECT user_num, '설문조사 제목 4', '설문조사 내용 4', 'site_form', 1000, 'active', NOW(), NOW() + INTERVAL 7 DAY
FROM `user`
WHERE user_id = 'jklfds1';

INSERT INTO `survey` (user_num, title, description, form_type, points, status, startdate, enddate)
SELECT user_num, '설문조사 제목 5', '설문조사 내용 5', 'site_form', 2000, 'active', NOW(), NOW() + INTERVAL 7 DAY
FROM `user`
WHERE user_id = 'jklfds1';

INSERT INTO `survey` (user_num, title, description, form_type, points, status, startdate, enddate)
SELECT user_num, '설문조사 제목 6', '설문조사 내용 6', 'site_form', 2500, 'active', NOW(), NOW() + INTERVAL 7 DAY
FROM `user`
WHERE user_id = 'jklfds1';

INSERT INTO `survey` (user_num, title, description, form_type, points, status, startdate, enddate)
SELECT user_num, '설문조사 제목 7', '설문조사 내용 7', 'site_form', 4000, 'active', NOW(), NOW() + INTERVAL 7 DAY
FROM `user`
WHERE user_id = 'jklfds1';

INSERT INTO `survey` (user_num, title, description, form_type, points, status, startdate, enddate)
SELECT user_num, '설문조사 제목 8', '설문조사 내용 8', 'site_form', 3500, 'active', NOW(), NOW() + INTERVAL 7 DAY
FROM `user`
WHERE user_id = 'jklfds1';