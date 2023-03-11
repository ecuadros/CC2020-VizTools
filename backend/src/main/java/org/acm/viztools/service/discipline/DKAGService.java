package org.acm.viztools.service.discipline;

import java.util.*;

import org.acm.viztools.dto.ModelMapper;
import org.acm.viztools.dto.discipline.DKAGDto;
import org.acm.viztools.model.discipline.DKAG;
import org.acm.viztools.repository.discipline.DKAGRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DKAGService {

	private final DKAGRepository repository;

	public DKAG findById(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new RuntimeException("DKAG not found"));
	}

	public DKAGDto create(DKAGDto itemDto) {
		DKAG item = DKAG.builder()
				.name(itemDto.getName())
				.index(repository.count() + 1)
				.build();

		return ModelMapper.toDKAGDto(repository.save(item));
	}

	public List<DKAGDto> read() {
		return repository.findAll().stream().map(ModelMapper::toDKAGDto).toList();
	}

	public DKAGDto readById(Long id) {
		return ModelMapper.toDKAGDto(findById(id));
	}

	public DKAGDto update(Long id, DKAGDto newItem) {
		DKAG item = findById(id);

		if (newItem.getName() != null) {
			item.setName(newItem.getName());
		}

		if (newItem.getIndex() != null) {
			item.setIndex(newItem.getIndex());
		}

		return ModelMapper.toDKAGDto(repository.save(item));
	}

	public void delete(Long id) {
		DKAG item = findById(id);
		repository.delete(item);
	}

}
