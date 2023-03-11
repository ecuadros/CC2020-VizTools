package org.acm.viztools.service.discipline;

import java.util.*;

import org.acm.viztools.dto.ModelMapper;
import org.acm.viztools.dto.discipline.DKADto;
import org.acm.viztools.model.discipline.DKA;
import org.acm.viztools.model.discipline.DKAG;
import org.acm.viztools.repository.discipline.DKARepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DKAService {

	private final DKARepository repository;

	private final DKAGService dkagService;

	public List<DKA> findAll() {
		return repository.findAll();
	}

	public DKA findById(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new RuntimeException("DKA not found"));
	}

	public DKADto create(DKADto itemDto) {
		DKAG dkag = dkagService.findById(itemDto.getDkagId());

		DKA item = DKA.builder()
				.name(itemDto.getName())
				.index(repository.count() + 1)
				.dkag(dkag)
				.build();

		return ModelMapper.toDKADto(repository.save(item));
	}

	public List<DKADto> read() {
		return repository.findAll().stream().map(ModelMapper::toDKADto).toList();
	}

	public DKADto readById(Long id) {
		return ModelMapper.toDKADto(findById(id));
	}

	public DKADto update(Long id, DKADto newItem) {
		DKA item = findById(id);

		if (newItem.getName() != null) {
			item.setName(newItem.getName());
		}

		if (newItem.getIndex() != null) {
			item.setIndex(newItem.getIndex());
		}

		if (newItem.getDescription() != null) {
			item.setDescription(newItem.getDescription());
		}

		if (newItem.getDkagId() != null) {
			DKAG dkag = dkagService.findById(newItem.getDkagId());
			item.setDkag(dkag);
		}

		return ModelMapper.toDKADto(repository.save(item));
	}

	public void delete(Long id) {
		DKA item = findById(id);
		repository.delete(item);
	}

}
