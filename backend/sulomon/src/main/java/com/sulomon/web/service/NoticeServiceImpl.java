package com.sulomon.web.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.sulomon.web.dto.NoticeDTO;
import com.sulomon.web.entity.NoticeEntity;
import com.sulomon.web.repository.NoticeRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class NoticeServiceImpl implements NoticeService {
	
	private final NoticeRepository noticeRepoisory;

	@Override
	public void noticeWrite(NoticeDTO noticeDTO) {
		// DB에 공지사항을 등록하는 코드 작성
		
		NoticeEntity noticeEntity = NoticeEntity.builder()
//							.adminNum(null)
							.title(noticeDTO.getTitle())
							.content(noticeDTO.getContent())
							.build();
		
		noticeRepoisory.save(noticeEntity);	
	}
	
	@Override
	public List<NoticeDTO> getNoticeList() {
	    List<NoticeEntity> noticeEntities = noticeRepoisory.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
	    return noticeEntities.stream()
	        .map(entity -> NoticeDTO.builder()
	            .noticeId(entity.getNoticeId())
	            .title(entity.getTitle())
	            .content(entity.getContent())
	            .createdAt(entity.getCreatedAt())
	            .updatedAt(entity.getUpdatedAt())
	            .build())
	        .collect(Collectors.toList());
	}
	
//	@Override
//	public List<NoticeDTO> getLatestNotices() {
//	    List<NoticeEntity> noticeEntities = noticeRepoisory.findTop3ByOrderByCreatedAtDesc();
//	    return noticeEntities.stream()
//	        .map(entity -> NoticeDTO.builder()
//	            .noticeId(entity.getNoticeId())
//	            .title(entity.getTitle())
//	            .content(entity.getContent())
//	            .createdAt(entity.getCreatedAt())
//	            .updatedAt(entity.getUpdatedAt())
//	            .build())
//	        .collect(Collectors.toList());
//	}
	
}
