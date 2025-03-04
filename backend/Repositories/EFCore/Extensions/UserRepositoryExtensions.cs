using System.Linq.Dynamic.Core;
using Entities.Models;
using Repositories.EFCore.Extensions;

namespace Repositories.EFCore
{
    public static class UserRepositoryExtensions
    {
        public static IQueryable<User> FilterUsers(this IQueryable<User> users, string firstName) =>
            users.Where(user => string.IsNullOrEmpty(firstName) || user.FirstName.ToLower().Equals(firstName.ToLower()));

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