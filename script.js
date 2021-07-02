function setImageStyle(img) {
    if (img.parentElement.offsetHeight / img.parentElement.offsetWidth < img.naturalHeight / img.naturalWidth) {
        img.style.width = "100%"
        img.style.height = "auto"
        img.style.top = ((img.parentElement.offsetHeight - img.offsetHeight) / 2) + "px"
        img.style.left = "0"
    } else {
        img.style.width = "auto"
        img.style.height = "100%"
        img.style.top = "0"
        img.style.left = ((img.parentElement.offsetWidth - img.offsetWidth) / 2) + "px"
    }
}
function isLoaded(image) {
    return image.complete && image.naturalHeight !== 0
}
window.onresize = function() {
    var images = document.getElementsByTagName('img')
    for (let i = 0; i < images.length; i++) {
        setImageStyle(images[i])
    }
}
function setupDocument() {
    let palette = ["9b5de5", "f15bb5", "fee440", "00bbf9", "00f5d4"]
    cycleColor("chronicweirdo", "color", palette, 200, 80)
    var images = document.getElementsByTagName('img')
    for (let i = 0; i < images.length; i++) {
        if (isLoaded(images[i])) {
            setImageStyle(images[i])
        } else {
            images[i].onload = function() { setImageStyle(images[i]) }
        }
    }
}