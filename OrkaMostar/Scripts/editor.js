CKEDITOR.disableAutoInline = true;
if ($('#editorArea').length) {
    CKEDITOR.inline('editorArea');
}

function toastrSuccess() {
    toastr.success("Saved!");
}