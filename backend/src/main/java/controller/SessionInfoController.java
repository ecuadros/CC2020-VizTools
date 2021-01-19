package controller;

import service.AuthService;
import service.ProgramService;
import service.SessionInfoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import model.SessionInfo;
import model.User;

@RestController
@RequestMapping("/session")
@CrossOrigin(origins = "*")
public class SessionInfoController {

    @Autowired
    private SessionInfoService service;

    @Autowired
    private AuthService authService;

    @Autowired
    private ProgramService programService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/selected-program/")
    public ResponseEntity<?> read() {
        User user = authService.getSessionUser();
        SessionInfo sessionInfo = service.findByUser(user.getId());
        return new ResponseEntity<>(sessionInfo.getSelectedProgram(), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/selected-program/{programId}")
    public ResponseEntity<?> update(@PathVariable Long programId) {
        User user = authService.getSessionUser();
        SessionInfo sessionInfo = service.findByUser(user.getId());
        sessionInfo.setSelectedProgram(programService.read(programId).getId());
        service.save(sessionInfo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
