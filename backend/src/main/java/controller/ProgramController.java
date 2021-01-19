package controller;

import service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
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

    @PostMapping(value = "/")
    public ResponseEntity<?> create(
            @RequestBody ProgramDto input){
        return new ResponseEntity<>(service.create(input), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> read(@PathVariable Long id) {
        return new ResponseEntity<>(service.read(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable Long id,
            @RequestBody ProgramDto input) {
        return new ResponseEntity<>(service.update(id, input), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
