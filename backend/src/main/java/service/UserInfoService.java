package service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import dto.mapper.ModelMapper;
import dto.model.UserInfoDto;
import exception.UserException.*;
import model.*;
import repository.UserInfoRepository;

@Service
@Transactional
public class UserInfoService {

    @Autowired
    private UserInfoRepository repository;

    public UserInfo findById(Long id) {
        Optional<UserInfo> itemOp = repository.findById(id);

        if (!itemOp.isPresent()) {
            throw new UserInfoNotFoundException(id);
        }

        return itemOp.get();
    }

    public UserInfo findOneByUser(Long userId){
        Optional<UserInfo> itemOp = repository.findByUserId(userId);

        if (!itemOp.isPresent()) {
            throw new UserInfoNotFoundException(-1L);
        }

        return itemOp.get();
    }

    public UserInfoDto create(UserInfoDto itemDto) {
        UserInfo item = new UserInfo();
        item.setCity(itemDto.getCity());
        item.setOccupation(itemDto.getOccupation());
        item.setPhone(itemDto.getPhone());
        item.setState(itemDto.getState());
        item.setTelegram(itemDto.getTelegram());
        item.setWhatsApp(itemDto.getWhatsApp());
        item.setZipCode(itemDto.getState());

        if (itemDto.getCountryId() == null) {
            throw new CountryNullException();
        }
        
        Country country = countryService.findById(itemDto.getCountryId());
        item.setCountry(country);

        return ModelMapper.toUserInfoDto(repository.save(item));
    }

    public UserInfoDto read(Long id){
        UserInfo item = findById(id);
        return ModelMapper.toUserInfoDto(item);
    }

    public UserInfoDto update(UserInfoDto newItem, Long id) {
        UserInfo item = findById(id);

        // TODO: In progress

        return ModelMapper.toUserInfoDto(repository.save(item));
    }

    public void delete(Long id){
        UserInfo item = findById(id);
        repository.delete(item);
    }

}