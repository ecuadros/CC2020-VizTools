package service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dto.mapper.ModelMapper;
import dto.model.DKAGDto;
import exception.DKAGException.DKAGNotFoundException;
import model.DKAG;
import repository.DKAGRepository;

@Service
@Transactional
public class DKAGService {

    @Autowired
    private DKAGRepository repository;

    public DKAG findById(Long id) {
        Optional<DKAG> itemOp = repository.findById(id);

        if (!itemOp.isPresent()) {
            throw new DKAGNotFoundException(id);
        }

        return itemOp.get();
    }

    public List<DKAG> findAll() {
        List<DKAG> items = new ArrayList<>();

        for (DKAG item : repository.findAll()) {
            items.add(item);
        }
        
        return items;
    }

    public DKAGDto create(DKAGDto itemDto) {
        DKAG item = new DKAG();
        item.setName(itemDto.getName());
        item.setIndex(repository.count() + 1);
        return ModelMapper.toDKAGDto(repository.save(item));
    }

    public DKAGDto read(Long id) {
        DKAG item = findById(id);
        return ModelMapper.toDKAGDto(item);
    }

    public List<DKAGDto> readAll() {
        List<DKAGDto> items = new ArrayList<>();

        for (DKAG item : repository.findAll()) {
            items.add(ModelMapper.toDKAGDto(item));
        }
        
        return items;
    }

    public DKAGDto update(DKAGDto newItem, Long id) {
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
