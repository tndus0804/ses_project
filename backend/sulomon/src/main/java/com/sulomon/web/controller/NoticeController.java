package com.sulomon.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sulomon.web.dto.NoticeDTO;
import com.sulomon.web.service.NoticeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.bind.annotation.CrossOrigin;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api")
public class NoticeController {
	
	private final NoticeService noticeService;
	
	// 공지사항 등록
	@PostMapping("NoticeWrite")
	public ResponseEntity<String> noticeWrite(
//				@RequestBody Map<String, String> requestBody
				@RequestBody NoticeDTO noticeDTO
			) {
		
//		String title = requestBody.get("title");
//        String content = requestBody.get("content");
		
		log.debug("{}", noticeDTO);
        
        noticeService.noticeWrite(noticeDTO);
		
        // 201 Created 상태 코드와 함께 응답 반환
        return ResponseEntity.status(HttpStatus.CREATED).body("Notice created successfully.");
	}
	
	// 공지사항 조회
	@GetMapping("NoticeList")
	public ResponseEntity<List<NoticeDTO>> getNoticeList() {
	    List<NoticeDTO> notices = noticeService.getNoticeList();
	    return ResponseEntity.ok(notices);
	}
	
//	@GetMapping("api/LatestNotices")
//	public ResponseEntity<List<NoticeDTO>> getLatestNotices() {
//	    List<NoticeDTO> latestNotices = noticeService.getLatestNotices();
//	    return ResponseEntity.ok(latestNotices);
//	}
	

}
