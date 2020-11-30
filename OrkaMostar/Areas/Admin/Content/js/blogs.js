function LoadAllBlogsPartial() {
    $('#pagesListCon').load('/NewsManagement/LoadAllBlogs');
}

$(document).ready(function () {
    LoadAllBlogsPartial();
});

$(document).delegate('#addNewPageBtn', 'click', function () {
    $('#editPageCon').append(loader());
    $('#editPageCon').load('/NewsManagement/AddNewBlogPage', function () {
        CKEDITOR.replace('Content1');
    });
});

$('#addWebsitePageForm').validate();

$("#addWebsitePageForm").submit(function (e) {
    e.preventDefault();
    if ($('#addWebsitePageForm').valid()) {
        var WebsitePage = new Object();
        WebsitePage.MenuName = $('#newPageMenuName').val();
        WebsitePage.PageTitle = $('#newPageTitle').val();
        WebsitePage.Template = $('#newPageTemplate').val();
        WebsitePage.MenuId = $('#newPageMenuId').val();
        WebsitePage.ParentId = $('#newPageParent').val();
        $.ajax({
            url: '/api/WebsitePagesApi/AddNewWebsitePage',
            type: 'POST',
            dataType: 'json',
            data: WebsitePage,
            success: function () {
                toastr.success("New page added!");
                $("#AddNewWebsitePage").modal('hide');
                LoadAllBlogsPartial();
            },
            error: function () {
                toastr.error("Error! Page not added.");
            }
        });
    }
    else {
        return false;
    }
});

$(document).delegate('#DeletePageButton', 'click', function () {
    var PageId = $(this).data('pageid');
    $('#PageIdInput').val(PageId);
});

$(document).delegate('.edit-page-trigger', 'click', function () {
    $('#editPageCon').append(loader());
    var pageId = $(this).data('page-id');
    $('#editPageCon').load('/PagesManagement/EditWebsitePage/' + pageId);
});

function editPageFormSaved() {
    toastr.success("Saved!");
    LoadAllBlogsPartial();
}