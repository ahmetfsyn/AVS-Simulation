using Entities.Dtos;
using Entities.LinkModels;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Net.Http.Headers;
using Services.Contracts;

namespace Services
{
    public class MeterLinks : IMeterLinks
    {
        private readonly LinkGenerator _linkGenerator;
        private readonly IDataShaper<MeterDto> _dataShaper;

        public MeterLinks(LinkGenerator linkGenerator,
                         IDataShaper<MeterDto> dataShaper)
        {
            _linkGenerator = linkGenerator;
            _dataShaper = dataShaper;
        }

        public LinkResponse TryGenerateLinks(IEnumerable<MeterDto> metersDto, string fields, HttpContext httpContext)
        {

            var shapedMeters = ShapeData(metersDto, fields);
            if (ShouldGenerateLinks(httpContext))
            {
                return ReturnLinkedMeters(metersDto, fields, httpContext, shapedMeters);
            }
            return ReturnShapedMeters(shapedMeters);

        }

        private LinkResponse ReturnLinkedMeters(IEnumerable<MeterDto> metersDto, string fields, HttpContext httpContext, List<Entity> shapedMeters)
        {

            var meterDtoList = metersDto.ToList();

            for (int i = 0; i < meterDtoList.Count; i++)
            {
                var meterLinks = CreateForMeter(httpContext, meterDtoList[i], fields);
                shapedMeters[i].Add("Links", meterLinks);
            }
            var meterCollection = new LinkCollectionWrapper<Entity>(shapedMeters);
            CreateForMeters(httpContext, meterCollection);
            return new LinkResponse { HasLinks = true, LinkedEntities = meterCollection };
        }

        private LinkCollectionWrapper<Entity> CreateForMeters(HttpContext httpContext, LinkCollectionWrapper<Entity> meterCollectonWrapper)
        {
            meterCollectonWrapper.Links.Add(new Link()
            {
                Href = $"/api/{httpContext.GetRouteData().Values["controller"].ToString().ToLower()}",
                Rel = "self",
                Method = "GET"
            });



            return meterCollectonWrapper;
        }

        private List<Link> CreateForMeter(HttpContext httpContext, MeterDto meterDto, string fields)
        {

            var links = new List<Link>()
            {
                new  Link()
                {
                    Href = $"/api/{httpContext.GetRouteData().Values["controller"].ToString().ToLower()}" + $"/{meterDto.Id}",
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

        private LinkResponse ReturnShapedMeters(List<Entity> shapedMeters)
        {

            return new LinkResponse()
            {
                ShapedEntities = shapedMeters
            };
        }

        private List<Entity> ShapeData(IEnumerable<MeterDto> metersDto, string fields)
        {
            return _dataShaper.ShapeData(metersDto, fields).Select(meter => meter.Entity).ToList();
        }

        private bool ShouldGenerateLinks(HttpContext httpContext)
        {
            var mediaType = (MediaTypeHeaderValue)httpContext.Items["AcceptHeaderMediaType"];
            return mediaType.SubTypeWithoutSuffix.EndsWith("hateoas", StringComparison.InvariantCultureIgnoreCase);


        }
    }
}