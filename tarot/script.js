function applyParentBasedHideToggles(className) {
    elements = document.getElementsByClassName(className)
    for (element of elements) {
        applyHideToggle(element)
    }
}

function applyParentBasedHideToggle(element) {
    let parent = element.parentElement
    let anchorElement = element
    let invisibleDisplay = "none"
    let originalDisplays = new Map()

    let toggle = () => {
        for (child of parent.children) {
            if (child != anchorElement) {
                if (child.style.display != invisibleDisplay) {
                    originalDisplays.set(child, child.style.display)
                    child.style.display = invisibleDisplay
                } else {
                    child.style.display = originalDisplays.get(child)
                }
            }
        }
    }
    anchorElement.onclick = (event) => {toggle()}
}

function getHeaderLevel(element) {
    if (element != null && element.tagName.startsWith("H")) {
        let level = parseInt(element.tagName.substr(1))
        if (level != NaN) {
            return level
        }
    }
    return null
}

function applyHeaderLevelHideToggle(element) {
    let anchorLevel = getHeaderLevel(element)
    if (anchorLevel == null) return;

    //console.log("applying toggle")
    //console.log(element)
    let anchorElement = element

    let invisibleDisplay = "none"
    let originalDisplays = new Map()

    let hide = true

    let toggle = () => {
        sibling = anchorElement.nextElementSibling
        siblingLevel = getHeaderLevel(sibling)
        while (sibling != null && (siblingLevel == null || siblingLevel > anchorLevel)) {
            if (hide) {
                originalDisplays.set(sibling, sibling.style.display)
                sibling.style.display = invisibleDisplay
            } else {
                sibling.style.display = originalDisplays.get(sibling)
            }
            sibling = sibling.nextElementSibling
            siblingLevel = getHeaderLevel(sibling)
        }
        hide = ! hide
    }

    anchorElement.onclick = (event) => {toggle()}
    anchorElement.style.cursor = "pointer"
    toggle()
}

function setupHeaderToggles() {
    for (tagName of ["H4", "h3"]) {
        for (el of document.getElementsByTagName(tagName)) {
            applyHeaderLevelHideToggle(el)
        }
    }
}

function setupScrollToTop() {
    let scrollToTop = document.createElement("DIV")
    scrollToTop.innerHTML = "⇧"
    scrollToTop.style.position = "fixed"
    scrollToTop.style.bottom = 0
    scrollToTop.style.right = 0
    scrollToTop.className = "scroll-to-top"

    let jumpBackUp = () => {
        console.log("scrolling up")
        //window.scrollY = 0
        window.scrollTo({top: 0})
    }
    scrollToTop.onclick = (event) => {jumpBackUp()}
    document.body.appendChild(scrollToTop)

    document.addEventListener("scroll", (event) => {
        if (window.scrollY < window.innerHeight) {
            scrollToTop.style.display = "none"
        } else {
            scrollToTop.style.display = "block"
        }
    })
}