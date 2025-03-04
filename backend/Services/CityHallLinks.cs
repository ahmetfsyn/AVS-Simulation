using Entities.Dtos;
using Entities.LinkModels;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Net.Http.Headers;
using Services.Contracts;

namespace Services
{
    public class CityHallLinks : ICityHallLinks
    {
        private readonly LinkGenerator _linkGenerator;
        private readonly IDataShaper<CityHallDto> _dataShaper;

        public CityHallLinks(LinkGenerator linkGenerator,
                         IDataShaper<CityHallDto> dataShaper)
        {
            _linkGenerator = linkGenerator;
            _dataShaper = dataShaper;
        }

        public LinkResponse TryGenerateLinks(IEnumerable<CityHallDto> cityHallsDto, string fields, HttpContext httpContext)
        {

            var shapedCityHalls = ShapeData(cityHallsDto, fields);
            if (ShouldGenerateLinks(httpContext))
            {
                return ReturnLinkedCityHalls(cityHallsDto, fields, httpContext, shapedCityHalls);
            }
            return ReturnShapedCityHalls(shapedCityHalls);

        }

        private LinkResponse ReturnLinkedCityHalls(IEnumerable<CityHallDto> cityHallsDto, string fields, HttpContext httpContext, List<Entity> shapedCityHalls)
        {

            var cityHallsDtoList = cityHallsDto.ToList();

            for (int i = 0; i < cityHallsDtoList.Count; i++)
            {
                var cityHallLinks = CreateForCityHall(httpContext, cityHallsDtoList[i], fields);
                shapedCityHalls[i].Add("Links", cityHallLinks);
            }
            var cityHallCollection = new LinkCollectionWrapper<Entity>(shapedCityHalls);
            CreateForCityHalls(httpContext, cityHallCollection);
            return new LinkResponse { HasLinks = true, LinkedEntities = cityHallCollection };
        }

        private LinkCollectionWrapper<Entity> CreateForCityHalls(HttpContext httpContext, LinkCollectionWrapper<Entity> cityHallCollectonWrapper)
        {
            cityHallCollectonWrapper.Links.Add(new Link()
            {
                Href = $"/api/{httpContext.GetRouteData().Values["controller"].ToString().ToLower()}",
                Rel = "self",
                Method = "GET"
            });



            return cityHallCollectonWrapper;
        }

        private List<Link> CreateForCityHall(HttpContext httpContext, CityHallDto cityHallDto, string fields)
        {

            var links = new List<Link>()
            {
                new  Link()
                {
                    Href = $"/api/{httpContext.GetRouteData().Values["controller"].ToString().ToLower()}" + $"/{cityHallDto.Id}",
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

        private LinkResponse ReturnShapedCityHalls(List<Entity> shapedCityHalls)
        {

            return new LinkResponse()
            {
                ShapedEntities = shapedCityHalls
            };
        }

        private List<Entity> ShapeData(IEnumerable<CityHallDto> cityHallsDto, string fields)
        {

            return _dataShaper.ShapeData(cityHallsDto, fields).Select(cityHall => cityHall.Entity).ToList();

        }

        private bool ShouldGenerateLinks(HttpContext httpContext)
        {
            var mediaType = (MediaTypeHeaderValue)httpContext.Items["AcceptHeaderMediaType"];
            return mediaType.SubTypeWithoutSuffix.EndsWith("hateoas", StringComparison.InvariantCultureIgnoreCase);


        }

    }

}