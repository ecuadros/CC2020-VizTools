package controller;

import service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import dto.model.CountryDto;

import java.util.List;

@RestController
@RequestMapping("/country")
@CrossOrigin(origins = "*")
public class CountryController {

    @Autowired
    private CountryService service;

    @GetMapping("/")
    public List<CountryDto> getAll() {
        return service.readAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> read(@PathVariable Long id) {
        return new ResponseEntity<>(service.read(id), HttpStatus.OK);
    }

}
