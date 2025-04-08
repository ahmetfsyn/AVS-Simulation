using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public record LoginDto
    {
        public UserDto UserDto { get; init; }
        public TokenDto TokenDto { get; init; }

    }
}