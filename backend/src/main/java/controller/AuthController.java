package controller;

import service.*;
import security.JwtTokenUtil;
import model.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import dto.mapper.ModelMapper;
import dto.model.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private UniversityService universityService;

    @Autowired
    private VerificationTokenService verificationTokenService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginReq) {
        userService.authenticateUser(loginReq.getEmail(), loginReq.getPassword());
        return new ResponseEntity<>(generateToken(loginReq.getEmail()), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerReq) {
        UserDto userDto = registerReq.getUser();
        UserInfoDto userInfoDto = registerReq.getUserInfo();
        UniversityDto universityDto = registerReq.getUniversity();

        if (universityDto.getId() == -1) {
            universityDto = universityService.create(universityDto);
        } else {
            universityDto = universityService.update(universityDto, universityDto.getId());
        }

        userInfoDto = userInfoService.create(userInfoDto);

        userDto.setUniversityId(universityDto.getId());
        userDto.setIsAdmin(false);
        userDto.setUserInfoId(userInfoDto.getId());
        userDto = userService.create(userDto);

        VerificationToken verificationToken = verificationTokenService.create(userDto.getId());
        emailService.sendComplexMail(userDto.getFullName(), userDto.getEmail(), verificationToken.getToken());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/check/{email}")
    public ResponseEntity<?> isEmailRegistered(@PathVariable String email) {
        return new ResponseEntity<>(userService.isEmailRegistered(email), HttpStatus.OK);
    }

    public AuthTokenDto generateToken(String email) {
        final User user = userService.findByEmail(email);
        final String token = jwtTokenUtil.generateToken(user);
        return ModelMapper.toAuthTokenDto(user, token);
    }

}
