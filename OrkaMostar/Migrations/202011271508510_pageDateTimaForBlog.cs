namespace OrkaMostar.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class pageDateTimaForBlog : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.WebsitePages", "DateAdded", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.WebsitePages", "DateAdded");
        }
    }
}
