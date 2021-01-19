package controller;

import service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import dto.model.ProgramDto;

import java.util.List;

@RestController
@RequestMapping("/program")
@CrossOrigin(origins = "*")
public class ProgramController {

    @Autowired
    private ProgramService service;

    @GetMapping("/")
    public List<ProgramDto> getAll() {
        return service.readAll();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/")
    public ResponseEntity<?> create(
            @RequestBody ProgramDto input){
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
            @RequestBody ProgramDto input) {
        return new ResponseEntity<>(service.update(id, input), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
