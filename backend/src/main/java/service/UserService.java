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
import dto.model.UserDto;
import exception.UserException.*;
import exception.UniversityException.*;
import model.*;
import repository.RoleRepository;
import repository.UserRepository;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UniversityService universityService;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    public User findById(Long id) {
        Optional<User> itemOp = repository.findById(id);

        if (!itemOp.isPresent()) {
            throw new UserNotFoundException(id);
        }

        return itemOp.get();
    }

    public User findOneByEmail(String email){
        Optional<User> itemOp = repository.findByEmail(email);

        if (!itemOp.isPresent()) {
            throw new UserNotFoundException(-1L);
        }

        return itemOp.get();
    }

    public List<User> findAll(){
        List<User> items = new ArrayList<>();

        for (User item :repository.findAll()) {
            items.add(item);
        }

        return items;
    }

    public UserDto create(UserDto itemDto) {
        User item = new User();
        item.setName(itemDto.getName());
        item.setLastName(itemDto.getLastName());
        item.setOccupation(itemDto.getOccupation());
        
        Optional<User> itemOp = repository.findByEmail(itemDto.getEmail());

        if (itemOp.isPresent()) {
            throw new UserConflictException(itemDto.getEmail());
        }
        
        item.setEmail(itemDto.getEmail());
        item.setPassword(bcryptEncoder.encode(itemDto.getPassword()));

        Role userRole;

        if (itemDto.getIsAdmin()) {
            userRole = roleRepository.findByName(RoleName.ROLE_ADMIN);
        } else {
            userRole = roleRepository.findByName(RoleName.ROLE_USER);
        }

        item.setRoles(new HashSet<>(Arrays.asList(userRole)));

        if (itemDto.getUniversityId() == null) {
            throw new UniversityNullException();
        }
        
        University university = universityService.findById(itemDto.getUniversityId());
        item.setUniversity(university);

        return ModelMapper.toUserDto(repository.save(item));
    }

    public UserDto read(Long id){
        User item = findById(id);
        return ModelMapper.toUserDto(item);
    }

    public List<UserDto> readAll(){
        List<UserDto> items = new ArrayList<>();

        for (User item :repository.findAll()) {
            items.add(ModelMapper.toUserDto(item));
        }

        return items;
    }

    public UserDto update(UserDto newItem, Long id) {
        User item = findById(id);

        if (newItem.getName() != null) {
            item.setName(newItem.getName());
        }

        if (newItem.getLastName() != null) {
            item.setLastName(newItem.getLastName());
        }

        return ModelMapper.toUserDto(repository.save(item));
    }

    public void delete(Long id){
        User item = findById(id);
        repository.delete(item);
    }

}
