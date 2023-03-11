package org.acm.viztools.service.user;

import java.util.*;

import org.acm.viztools.dto.ModelMapper;
import org.acm.viztools.dto.user.UserDto;
import org.acm.viztools.model.user.*;
import org.acm.viztools.repository.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

	private final UserRepository repository;

	public User findById(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new RuntimeException("User not found"));
	}

	public User findByEmail(String email) {
		return repository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("User not found"));
	}

	public boolean isEmailRegistered(String email) {
		repository.findByEmail(email).ifPresent(item -> {
			throw new RuntimeException("User has already been registered");
		});
		return true;
	}

	public boolean activateUser(Long id) {
		User item = findById(id);
		item.setEnabled(true);
		return repository.save(item).isEnabled();
	}

	public List<UserDto> read() {
		return repository.findAll().stream().map(ModelMapper::toUserDto).toList();
	}

	public UserDto readById(Long id) {
		return ModelMapper.toUserDto(findById(id));
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

	public void delete(Long id) {
		User item = findById(id);
		repository.delete(item);
	}

}
