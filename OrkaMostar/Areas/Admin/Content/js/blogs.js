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
        imageChanger();
    });
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
            LoadAllBlogsPartial();
        },
        error: function () {
            toastr.error("Error! Page not deleted.");
        }
    });
});

$(document).delegate('.edit-page-trigger', 'click', function () {
    $('#editPageCon').append(loader());
    var pageId = $(this).data('page-id');
    $('#editPageCon').load('/NewsManagement/EditBlogPage/' + pageId, function () {
        CKEDITOR.replace('Content1');
        imageChanger();
    });
});

function editPageFormSaved() {
    toastr.success("Saved!");
    LoadAllBlogsPartial();
    $('#editPageCon').empty();
}

function imageChanger() {
    document.getElementById("PageImageInput").onchange = function () {
        var reader = new FileReader();

        reader.onload = function (e) {
            // get loaded data and render thumbnail.
            document.getElementById("preview-image-page").src = e.target.result;
        };

        // read the image file as a data URL.
        reader.readAsDataURL(this.files[0]);
    };
}