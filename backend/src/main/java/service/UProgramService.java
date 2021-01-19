package service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dto.mapper.ModelMapper;
import dto.model.UProgramDto;
import exception.ProgramException.*;
import exception.UniversityException.UniversityNullException;
import model.UProgram;
import model.University;
import repository.UProgramRepository;

@Service
@Transactional
public class UProgramService {

    @Autowired
    private UProgramRepository repository;

    @Autowired
    private UniversityService institutionService;

    public UProgram findById(Long id) {
        Optional<UProgram> itemOp = repository.findById(id);

        if (!itemOp.isPresent()) {
            throw new ProgramNotFoundException(id);
        }

        return itemOp.get();
    }

    public List<UProgram> findAll() {
        List<UProgram> items = new ArrayList<>();

        for (UProgram item : repository.findAll()) {
            items.add(item);
        }

        return items;
    }

    public UProgramDto create(UProgramDto itemDto) {
        UProgram item = new UProgram();
        item.setName(itemDto.getName());
        item.setAcronym(itemDto.getAcronym());
        item.setNativeName(itemDto.getNativeName());
        
        if (itemDto.getUniversityId() == null) {
            throw new UniversityNullException();
        }

        University institution = institutionService.findById(itemDto.getUniversityId());
        item.setUniversity(institution);

        if (itemDto.getProgramId() == null) {
            throw new ProgramNullException();
        }

        item.setProgramId(itemDto.getProgramId());
        
        return ModelMapper.toUProgramDto(repository.save(item));
    }

    public UProgramDto read(Long id) {
        UProgram item = findById(id);
        return ModelMapper.toUProgramDto(item);
    }

    public List<UProgramDto> readAll() {
        List<UProgramDto> items = new ArrayList<>();

        for (UProgram item : repository.findAll()) {
            items.add(ModelMapper.toUProgramDto(item));
        }

        return items;
    }

    public List<UProgramDto> readByUniversity(Long institutionId) {
        List<UProgramDto> items = new ArrayList<>();

        for (UProgram item : repository.findByUniversityId(institutionId)) {
            items.add(ModelMapper.toUProgramDto(item));
        }

        return items;
    }

    public UProgramDto update(UProgramDto newItem, Long id) {
        UProgram item = findById(id);

        if (newItem.getName() != null) {
            item.setName(newItem.getName());
        }

        if (newItem.getAcronym() != null) {
            item.setAcronym(newItem.getAcronym());
        }

        if (newItem.getNativeName() != null) {
            item.setNativeName(newItem.getNativeName());
        }

        if (newItem.getUniversityId() != null) {
            University institution = institutionService.findById(newItem.getUniversityId());
            item.setUniversity(institution);
        }

        return ModelMapper.toUProgramDto(repository.save(item));
    }

    public void delete(Long id) {
        UProgram item = findById(id);
        repository.delete(item);
    }

}
