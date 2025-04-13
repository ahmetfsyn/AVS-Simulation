

namespace Entities.RequestFeatures
{
    public class MeterParameters : RequestParameters
    {
        public string SubscriberNo { get; set; }

        public string? SearchTerm { get; set; }
        // public bool ValidLastName { get; set; } = false;

        public MeterParameters()
        {
            OrderBy = "id";
        }
    }
}