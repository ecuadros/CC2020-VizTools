package controller;

import service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import dto.model.UniversityDto;

import java.util.List;

@RestController
@RequestMapping("/university")
@CrossOrigin(origins = "*")
public class UniversityController {

    @Autowired
    private UniversityService service;

    @GetMapping("/")
    public List<UniversityDto> getAll() {
        return service.readAll();
    }

    @PostMapping(value = "/")
    public ResponseEntity<?> create(
            @RequestBody UniversityDto input){
        return new ResponseEntity<>(service.create(input), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> read(@PathVariable Long id) {
        return new ResponseEntity<>(service.read(id), HttpStatus.OK);
    }

    @GetMapping("/country/{countryId}")
    public ResponseEntity<?> readByCountry(@PathVariable Long countryId) {
        return new ResponseEntity<>(service.readByCountry(countryId), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable Long id,
            @RequestBody UniversityDto input) {
        return new ResponseEntity<>(service.update(input, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
