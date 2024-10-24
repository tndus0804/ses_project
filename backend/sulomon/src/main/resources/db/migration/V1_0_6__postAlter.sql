use sulomon;

ALTER TABLE `post`
ADD COLUMN `survey_id` INT COMMENT 'surveys 테이블의 survey_id를 참조하는 외래 키',
ADD CONSTRAINT `fk_post_survey` FOREIGN KEY (`survey_id`) REFERENCES `survey`(`survey_id`);