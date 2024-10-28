package com.sulomon.web.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.sulomon.web.dto.NoticeDTO;
import com.sulomon.web.entity.NoticeEntity;

import com.sulomon.web.repository.NoticeRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class NoticeServiceImpl implements NoticeService {

	private final NoticeRepository noticeRepository;

	@Override
	public void noticeWrite(NoticeDTO noticeDTO) {
		
		// DB에 공지사항을 등록하는 코드 작성
		NoticeEntity noticeEntity = NoticeEntity.builder()
//							.adminNum(null)
				.title(noticeDTO.getTitle())
				.content(noticeDTO.getContent())
				.build();
		noticeRepository.save(noticeEntity);
	}

	@Override
	public List<NoticeDTO> getNoticeList() {
		List<NoticeEntity> noticeEntities = noticeRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
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

	@Override
	public NoticeDTO getNotice(Integer id) {
		// 특정 ID로 공지사항 조회
		NoticeEntity noticeEntity = noticeRepository.findByNoticeId(id)
				.orElseThrow(() -> new EntityNotFoundException("해당 공지사항이 없습니다."));

		return NoticeDTO.builder()
				.noticeId(noticeEntity.getNoticeId())
				.title(noticeEntity.getTitle())
				.content(noticeEntity.getContent())
				.createdAt(noticeEntity.getCreatedAt())
				.updatedAt(noticeEntity.getUpdatedAt())
				.build();
	}

	// 공지사항 삭제
	@Override
	public void deleteNotice(Integer id) {
		NoticeEntity noticeEntity = noticeRepository.findByNoticeId(id)
				.orElseThrow(() -> new EntityNotFoundException("해당 notice가 없습니다."));
		noticeRepository.delete(noticeEntity);
	}

}