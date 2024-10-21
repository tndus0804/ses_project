package com.sulomon.web.service;

import java.util.List;

import com.sulomon.web.dto.NoticeDTO;

public interface NoticeService {
	// 반환타입 함수이름 (매개변수);
	// void: 반환타입 X
	// String: 반환타입이 문자열일때, 
	// int, long, float, double
	void noticeWrite(NoticeDTO noticeDTO);
	List<NoticeDTO> getNoticeList();
}
