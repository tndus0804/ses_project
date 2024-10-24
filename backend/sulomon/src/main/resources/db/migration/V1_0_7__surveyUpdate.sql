use sulomon;

ALTER TABLE `survey`
ADD COLUMN `participant_limit` INT DEFAULT 10 COMMENT '설문조사 참가자 제한 수';