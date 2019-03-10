const fs = require('fs')
const path = require('path')

const isDirectory = source => fs.lstatSync(source).isDirectory()
const getDirectories = source => 
    fs.readdirSync(source)
        .map(name => path.join(source, name))
        .filter(isNotDirectory)

const extractFiles = (source) => {
    files = fs.readdirSync(source)
        .map(name => path.join(source, name))
        .map(name => {
            if (isDirectory(name)) {
                return extractFiles(name)
            } else {
                return [name]
            }
        })
    return [].concat.apply([], files)
    }

const filterUnwantedFiles = name => {
    if (
        (name.startsWith(".git")) // exclude git directory
        || name.indexOf("\\") == -1 // exclude root directory
    ) {
        return false
    }
    return true
}

const parseNr = str => {
    var nr = parseInt(str, 10)
    if (isNaN(nr)) return 0
    return nr
}
const parseNrForMonth = str => {
    var nr = parseNr(str)
    if (nr > 0) return nr - 1
    return 0
}
const extractTitle = name => {
    var withoutExtension = name.replace(/\.[^/.]+$/, "")
    return withoutExtension.substring(withoutExtension.lastIndexOf("\\")+1)
}
const extractLink = name => "https://chronicweirdo.com/" + name.replace(/\\/, "/")
const extractTimestamp = name => {
    var timestamp = new Date()
    try {
        var el = extractTitle(name).split(".")
        if (el.length >= 1) timestamp.setFullYear(parseNr(el[0]))
        if (el.length >= 2) timestamp.setMonth(parseNrForMonth(el[1]))
        if (el.length >= 3) timestamp.setDate(parseNr(el[2]))
        if (el.length >= 4) timestamp.setHours(parseNr(el[3]))
        if (el.length >= 5) timestamp.setMinutes(parseNr(el[4]))
        if (el.length >= 6) timestamp.setSeconds(parseNr(el[5]))
    } catch (e) {
        console.log("error for " + name)
        console.log(e)
    }
    return timestamp.toISOString()
}

const sublist = (list, fromInclusive, toExclusive) => {
    var res = []
    var to = Math.min(toExclusive, list.length)
    for (var i = fromInclusive; i < to; i++) {
        res.push(list[i])
    }
    return res
}

const createAtomEntry = name => {
    title = extractTitle(name)
    link = extractLink(name)
    //timestamp = "2018-09-01T12:00:00.000Z" //extractTimestamp(name)
    timestamp = new Date().toISOString()
    return "<entry>"
        + "<title>" + title + "</title>"
        + "<link href=\"" + link + "\" />"
        + "<id>" + title + "</id>"
        + "<updated>" + timestamp + "</updated>"
        + "<content type=\"xhtml\">"
        + "<a href=\"" + link + "\">"
        + "<img height=\"200\" src=\"" + link + "\"/>"
        + "</a>"
        + "</content>"
        + "<author>"
		+ "<name>chronicweirdo</name>"
		+ "</author>"
        + "</entry>"
}



//var contentFiles = extractFiles(".").filter(filterUnwantedFiles)
//contentFiles.reverse()
/*
var newFiles = sublist(contentFiles, 0, 18)
newFiles.forEach(element => {
    var entry = createAtomEntry(element)
    console.log(entry)
})*/
//console.log(createAtomEntry("2018.08.25.13.29.jpg"))

var filesToProcess = sublist(process.argv, 2, 1000)
console.log(filesToProcess)
filesToProcess.forEach(file => {
    var entry = createAtomEntry(file)
    console.log(entry)
})