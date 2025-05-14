using System.Linq.Dynamic.Core;
using Entities.Models;
using Entities.RequestFeatures;
using Repositories.EFCore.Extensions;

namespace Repositories.EFCore
{
    public static class UserRepositoryExtensions
    {
        public static IQueryable<User> FilterUsers(this IQueryable<User> users, UserParameters parameters)
        {

            if (!string.IsNullOrWhiteSpace(parameters.FirstName))
            {
                users = users.Where(u => u.FirstName.ToLower().Contains(parameters.FirstName.ToLower()));
            }

            if (!string.IsNullOrWhiteSpace(parameters.LastName))
            {
                users = users.Where(u => u.LastName.ToLower().Contains(parameters.LastName.ToLower()));
            }


            if (!string.IsNullOrWhiteSpace(parameters.SubscriberNo))
            {
                users = users.Where(u => u.SubscriberNo.ToLower().Contains(parameters.SubscriberNo.ToLower()));
            }

            return users;
        }

        public static IQueryable<User> Search(this IQueryable<User> users, string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                return users;
            }

            var lowerCaseTerm = searchTerm.Trim().ToLower();

            return users
            .Where(
             user => user.FirstName
            .ToLower().
            Contains(searchTerm)
            );
        }

        public static IQueryable<User> Sort(this IQueryable<User> users, string orderByQueryString)
        {
            if (string.IsNullOrWhiteSpace(orderByQueryString))
            {
                return users.OrderBy(user => user.Id);
            }



            var orderQuery = OrderQueryBuilder.CreateOrderQuery<User>(orderByQueryString);


            if (orderQuery is null)
            {
                return users.OrderBy(user => user.Id);
            }
            return users.OrderBy(orderQuery);


        }
    }
}