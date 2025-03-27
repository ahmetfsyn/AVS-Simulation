using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Entities.Dtos;
using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Repositories.Contracts;
using Services.Contracts;

namespace Services
{
    // Service manager ata class
    public class ServiceManager : IServiceManager
    {

        private readonly Lazy<IUserService> _userService;

        private readonly Lazy<IAuthenticationService> _authenticationService;

        private readonly Lazy<ICityHallService> _cityHallService;

        public ServiceManager(IRepositoryManager repositoryManager, ILoggerService logger, IMapper mapper, IUserLinks userLinks,
         ICityHallLinks cityHallLinks,
         UserManager<User> userManager,
         IConfiguration configuration
         )
        {
            _userService = new Lazy<IUserService>(() => new UserManager(repositoryManager, logger, mapper, userLinks));

            _cityHallService = new Lazy<ICityHallService>(() => new CityHallManager(repositoryManager, logger, mapper, cityHallLinks));

            _authenticationService = new Lazy<IAuthenticationService>(() => new AuthenticationManager(logger, mapper, userManager, configuration));

        }
        public IUserService UserService => _userService.Value;
        public ICityHallService CityHallService => _cityHallService.Value;
        public IAuthenticationService AuthenticationService => _authenticationService.Value;
    }
}