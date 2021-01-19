package exception;

import exception.RoleException.*;
import exception.UserException.*;
import exception.DKAGException.*;
import exception.DKAException.*;
import exception.ProgramException.*;
import exception.WeightException.*;
import exception.UniversityException.*;
import exception.CountryException.*;
import exception.TokenException.*;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler  {

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(UserNotFoundException.class)
    public final String UserNotFoundHandler(UserNotFoundException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(UserInfoNotFoundException.class)
    public final String UserInfoNotFoundHandler(UserInfoNotFoundException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(RoleNotFoundException.class)
    public final String RoleNotFoundHandler(RoleNotFoundException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UserConflictException.class)
    public final String UserConflictHandler(UserConflictException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UserUnauthorizedException.class)
    public final String UserUnauthorizedHandler(UserUnauthorizedException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UserNotActivatedException.class)
    public final String UserNotActivatedHandler(UserNotActivatedException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ProgramNotFoundException.class)
    public final String ProgramNotFoundHandler(ProgramNotFoundException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    @ExceptionHandler(ProgramNullException.class)
    public final String ProgramNullHandler(ProgramNullException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(DKAGNotFoundException.class)
    public final String DKAGNotFoundHandler(DKAGNotFoundException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(DKANotFoundException.class)
    public final String DKANotFoundHandler(DKANotFoundException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(WeightNotFoundException.class)
    public final String WeightNotFoundHandler(WeightNotFoundException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(UniversityNotFoundException.class)
    public final String UniversityNotFoundHandler(UniversityNotFoundException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UniversityConflictException.class)
    public final String UniversityConflictHandler(UniversityConflictException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    @ExceptionHandler(UniversityNullException.class)
    public final String UniversityNullHandler(UniversityNullException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    @ExceptionHandler(CountryNullException.class)
    public final String CountryNullHandler(CountryNullException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(TokenNotFoundException.class)
    public final String TokenNotFoundHandler(TokenNotFoundException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ExpiredTokenExeception.class)
    public final String ExpiredTokenHandler(ExpiredTokenExeception ex) {
        return ex.getMessage();
    }

}
