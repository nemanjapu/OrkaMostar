using System.Text.RegularExpressions;

namespace OrkaMostar.Helpers
{
    public class UrlCleaner
    {
        public static string CleanUrl(string pageName)
        {
            string cleanTitle = pageName.ToLower().Replace(" ", "-");
            //Removes invalid character like .,-_ etc
            cleanTitle = Regex.Replace(cleanTitle, @"[^a-zA-Z0-9\/_|+ -]", "");
            return cleanTitle;
        }
    }
}