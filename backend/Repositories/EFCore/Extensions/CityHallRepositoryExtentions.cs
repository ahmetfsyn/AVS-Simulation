using System.Linq.Dynamic.Core;
using Entities.Models;
using Repositories.EFCore.Extensions;

namespace Repositories.EFCore.Extensions
{
    public static class CityHallRepositoryExtentions
    {

        public static IQueryable<CityHall> FilterCityHalls(this IQueryable<CityHall> cityHalls, string city) =>
        cityHalls.Where(cityHall => string.IsNullOrEmpty(city) || cityHall.City.ToLower().Equals(city.ToLower()));


        public static IQueryable<CityHall> Search(this IQueryable<CityHall> cityHalls, string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                return cityHalls;
            }

            var lowerCaseTerm = searchTerm.Trim().ToLower();

            return cityHalls
            .Where(
             cityHall => cityHall.City
            .ToLower().
            Contains(searchTerm)
            );
        }

        public static IQueryable<CityHall> Sort(this IQueryable<CityHall> cityHalls, string orderByQueryString)
        {
            if (string.IsNullOrWhiteSpace(orderByQueryString))
            {
                return cityHalls.OrderBy(cityHall => cityHall.Id);
            }

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<CityHall>(orderByQueryString);


            if (orderQuery is null)
            {
                return cityHalls.OrderBy(cityHall => cityHall.Id);
            }
            return cityHalls.OrderBy(orderQuery);


        }

    }
}