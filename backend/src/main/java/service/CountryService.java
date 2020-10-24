package service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dto.mapper.ModelMapper;
import dto.model.CountryDto;
import exception.CountryException.CountryNotFoundException;
import model.Country;
import repository.CountryRepository;

@Service
@Transactional
public class CountryService {

    @Autowired
    private CountryRepository repository;

    public Country findById(Long id) {
        Optional<Country> itemOp = repository.findById(id);

        if (!itemOp.isPresent()) {
            throw new CountryNotFoundException(id);
        }

        return itemOp.get();
    }

    public List<Country> findAll() {
        List<Country> items = new ArrayList<>();

        for (Country item : repository.findAll()) {
            items.add(item);
        }

        return items;
    }

    public CountryDto create(CountryDto itemDto) {
        Country item = new Country();
        item.setNameEn(itemDto.getName());
        item.setIso2(itemDto.getAcronym());
        return ModelMapper.toCountryDto(repository.save(item));
    }

    public CountryDto read(Long id) {
        Country item = findById(id);
        return ModelMapper.toCountryDto(item);
    }

    public List<CountryDto> readAll() {
        List<CountryDto> items = new ArrayList<>();

        for (Country item : repository.findAll()) {
            items.add(ModelMapper.toCountryDto(item));
        }

        return items;
    }

    public CountryDto update(CountryDto newItem, Long id) {
        Country item = findById(id);

        if (newItem.getName() != null) {
            item.setNameEn(newItem.getName());
        }

        if (newItem.getAcronym() != null) {
            item.setIso2(newItem.getAcronym());
        }

        return ModelMapper.toCountryDto(repository.save(item));
    }

    public void delete(Long id) {
        Country item = findById(id);
        repository.delete(item);;
    }

}
