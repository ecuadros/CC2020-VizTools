package service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dto.mapper.ModelMapper;
import dto.model.ProgramDto;
import exception.ProgramException.ProgramNotFoundException;
import model.Program;
import repository.ProgramRepository;

@Service
@Transactional
public class ProgramService {

    @Autowired
    private ProgramRepository repository;

    public Program findById(Long id) {
        Optional<Program> itemOp = repository.findById(id);

        if (!itemOp.isPresent()) {
            throw new ProgramNotFoundException(id);
        }

        return itemOp.get();
    }

    public List<Program> findAll() {
        List<Program> items = new ArrayList<>();

        for (Program item : repository.findAll()) {
            items.add(item);
        }

        return items;
    }

    public ProgramDto create(ProgramDto itemDto) {
        Program item = new Program();
        item.setName(itemDto.getName());
        item.setAcronym(itemDto.getAcronym());
        return ModelMapper.toProgramDto(repository.save(item));
    }

    public ProgramDto read(Long id) {
        Program item = findById(id);
        return ModelMapper.toProgramDto(item);
    }

    public List<ProgramDto> readAll() {
        List<ProgramDto> items = new ArrayList<>();

        for (Program item : repository.findAll()) {
            items.add(ModelMapper.toProgramDto(item));
        }

        return items;
    }

    public ProgramDto update(Long id, ProgramDto newItem) {
        Program item = findById(id);

        if (newItem.getName() != null) {
            item.setName(newItem.getName());
        }

        if (newItem.getAcronym() != null) {
            item.setAcronym(newItem.getAcronym());
        }

        return ModelMapper.toProgramDto(repository.save(item));
    }

    public void delete(Long id) {
        Program item = findById(id);
        repository.delete(item);
    }

}
