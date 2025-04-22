
using AutoMapper;
using Entities.Dtos;
using Entities.Models;

namespace backend.Utilities.AutoMapper;
public class MappingProfile : Profile
{
    // MappingProfile sınıfı, Profile sınıfından türetilmiştir ve burada dönüşüm (mapping) kuralları tanımlanır.
    // CreateMap<UserDtoUpdate, User>() komutu, UserDtoUpdate nesnesinin User nesnesine dönüştürülmesini sağlar.
    // Bu yapı, UserDtoUpdate DTO'su ile User entity'si arasında veri aktarımını kolaylaştırır.

    public MappingProfile()
    {
        CreateMap<User, UserDto>();
        CreateMap<UserDtoForInsertion, User>();
        CreateMap<UserDtoForUpdate, User>().ReverseMap();

        CreateMap<WaterCard, WaterCardDto>();
        CreateMap<WaterCardDtoForInsertion, WaterCard>();
        CreateMap<WaterCardDtoForUpdate, WaterCard>().ReverseMap();

        CreateMap<CityHall, CityHallDto>();


        CreateMap<Meter, MeterDto>();



        CreateMap<UserDtoForRegistration, User>();


    }

}
