package service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dto.mapper.ModelMapper;
import dto.model.DKADto;
import exception.DKAException.DKANotFoundException;
import model.DKA;
import model.DKAG;
import repository.DKARepository;

@Service
@Transactional
public class DKAService {

    @Autowired
    private DKARepository repository;

    @Autowired
    private DKAGService dkagService;

    public DKA findById(Long id) {
        Optional<DKA> itemOp = repository.findById(id);

        if (!itemOp.isPresent()) {
            throw new DKANotFoundException(id);
        }

        return itemOp.get();
    }

    public List<DKA> findAll() {
        List<DKA> items = new ArrayList<>();

        for (DKA item : repository.findAll()) {
            items.add(item);
        }

        return items;
    }

    public DKADto create(DKADto itemDto) {
        DKA item = new DKA();
        item.setName(itemDto.getName());
        item.setIndex(itemDto.getIndex());
        
        DKAG dkag = dkagService.findById(itemDto.getDkagId());

        item.setDkag(dkag);

        return ModelMapper.toDKADto(repository.save(item));
    }

    public DKADto read(Long id) {
        DKA item = findById(id);
        return ModelMapper.toDKADto(item);
    }

    public List<DKADto> readAll() {
        List<DKADto> items = new ArrayList<>();

        for (DKA item : repository.findAll()) {
            items.add(ModelMapper.toDKADto(item));
        }

        return items;
    }

    public DKADto update(DKADto newItem, Long id) {
        DKA item = findById(id);

        if (newItem.getName() != null) {
            item.setName(newItem.getName());
        }

        if (newItem.getIndex() != null) {
            item.setIndex(newItem.getIndex());
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
