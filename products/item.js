var itemNum = "1"
var itemName = "양심"
var count = 1

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

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    itemNum = getParameterByName("item")
    // document.getElementById("title").innerHTML = itemNum

    const description1 = "양심이 필요한 당신을 위해,<br>\"양심 한 개\" 를 소개해드립니다.<br><br>\"양심 한 개\" 는 당신의 하루를 되돌아보고,<br>양심을 채우기 위해 제작되었습니다.";
    const description2 = "양심이 필요한 당신을 위해,<br>\“양심 한 묶음\” 패키지를 소개해드립니다.<br><br>\“양심 한 묶음\" 패키지에는 양심 묶음 뿐 아니라,<br>다양한 양심 굿즈들이 포함되어있습니다.";

    if(itemNum === '1') {
        itemName = "\"양심 한 개\""
        document.getElementById("itemName").innerText = itemName;
        document.getElementById("itemImg").style.backgroundImage = "url('/res/img/musigi-logo.png')";
        document.getElementById("description").innerHTML = description1;
    } else if (itemNum === '2') {
        itemName = "\"양심 한 묶음\""
        document.getElementById("itemName").innerText = itemName;
        document.getElementById("itemImg").style.backgroundImage = "url('/res/img/musigi-package.png')";
        document.getElementById("description").innerHTML = description2
    } else {
        alert("잘못된 접근입니다.");
        location.replace("/products/products.html");
    }

    document.getElementById("price").innerText = "가격 : " + (Number(itemNum)*1000)
  }

function price() {
  count = document.getElementById("count").value;
  document.getElementById("price").innerText = "가격 : " + Number(count)*Number(itemNum*1000)
}

function addBag() {
  const baggedItem = Number(localStorage.getItem(itemName))
  localStorage.setItem(itemName, Number(count)+Number(baggedItem))
  console.log(Number(count)+Number(baggedItem))
  var bagConfirmResponse = confirm(itemName + " " + Number(count) + "개가 장바구니에 담겼습니다!\n장바구니로 이동할까요?")
  if(bagConfirmResponse===true) {
    console.log("true")
    location.href = "/bag/bag.html"
  }
}

function buy(payName) {
  var buyConfirmResponse = confirm(payName + "로 " + itemName + " " + Number(count) + "개를 구매하시겠습니까?")
  if(buyConfirmResponse===true) {
    alert("구매하기 기능은 아직 준비중입니다 ㅜㅜ\n불편을 드려 죄송합니다.")
  }
}
