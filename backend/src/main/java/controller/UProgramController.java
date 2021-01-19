package controller;

import service.UProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import dto.model.UProgramDto;

import java.util.List;

@RestController
@RequestMapping("/uprogram")
@CrossOrigin(origins = "*")
public class UProgramController {

    @Autowired
    private UProgramService service;

    @GetMapping("/")
    public List<UProgramDto> getAll() {
        return service.readAll();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping("/")
    public ResponseEntity<?> create(
            @RequestBody UProgramDto input){
        return new ResponseEntity<>(service.create(input), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> read(@PathVariable Long id) {
        return new ResponseEntity<>(service.read(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable Long id,
            @RequestBody UProgramDto input) {
        return new ResponseEntity<>(service.update(input, id), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/university/{universityId}")
    public ResponseEntity<?> readByUniversity(@PathVariable Long universityId) {
        return new ResponseEntity<>(service.readByUniversity(universityId), HttpStatus.OK);
    }

}
