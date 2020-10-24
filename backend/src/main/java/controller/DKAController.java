package controller;

import service.DKAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import dto.model.DKADto;

import java.util.List;

@RestController
@RequestMapping("/dka")
@CrossOrigin(origins = "*")
public class DKAController {

    @Autowired
    private DKAService service;

    @GetMapping("/")
    public List<DKADto> getAll() {
        return service.readAll();
    }

    @PostMapping(value = "/")
    public ResponseEntity<?> create(
            @RequestBody DKADto input){
        return new ResponseEntity<>(service.create(input), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> read(@PathVariable Long id) {
        return new ResponseEntity<>(service.read(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable Long id,
            @RequestBody DKADto input) {
        return new ResponseEntity<>(service.update(input, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
