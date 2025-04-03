using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Extensions
{
    public class CustomUserValidator : IUserValidator<User>
    {
        public Task<IdentityResult> ValidateAsync(UserManager<User> manager, User user)
        {
            var errors = new List<IdentityError>();

            return errors.Any()
                ? Task.FromResult(IdentityResult.Failed(errors.ToArray()))
                : Task.FromResult(IdentityResult.Success);
        }

    }
}