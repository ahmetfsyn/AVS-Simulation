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

        private readonly IUserService _userService;
        private readonly IWaterCardService _waterCardService;
        private readonly IAuthenticationService _authenticationService;

        public ServiceManager(IUserService userService, IWaterCardService waterCardService, IAuthenticationService authenticationService)
        {
            _userService = userService;
            _waterCardService = waterCardService;
            _authenticationService = authenticationService;
        }

        public IUserService UserService => _userService;
        public IAuthenticationService AuthenticationService => _authenticationService;

        public IWaterCardService WaterCardService => _waterCardService;
    }
}