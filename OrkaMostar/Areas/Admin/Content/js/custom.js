document.getElementById("PageImageInput").onchange = function () {
    var reader = new FileReader();

    reader.onload = function (e) {
        // get loaded data and render thumbnail.
        document.getElementById("preview-image-page").src = e.target.result;
    };

    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
};

function loader() {
    return '<div class="center-full"><div class="lds-dual-ring"></div></div>';
}