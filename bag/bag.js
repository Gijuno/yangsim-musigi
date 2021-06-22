window.onload = function(){

    function includeHTML(callback) {
        var z, i, elmnt, file, xhr;
        /*loop through a collection of all HTML elements:*/
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
          elmnt = z[i];
          /*search for elements with a certain atrribute:*/
          file = elmnt.getAttribute("include-html");
          //console.log(file);
          if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
              if (this.readyState == 4) {
                if (this.status == 200) {
                  elmnt.innerHTML = this.responseText;
                }
                if (this.status == 404) {
                  elmnt.innerHTML = "Page not found.";
                }
                /*remove the attribute, and call this function once more:*/
                elmnt.removeAttribute("include-html");
                includeHTML(callback);
              }
            };
            xhr.open("GET", file, true);
            xhr.send();
            /*exit the function:*/
            return;
          }
        }
    }

    includeHTML()
}

const oneCount = localStorage.getItem("\"양심 한 개\"")
const packageCount = localStorage.getItem("\"양심 한 묶음\"")
if (Number(packageCount) >= 1) {
    document.getElementById("reset").insertAdjacentHTML('beforebegin', '<div class="itemImg" id="packageItem" onclick="gotoPackage()"><p>"양심 한 묶음" x' + packageCount + '</p></div>')
}
if (Number(oneCount) >= 1) {
    document.getElementById("reset").insertAdjacentHTML('beforebegin', '<div class="itemImg" id="oneItem" onclick="gotoOne()"><p>"양심 한 개" x' + oneCount + '</p></div>')
}

function reset() {
    localStorage.removeItem("\"양심 한 묶음\"");
    localStorage.removeItem("\"양심 한 개\"");
    location.replace("/bag/bag.html")
}

function gotoOne() {
    location.href = "/products/item.html?item=1"
}

function gotoPackage() {
    location.href = "/products/item.html?item=2"
}


