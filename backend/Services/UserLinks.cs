using Entities.Dtos;
using Entities.LinkModels;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Net.Http.Headers;
using Services.Contracts;

namespace Services
{
    public class UserLinks : IUserLinks
    {
        private readonly LinkGenerator _linkGenerator;
        private readonly IDataShaper<UserDto> _dataShaper;

        public UserLinks(LinkGenerator linkGenerator,
                         IDataShaper<UserDto> dataShaper)
        {
            _linkGenerator = linkGenerator;
            _dataShaper = dataShaper;
        }

        public LinkResponse TryGenerateLinks(IEnumerable<UserDto> usersDto, string fields, HttpContext httpContext)
        {

            var shapedUsers = ShapeData(usersDto, fields);
            if (ShouldGenerateLinks(httpContext))
            {
                return ReturnLinkedUsers(usersDto, fields, httpContext, shapedUsers);
            }
            return ReturnShapedUsers(shapedUsers);

        }

        private LinkResponse ReturnLinkedUsers(IEnumerable<UserDto> usersDto, string fields, HttpContext httpContext, List<Entity> shapedUsers)
        {

            var userDtoList = usersDto.ToList();

            for (int i = 0; i < userDtoList.Count; i++)
            {
                var userLinks = CreateForUser(httpContext, userDtoList[i], fields);
                shapedUsers[i].Add("Links", userLinks);
            }
            var userCollection = new LinkCollectionWrapper<Entity>(shapedUsers);
            CreateForUsers(httpContext, userCollection);
            return new LinkResponse { HasLinks = true, LinkedEntities = userCollection };
        }

        private LinkCollectionWrapper<Entity> CreateForUsers(HttpContext httpContext, LinkCollectionWrapper<Entity> userCollectonWrapper)
        {
            userCollectonWrapper.Links.Add(new Link()
            {
                Href = $"/api/{httpContext.GetRouteData().Values["controller"].ToString().ToLower()}",
                Rel = "self",
                Method = "GET"
            });



            return userCollectonWrapper;
        }

        private List<Link> CreateForUser(HttpContext httpContext, UserDto userDto, string fields)
        {

            var links = new List<Link>()
            {
                new  Link()
                {
                    Href = $"/api/{httpContext.GetRouteData().Values["controller"].ToString().ToLower()}" + $"/{userDto.Id}",
                    Method = "GET",
                    Rel = "self"
                },
                new  Link()
                {
                    Href = $"/api/{httpContext.GetRouteData().Values["controller"].ToString().ToLower()}",
                    Method = "POST",
                    Rel = "create"
                }
            };

            return links;
        }

        private LinkResponse ReturnShapedUsers(List<Entity> shapedUsers)
        {

            return new LinkResponse()
            {
                ShapedEntities = shapedUsers
            };
        }

        private List<Entity> ShapeData(IEnumerable<UserDto> usersDto, string fields)
        {

            return _dataShaper.ShapeData(usersDto, fields).Select(user => user.Entity).ToList();

        }

        private bool ShouldGenerateLinks(HttpContext httpContext)
        {
            var mediaType = (MediaTypeHeaderValue)httpContext.Items["AcceptHeaderMediaType"];
            return mediaType.SubTypeWithoutSuffix.EndsWith("hateoas", StringComparison.InvariantCultureIgnoreCase);


        }
    }
}