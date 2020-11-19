function loadAllPagesPartial() {
    $('#pagesListCon').load('/PagesManagement/LoadAllPages');
}

$(document).ready(function () {
    loadAllPagesPartial();
});

function PopulateParentDropdownList(menuId) {
    var id = menuId;
    $.ajax({
        url: '/api/WebsitePagesApi/GetWebsitePagesForParent/' + id,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            $("#newPageParent").empty();
            $("#newPageParent").append('<option value="0">No Parent</option>');
            for (var i = 0; i < data.length; i++) {
                $("#newPageParent").append('<option value="' + data[i].Id + '">' + data[i].MenuName + '</option>');
            }
        },
        error: function (xhr, status) {
            alert(status);
        }
    });
}

$(document).delegate('.add-page-modal-btn','click', function () {
    var menuId = $(this).data('menuid');
    $('#newPageMenuId').val(menuId);
    PopulateParentDropdownList(menuId);
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
                loadAllPagesPartial();
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
    loadAllPagesPartial();
}