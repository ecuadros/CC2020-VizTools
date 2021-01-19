package service;

import model.Role;
import model.RoleName;
import repository.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import exception.RoleException.RoleNotFoundException;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class RoleService {

    @Autowired
    private RoleRepository repository;
    
    public List<Role> findAll(){
        List<Role> items = new ArrayList<>();

        for (Role item :repository.findAll()) {
            items.add(item);
        }
        
        return items;
    }

    public Role findByName(RoleName roleName){
        return repository.findByName(roleName);
    }    

    public Role create(Role item){
        return repository.save(item);
    }

    public Role read(Long id){
        return repository.findById(id).orElseThrow(() -> new RoleNotFoundException(id));
    }

    public void delete(Long id){
        repository.delete(read(id));
    }

}
