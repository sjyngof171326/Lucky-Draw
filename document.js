document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const docName = urlParams.get('doc');
    const imgSrc = urlParams.get('img');

    if (docName) {
        document.getElementById('doc-title').textContent = decodeURIComponent(docName);
        document.title = decodeURIComponent(docName) + ' - Work Docs';
    }
    if (imgSrc) {
        const imgElement = document.getElementById('doc-image');
        imgElement.src = decodeURIComponent(imgSrc);
        imgElement.style.display = 'inline-block'; // 显示图片
    }
});

window.addEventListener("load", function () {

    history.pushState(null, null, location.href);

    window.addEventListener("popstate", function () {
        window.location.replace("index.html");
    });

});
