using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class ShapedEntity
    {
        public string Id { get; set; }
        public Entity Entity { get; set; }


        public ShapedEntity()
        {
            Entity = new Entity();
        }
    }
}