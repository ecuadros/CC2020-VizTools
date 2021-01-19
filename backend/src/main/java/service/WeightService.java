package service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dto.mapper.ModelMapper;
import dto.model.DKADto;
import dto.model.WeightDto;
import exception.WeightException.WeightNotFoundException;
import model.*;
import repository.WeightRepository;

@Service
@Transactional
public class WeightService {

    @Autowired
    private WeightRepository repository;

    @Autowired
    private DKAService dkaService;

    @Autowired
    private ProgramService programService;

    public Weight findById(Long id) {
        Optional<Weight> itemOp = repository.findById(id);

        if (!itemOp.isPresent()) {
            throw new WeightNotFoundException(id);
        }

        return itemOp.get();
    }

    public Weight findByDkaAndProgram(Long dkaId, Long programId) {
        Optional<Weight> itemOp;
        
        itemOp = repository.findByDkaIdAndProgramId(dkaId, programId);

        if (!itemOp.isPresent()) {
            throw new WeightNotFoundException(dkaId, programId);
        }

        return itemOp.get();
    }

    public List<WeightDto> createChart(Long programId) {
        List<WeightDto> items = new ArrayList<>();
        List<DKADto> dkas = dkaService.readAll();
        programService.findById(programId);

        Optional<Weight> weightOp;
        WeightDto weightDto;

        for (DKADto dka : dkas) {
            weightOp = repository.findByDkaIdAndProgramId(dka.getId(), programId);
            
            if (!weightOp.isPresent()) {
                weightDto = new WeightDto();
                weightDto.setMin(0);
                weightDto.setMax(0);
                weightDto.setProgramId(programId);
                weightDto.setDkaId(dka.getId());
                items.add(create(weightDto));
            } else {
                items.add(ModelMapper.toWeightDto(weightOp.get()));
            }
        }

        return items;
    }

    public WeightDto create(WeightDto itemDto) {
        Weight item = new Weight();
        item.setMin(itemDto.getMin());
        item.setMax(itemDto.getMax());

        DKA dka = dkaService.findById(itemDto.getDkaId());
        item.setDka(dka);
        
        Program program = programService.findById(itemDto.getProgramId());
        item.setProgram(program);

        return ModelMapper.toWeightDto(repository.save(item));
    }

    public WeightDto read(Long id) {
        Weight item = findById(id);
        return ModelMapper.toWeightDto(item);
    }

    public WeightDto update(Long id, WeightDto newItem) {
        Weight item = findById(id);

        if (newItem.getMin() != null) {
            item.setMin(newItem.getMin());
        }

        if (newItem.getMax() != null) {
            item.setMax(newItem.getMax());
        }

        return ModelMapper.toWeightDto(repository.save(item));
    }

    public WeightDto update(Long dkaId, Long programId, WeightDto newItem) {
        Weight item = findByDkaAndProgram(dkaId, programId);
        return update(item.getId(), newItem);
    }

    public void delete(Long id) {
        Weight item = findById(id);
        item.setDka(null);
        item.setProgram(null);
        repository.save(item);
        repository.delete(item);
    }

}
