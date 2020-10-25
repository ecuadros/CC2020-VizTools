package controller;

import service.UniversityService;
import service.UserService;
import security.JwtTokenUtil;
import model.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import dto.mapper.ModelMapper;
import dto.model.AuthTokenDto;
import dto.model.LoginDto;
import dto.model.RegisterDto;
import dto.model.UniversityDto;
import dto.model.UserDto;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private UniversityService universityService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginReq) throws AuthenticationException {

        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginReq.getEmail(), loginReq.getPassword()));

        return new ResponseEntity<>(generateToken(loginReq.getEmail()), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerReq) {

        UserDto userDto = registerReq.getUser();
        UniversityDto universityDto = registerReq.getUniversity();
        
        if (!registerReq.getIsUniversityRegister() && universityDto != null) {
            universityDto = universityService.create(universityDto);
            userDto.setUniversityId(universityDto.getId());
        }

        userDto.setIsAdmin(false);
        userDto = userService.create(userDto);
        
        return new ResponseEntity<>(generateToken(userDto.getEmail()), HttpStatus.OK);
    }

    public AuthTokenDto generateToken(String email) {
        final User user = userService.findOneByEmail(email);
        final String token = jwtTokenUtil.generateToken(user);
        return ModelMapper.toAuthTokenDto(user, token);
    }

}
