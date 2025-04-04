using System;
using System.Text.Json;
using Microsoft.AspNetCore.Identity;

namespace Entities.ErrorModel;

public class ErrorDetails
{
    public int StatusCode { get; set; }
    public string? Details { get; set; }
    public string? ErrorCode { get; set; }
    public List<IdentityError>? ErrorList { get; set; }


    public override string ToString()
    {
        return JsonSerializer.Serialize(this);
    }
}
