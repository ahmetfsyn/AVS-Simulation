
using AutoMapper;
using Entities.Dtos;
using Entities.Models;

namespace backend.Utilities.AutoMapper;
public class MappingProfile : Profile
{
    // MappingProfile sınıfı, Profile sınıfından türetilmiştir ve burada dönüşüm (mapping) kuralları tanımlanır.
    // CreateMap<UserDtoUpdate, User>() komutu, UserDtoUpdate nesnesinin User nesnesine dönüştürülmesini sağlar.
    // Bu yapı, UserDtoUpdate DTO'su ile User entity'si arasında veri aktarımını kolaylaştırır.

    /*************  ✨ Codeium Command ⭐  *************/
    /******  896c1bc0-b7b6-4cd0-ac4b-1137261bd0f6  *******/
    public MappingProfile()
    {
        CreateMap<User, UserDto>();
        CreateMap<UserDtoForInsertion, User>();
        CreateMap<UserDtoForUpdate, User>().ReverseMap();

        CreateMap<UserDtoForRegistration, User>();


    }

}
