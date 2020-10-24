package controller;

import service.WeightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import dto.model.WeightDto;

@RestController
@RequestMapping("/chart")
@CrossOrigin(origins = "*")
public class ChartController {

    @Autowired
    private WeightService service;

    @GetMapping("/program/{programId}")
    public ResponseEntity<?> readByProgram(@PathVariable Long programId) {
        return new ResponseEntity<>(service.createChart(programId), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable Long id,
            @RequestBody WeightDto input) {
        return new ResponseEntity<>(service.update(input, id), HttpStatus.OK);
    }

}
