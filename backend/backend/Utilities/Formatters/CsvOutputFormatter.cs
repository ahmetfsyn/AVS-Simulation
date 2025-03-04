using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Dtos;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Net.Http.Headers;

namespace backend.Utilities.Formatters
{
    public class CsvOutputFormatter : TextOutputFormatter
    {
        public CsvOutputFormatter()
        {
            SupportedMediaTypes.Add(MediaTypeHeaderValue.Parse("text/csv"));
            SupportedEncodings.Add(Encoding.UTF8);
            SupportedEncodings.Add(Encoding.Unicode);
        }

        protected override bool CanWriteType(Type? type)
        {

            if (typeof(UserDto).IsAssignableFrom(type) || typeof(IEnumerable<UserDto>).IsAssignableFrom(type))
            {
                return base.CanWriteType(type);
            }
            return false;
        }

        private static void FormatCsv(StringBuilder buffer, UserDto userDto)
        {
            // TC no userDto içinde olmadıgı için tcno eklenmedi aşağıdaki koda.
            buffer.AppendLine($"{userDto.Id},{userDto.FirstName},{userDto.LastName}");
        }

        public override async Task WriteResponseBodyAsync(OutputFormatterWriteContext context, Encoding selectedEncoding)
        {
            var response = context.HttpContext.Response;
            var buffer = new StringBuilder();
            if (context.Object is IEnumerable<UserDto>)
            {
                foreach (var userDto in (IEnumerable<UserDto>)context.Object)
                {
                    FormatCsv(buffer, userDto);
                }
            }
            else
            {
                FormatCsv(buffer, (UserDto)context.Object);
            }
            await response.WriteAsync(buffer.ToString());
        }
    }
}