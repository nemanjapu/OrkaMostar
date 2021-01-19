function loadAllPagesPartial() {
    $('#pagesListCon').load('/PagesManagement/LoadAllPages', function () {
        $('ul.sortable').nestedSortable({
            forcePlaceholderSize: true,
            handle: '.sortable-handle',
            helper: 'clone',
            items: 'li',
            opacity: .6,
            placeholder: 'placeholder',
            revert: 250,
            tabSize: 25,
            tolerance: 'pointer',
            toleranceElement: '> div',
            maxLevels: 2,
            isTree: true,
            expandOnHover: 700,
            startCollapsed: false,
            stop: function (e, ui) {
                if (ui.item.parent().parent().hasClass('card-body')) {
                    ui.item.find('div').first().attr('data-parent-id', '0');
                }
                else {
                    ui.item.find('div').first().attr('data-parent-id', ui.item.parent().parent().find('div').first().data("id"));
                }
                var pages = [];
                $(".list-group-item").each(function (index) {
                    pages.push({
                        'id': $(this).data("id"),
                        'SortOrder': index,
                        'ParentId': $(this).attr("data-parent-id")
                    });
                });
                $.ajax({
                    url: "/api/WebsitePagesApi/SetPagesOrder",
                    method: "POST",
                    data: { '': pages }
                }).done(function () {
                    toastr.success("Menu order saved!");
                }).fail(function () {
                    toastr.error("Error!");
                });
            }
        });
    });
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
    $('#deletePageConfirm').attr('data-page-id-to-delete', PageId);
});

$(document).delegate('#deletePageConfirm', 'click', function () {
    var pageIdToDelete = $('#deletePageConfirm').data('page-id-to-delete');
    $.ajax({
        url: '/api/WebsitePagesApi/DeleteWebsitePage/' + pageIdToDelete,
        type: 'POST',
        success: function () {
            toastr.success("Page deleted!");
            $("#DeletePageModal").modal('hide');
            loadAllPagesPartial();
        },
        error: function () {
            toastr.error("Error! Page not deleted.");
        }
    });
});

$(document).delegate('.edit-page-trigger', 'click', function () {
    $('#editPageCon').append(loader());
    var pageId = $(this).data('page-id');
    $('#editPageCon').load('/PagesManagement/EditWebsitePage/' + pageId, function () {
        $('[data-plugin-ios-switch]').each(function () {
            var $this = $(this);

            $this.themePluginIOS7Switch();
        });
    });
});

function editPageFormSaved() {
    toastrSuccess()
    loadAllPagesPartial();
    $('#editPageCon').empty();
}