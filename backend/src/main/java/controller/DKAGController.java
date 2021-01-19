package controller;

import service.DKAGService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import dto.model.DKAGDto;

import java.util.List;

@RestController
@RequestMapping("/dkag")
@CrossOrigin(origins = "*")
public class DKAGController {

    @Autowired
    private DKAGService service;

    @GetMapping("/")
    public List<DKAGDto> getAll() {
        return service.readAll();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/")
    public ResponseEntity<?> create(
            @RequestBody DKAGDto input){
        return new ResponseEntity<>(service.create(input), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> read(@PathVariable Long id) {
        return new ResponseEntity<>(service.read(id), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable Long id,
            @RequestBody DKAGDto input) {
        return new ResponseEntity<>(service.update(id, input), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
