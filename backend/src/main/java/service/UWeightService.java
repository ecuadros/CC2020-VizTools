package service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dto.mapper.ModelMapper;
import dto.model.DKADto;
import dto.model.UWeightDto;
import exception.WeightException.WeightNotFoundException;
import model.*;
import repository.UWeightRepository;

@Service
@Transactional
public class UWeightService {

    @Autowired
    private UWeightRepository repository;

    @Autowired
    private DKAService dkaService;

    @Autowired
    private UProgramService iprogramService;

    public UWeight findById(Long id) {
        Optional<UWeight> itemOp = repository.findById(id);

        if (!itemOp.isPresent()) {
            throw new WeightNotFoundException(id);
        }

        return itemOp.get();
    }

    public List<UWeightDto> findAll() {
        List<UWeightDto> items = new ArrayList<>();

        for (UWeight item : repository.findAll()) {
            items.add(ModelMapper.toUWeightDto(item));
        }

        return items;
    }

    public List<UWeightDto> createTable(Long programId) {
        List<UWeightDto> items = new ArrayList<>();
        List<DKADto> dkas = dkaService.readAll();
        iprogramService.findById(programId);

        Optional<UWeight> weightOp;
        UWeightDto weightDto;

        for (DKADto dka : dkas) {
            weightOp = repository.findByDkaIdAndUprogramId(dka.getId(), programId);
            
            if (!weightOp.isPresent()) {
                weightDto = new UWeightDto();
                weightDto.setValue(0);
                weightDto.setProgramId(programId);
                weightDto.setDkaId(dka.getId());
                items.add(create(weightDto));
            } else {
                items.add(ModelMapper.toUWeightDto(weightOp.get()));
            }
        }

        return items;
    }

    public UWeightDto create(UWeightDto itemDto) {
        UWeight item = new UWeight();
        item.setValue(itemDto.getValue());

        DKA dka = dkaService.findById(itemDto.getDkaId());
        item.setDka(dka);
        
        UProgram program = iprogramService.findById(itemDto.getProgramId());
        item.setUprogram(program);

        return ModelMapper.toUWeightDto(repository.save(item));
    }

    public UWeightDto read(Long id) {
        UWeight item = findById(id);
        return ModelMapper.toUWeightDto(item);
    }

    public UWeightDto update(UWeightDto newItem, Long id) {
        UWeight item = findById(id);

        if (newItem.getValue() != null) {
            item.setValue(newItem.getValue());
        }

        return ModelMapper.toUWeightDto(repository.save(item));
    }

    public void delete(Long id) {
        UWeight item = findById(id);
        repository.delete(item);
    }

}
