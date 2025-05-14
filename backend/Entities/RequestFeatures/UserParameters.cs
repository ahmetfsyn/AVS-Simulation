namespace Entities.RequestFeatures
{
    public class UserParameters : RequestParameters
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string TcNo { get; set; }
        public string SubscriberNo { get; set; }
        public bool ValidFirstName => string.IsNullOrEmpty(FirstName) || (FirstName.Length >= 2 && FirstName.Length <= 50);
        public string? SearchTerm { get; set; }
        // public bool ValidLastName { get; set; } = false;

        public UserParameters()
        {
            OrderBy = "id";
        }


    }
}