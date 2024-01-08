let themes = ["frutiger.css","y2k.css", "godzilla.css"];

//changes theme to next one in themes[] list
function changetheme(){
    //gets css file name
    let currentThemeUrl = document.getElementById("css").href;
    let currentTheme = currentThemeUrl.split('/').pop()

    //determines index of current theme
    let currentThemeIndex = themes.indexOf(currentTheme);

    //cycles back to -1 if element is last
    if(currentThemeIndex+1 == themes.length){
        currentThemeIndex = -1;
    }

    //changes css source to next element in themes[] in main website
    document.getElementById("css").href = themes[currentThemeIndex + 1];
    //changes css source to next element in themes[] in iframed doc
    document.getElementById("mainframe").contentWindow.document.getElementById("css").href = themes[currentThemeIndex + 1];


}