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

    public List<WeightDto> findAll() {
        List<WeightDto> items = new ArrayList<>();

        for (Weight item : repository.findAll()) {
            items.add(ModelMapper.toWeightDto(item));
        }

        return items;
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

    public WeightDto update(WeightDto newItem, Long id) {
        Weight item = findById(id);

        if (newItem.getMin() != null) {
            item.setMin(newItem.getMin());
        }

        if (newItem.getMax() != null) {
            item.setMax(newItem.getMax());
        }

        return ModelMapper.toWeightDto(repository.save(item));
    }

    public void delete(Long id) {
        Weight item = findById(id);
        repository.delete(item);;
    }

}
