namespace OrkaMostar.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialDatabase : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GlobalValues",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        EmailAddress = c.String(),
                        MobilePhone = c.String(),
                        OfficePhone = c.String(),
                        Address = c.String(),
                        FacebookLink = c.String(),
                        InstagramLink = c.String(),
                        TwitterLink = c.String(),
                        PinterestLink = c.String(),
                        GooglePlusLink = c.String(),
                        LinkedinLink = c.String(),
                        YoutubeLink = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Leads",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        EmailAddress = c.String(),
                        PhoneNumber = c.String(),
                        Note = c.String(),
                        Date = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Menus",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.WebsitePages",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PageUrl = c.String(),
                        PageExternalUrl = c.String(),
                        OpenPageInNewTab = c.Boolean(nullable: false),
                        MenuName = c.String(),
                        PageTitle = c.String(),
                        Template = c.String(),
                        SortOrder = c.Int(nullable: false),
                        ParentId = c.Int(nullable: false),
                        MetaDescription = c.String(),
                        MetaKeywords = c.String(),
                        MenuId = c.Int(nullable: false),
                        isHidden = c.Boolean(nullable: false),
                        ImageName = c.String(),
                        ImagePath = c.String(),
                        isBlogPost = c.Boolean(nullable: false),
                        Content1 = c.String(),
                        Content2 = c.String(),
                        Content3 = c.String(),
                        Content4 = c.String(),
                        Content5 = c.String(),
                        Content7 = c.String(),
                        Content8 = c.String(),
                        Content9 = c.String(),
                        Content10 = c.String(),
                        Content11 = c.String(),
                        Content12 = c.String(),
                        Content13 = c.String(),
                        Content14 = c.String(),
                        Content15 = c.String(),
                        Content16 = c.String(),
                        Content17 = c.String(),
                        Content18 = c.String(),
                        Content19 = c.String(),
                        Content20 = c.String(),
                        Content21 = c.String(),
                        Content22 = c.String(),
                        Content23 = c.String(),
                        Content24 = c.String(),
                        Content25 = c.String(),
                        Content26 = c.String(),
                        Content27 = c.String(),
                        Content28 = c.String(),
                        Content29 = c.String(),
                        Content30 = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Menus", t => t.MenuId, cascadeDelete: true)
                .Index(t => t.MenuId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.WebsitePages", "MenuId", "dbo.Menus");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropIndex("dbo.WebsitePages", new[] { "MenuId" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropTable("dbo.WebsitePages");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.Menus");
            DropTable("dbo.Leads");
            DropTable("dbo.GlobalValues");
        }
    }
}
