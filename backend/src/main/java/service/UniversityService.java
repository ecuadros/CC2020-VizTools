package service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dto.mapper.ModelMapper;
import dto.model.UniversityDto;
import exception.UniversityException.UniversityNotFoundException;
import exception.CountryException.CountryNullException;
import model.Country;
import model.University;
import repository.UniversityRepository;

@Service
@Transactional
public class UniversityService {

    @Autowired
    private UniversityRepository repository;

    @Autowired
    private CountryService countryService;

    public University findById(Long id) {
        Optional<University> itemOp = repository.findById(id);

        if (!itemOp.isPresent()) {
            throw new UniversityNotFoundException(id);
        }

        return itemOp.get();
    }

    public List<University> findAll() {
        List<University> items = new ArrayList<>();

        for (University item : repository.findAll()) {
            items.add(item);
        }

        return items;
    }

    public UniversityDto create(UniversityDto itemDto) {
        University item = new University();
        item.setName(itemDto.getName());
        item.setAcronym(itemDto.getAcronym());
        item.setUrl(itemDto.getUrl());

        if (itemDto.getCountryId() == null) {
            throw new CountryNullException();
        }
        
        Country country = countryService.findById(itemDto.getCountryId());
        item.setCountry(country);

        return ModelMapper.toUniversityDto(repository.save(item));
    }

    public UniversityDto read(Long id) {
        University item = findById(id);
        return ModelMapper.toUniversityDto(item);
    }

    public List<UniversityDto> readAll() {
        List<UniversityDto> items = new ArrayList<>();

        for (University item : repository.findAll()) {
            items.add(ModelMapper.toUniversityDto(item));
        }

        return items;
    }

    public List<UniversityDto> readByCountry(Long countryId) {
        List<UniversityDto> items = new ArrayList<>();

        for (University item : repository.findByCountryId(countryId)) {
            items.add(ModelMapper.toUniversityDto(item));
        }

        return items;
    }

    public UniversityDto update(UniversityDto newItem, Long id) {
        University item = findById(id);

        if (newItem.getName() != null) {
            item.setName(newItem.getName());
        }

        if (newItem.getAcronym() != null) {
            item.setAcronym(newItem.getAcronym());
        }

        if (newItem.getUrl() != null) {
            item.setUrl(newItem.getUrl());
        }

        if (newItem.getCountryId() != null) {
            Country country = countryService.findById(newItem.getCountryId());
            item.setCountry(country);
        }

        return ModelMapper.toUniversityDto(repository.save(item));
    }

    public void delete(Long id) {
        University item = findById(id);
        repository.delete(item);;
    }

}
