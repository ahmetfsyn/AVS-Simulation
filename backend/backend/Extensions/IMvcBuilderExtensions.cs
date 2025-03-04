using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Utilities.Formatters;

namespace backend.Extensions
{
    public static class IMvcBuilderExtensions
    {
        public static IMvcBuilder AddCustomCsvFormatter(this IMvcBuilder builder) =>
        builder.AddMvcOptions(config =>
        {
            config.OutputFormatters.Add(new CsvOutputFormatter());
        });
    }
}