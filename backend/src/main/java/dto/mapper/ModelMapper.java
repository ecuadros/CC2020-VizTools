package dto.mapper;

import dto.model.*;
import model.*;

public class ModelMapper {

    public static UserDto toUserDto(User item) {
        UserDto itemDto = new UserDto();
        itemDto.setId(item.getId());
        itemDto.setName(item.getName());
        itemDto.setLastName(item.getLastName());
        itemDto.setIsAdmin(false);
        
        itemDto.setEmail(item.getEmail());
        itemDto.setPassword(item.getPassword());

        for (Role role : item.getRoles()) {
            if (role.getName() == RoleName.ROLE_ADMIN) {
                itemDto.setIsAdmin(true);
            }
        }
        
        return itemDto;
    }

    public static AuthTokenDto toAuthTokenDto(User item, String token) {
        AuthTokenDto itemDto = new AuthTokenDto();
        itemDto.setId(item.getId());
        String fullName = item.getName() + ' ' + item.getLastName();
        itemDto.setName(fullName);
        itemDto.setToken(token);
        itemDto.setIsAdmin(false);

        for (Role role : item.getRoles()) {
            if (role.getName() == RoleName.ROLE_ADMIN) {
                itemDto.setIsAdmin(true);
            }
        }

        return itemDto;
    }

    public static ProgramDto toProgramDto(Program item) {
        ProgramDto itemDto = new ProgramDto();
        itemDto.setId(item.getId());
        itemDto.setName(item.getName());
        itemDto.setAcronym(item.getAcronym());
        return itemDto;
    }

    public static DKAGDto toDKAGDto(DKAG item) {
        DKAGDto itemDto = new DKAGDto();
        itemDto.setId(item.getId());
        itemDto.setName(item.getName());
        itemDto.setIndex(item.getIndex());
        return itemDto;
    }

    public static DKADto toDKADto(DKA item) {
        DKADto itemDto = new DKADto();
        itemDto.setId(item.getId());
        itemDto.setName(item.getName());
        itemDto.setIndex(item.getIndex());
        itemDto.setDkagId(item.getDkag().getId());
        itemDto.setDkagIndex(item.getDkag().getIndex());
        return itemDto;
    }

}
