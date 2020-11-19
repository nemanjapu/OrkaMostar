using System.Text.RegularExpressions;

namespace OrkaMostar.Helpers
{
    public class UrlCleaner
    {
        public static string CleanUrl(string pageName)
        {
            byte[] tempBytes;
            tempBytes = System.Text.Encoding.GetEncoding("ISO-8859-8").GetBytes(pageName);
            pageName = System.Text.Encoding.UTF8.GetString(tempBytes);

            string cleanTitle = pageName.ToLower().Replace(" ", "-");
            //Removes invalid character like .,-_ etc
            cleanTitle = Regex.Replace(cleanTitle, @"[^a-zA-Z0-9\/_|+ -]", "");
            return cleanTitle;
        }
    }
}