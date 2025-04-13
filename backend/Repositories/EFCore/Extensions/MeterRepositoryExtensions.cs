using System.Linq.Dynamic.Core;
using Entities.Models;

namespace Repositories.EFCore.Extensions
{
    public static class MeterRepositoryExtensions
    {


        public static IQueryable<Meter> FilterMeters(this IQueryable<Meter> meters, string subscriberNo) => meters.Where(meter => string.IsNullOrEmpty(subscriberNo) || meter.SubscriberNo.ToLower().Equals(subscriberNo.ToLower()));


        public static IQueryable<Meter> Search(this IQueryable<Meter> meters, string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                return meters;
            }

            var lowerCaseTerm = searchTerm.Trim().ToLower();

            return meters
            .Where(
             meter => meter.SubscriberNo
            .ToLower().
            Contains(searchTerm)
            );
        }

        public static IQueryable<Meter> Sort(this IQueryable<Meter> meters, string orderByQueryString)
        {
            if (string.IsNullOrWhiteSpace(orderByQueryString))
            {
                return meters.OrderBy(meter => meter.Id);
            }

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<Meter>(orderByQueryString);

            if (orderQuery is null)
            {
                return meters.OrderBy(meter => meter.Id);
            }
            return meters.OrderBy(orderQuery);


        }
    }
}
