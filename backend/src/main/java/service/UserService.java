package service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
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
    private UserInfoService userInfoService;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public User findById(Long id) {
        Optional<User> itemOp = repository.findById(id);

        if (!itemOp.isPresent()) {
            throw new UserNotFoundException(id);
        }

        return itemOp.get();
    }

    public User findByEmail(String email){
        Optional<User> itemOp = repository.findByEmail(email);

        if (!itemOp.isPresent()) {
            throw new UserNotFoundException(email);
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

    public Boolean isEmailRegistered(String email) {
        Optional<User> itemOp = repository.findByEmail(email);

        if (itemOp.isPresent()) {
            throw new UserConflictException(email);
        }

        return true;
    }

    public void authenticateUser(String email, String password) {
        try {
            authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (AuthenticationException e) {
            throw new UserUnauthorizedException();
        }

        User user = findByEmail(email);
        
        if (!user.getEnabled()) {
            throw new UserNotActivatedException(email);    
        }
    }

    public Boolean activateUser(Long id) {
        User item = findById(id);
        item.setEnabled(true);
        return repository.save(item).getEnabled();
    }

    public UserDto create(UserDto itemDto) {
        User item = new User();
        item.setFirstName(itemDto.getFirstName());
        item.setLastName(itemDto.getLastName());
        item.setEnabled(false);
        
        isEmailRegistered(itemDto.getEmail());
        
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

        if (itemDto.getUserInfoId() != null) {
            UserInfo userInfo = userInfoService.findById(itemDto.getUserInfoId());
            item.setUserInfo(userInfo);
        }

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

    public UserDto update(Long id, UserDto newItem) {
        User item = findById(id);

        if (newItem.getFirstName() != null) {
            item.setFirstName(newItem.getFirstName());
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
