package com.sulomon.web.service;

import java.util.List;

import com.sulomon.web.dto.NoticeDTO;

public interface NoticeService {
	void noticeWrite(NoticeDTO noticeDTO);

	List<NoticeDTO> getNoticeList();

	NoticeDTO getNotice(Integer id);

	void deleteNotice(Integer id);

}
