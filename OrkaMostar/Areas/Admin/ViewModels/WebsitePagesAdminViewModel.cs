namespace OrkaMostar.Areas.Admin.ViewModels
{
    public class WebsitePagesAdminViewModel
    {
        public int Id { get; set; }
        public string Template { get; set; }
        public int SortOrder { get; set; }
        public string ParentName { get; set; }
        public int ParentId { get; set; }
        public string MenuName { get; set; }
        public int MenuId { get; set; }
        public bool isHidden{ get; set; }
    }
}