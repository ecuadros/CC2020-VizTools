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
        
        if (item.getUniversity() != null) {
            itemDto.setUniversityId(item.getUniversity().getId());
        }

        if (item.getUserInfo() != null) {
            itemDto.setUserInfoId(item.getUserInfo().getId());
        }
        
        return itemDto;
    }

    public static UserInfoDto toUserInfoDto(UserInfo item) {
        UserInfoDto itemDto = new UserInfoDto();
        itemDto.setId(item.getId());
        itemDto.setOccupation(item.getOccupation());
        itemDto.setPhone(item.getPhone());
        
        itemDto.setCity(item.getCity());
        itemDto.setState(item.getState());
        itemDto.setZipCode(item.getZipCode());

        itemDto.setTelegram(item.getTelegram());
        itemDto.setWhatsApp(item.getWhatsApp());
        
        if (item.getUser() != null) {
            itemDto.setUserId(item.getUser().getId());
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

        University university = item.getUniversity();

        if (university != null) {
            itemDto.setUniversityId(university.getId());
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

    public static WeightDto toWeightDto(Weight item) {
        WeightDto itemDto = new WeightDto();
        itemDto.setId(item.getId());
        itemDto.setMin(item.getMin());
        itemDto.setMax(item.getMax());
        itemDto.setProgramId(item.getProgram().getId());
        itemDto.setProgramTitle(item.getProgram().getAcronym());

        DKA dka = item.getDka();
        DKAG dkag = dka.getDkag();

        itemDto.setDkaId(dka.getId());
        itemDto.setDkagId(dkag.getId());
        
        itemDto.setDkaTitle(dka.getName());
        itemDto.setDkagTitle(dkag.getName());

        itemDto.setDkaIndex(dka.getIndex());
        itemDto.setDkagIndex(dkag.getIndex());

        return itemDto;
    }

    public static CountryDto toCountryDto(Country item) {
        CountryDto itemDto = new CountryDto();
        itemDto.setId(item.getId());
        itemDto.setName(item.getNameEn());
        itemDto.setAcronym(item.getIso2());
        return itemDto;
    }

    public static UniversityDto toUniversityDto(University item) {
        UniversityDto itemDto = new UniversityDto();
        itemDto.setId(item.getId());
        itemDto.setName(item.getName());
        itemDto.setAcronym(item.getAcronym());
        itemDto.setUrl(item.getUrl());
        itemDto.setCountryId(item.getCountry().getId());
        return itemDto;
    }

    public static UProgramDto toUProgramDto(UProgram item) {
        UProgramDto itemDto = new UProgramDto();
        itemDto.setId(item.getId());
        itemDto.setName(item.getName());
        itemDto.setNativeName(item.getNativeName());
        itemDto.setAcronym(item.getAcronym());
        itemDto.setUniversityId(item.getUniversity().getId());
        return itemDto;
    }

    public static UWeightDto toUWeightDto(UWeight item) {
        UWeightDto itemDto = new UWeightDto();
        itemDto.setId(item.getId());
        itemDto.setValue(item.getValue());
        itemDto.setProgramId(item.getUprogram().getId());

        DKA dka = item.getDka();
        DKAG dkag = dka.getDkag();

        itemDto.setDkaId(dka.getId());

        String dkaIndex = dkag.getIndex().toString() + '.' + dka.getIndex().toString();
        itemDto.setDkaTitle(dkaIndex  + ". " + dka.getName());

        String dkagIndex = dkag.getIndex().toString();
        itemDto.setDkagTitle(dkagIndex  + ". " + dkag.getName());

        return itemDto;
    }

}
