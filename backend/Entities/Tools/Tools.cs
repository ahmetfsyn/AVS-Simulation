
namespace backend.Utilities.Tools
{
    public static class Tools
    {
        public static string GenerateUniqueValue()
        {
            string randomValue;
            var random = new Random();
            randomValue = random.Next(1000000, 9999999).ToString();
            return randomValue;
        }
    }
}