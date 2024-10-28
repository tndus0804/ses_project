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

import org.springframework.web.bind.annotation.PathVariable;
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

	// 공지사항 상세 조회
	@GetMapping("Notice/{id}")
	public ResponseEntity<NoticeDTO> getNotice(@PathVariable Integer id) {
		NoticeDTO notice = noticeService.getNotice(id); // 해당 ID의 공지사항을 서비스에서 조회
		if (notice != null) {
			return ResponseEntity.ok(notice);
		} else {
			return ResponseEntity.notFound().build(); // 공지사항이 없을 경우 404 반환
		}
	}
	
//	@GetMapping("api/LatestNotices")
//	public ResponseEntity<List<NoticeDTO>> getLatestNotices() {
//	    List<NoticeDTO> latestNotices = noticeService.getLatestNotices();
//	    return ResponseEntity.ok(latestNotices);
//	}

	// 공지사항 삭제
	@PostMapping("NoticeDelete")
	public ResponseEntity<Void> deleteNotice(@RequestBody Map<String, Integer> requestBody) {

		Integer id = requestBody.get("id");
		// 로그 추가
		log.debug("Received request to delete notice with ID: {}", id);

		noticeService.deleteNotice(id);

		return ResponseEntity.noContent().build();
	}

}