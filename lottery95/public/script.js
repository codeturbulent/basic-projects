
// Timer Function 
function timer() {
    var box = document.getElementById("timer");
    var systemtime = new Date();
    var nowtimelists = String(systemtime).split(" ")
    var curtime = nowtimelists[4].split(":")
    var nowhr = 16 + 23 - Number(curtime[0])
    if (nowhr > 23) {
        nowhr = nowhr - 24
    }
    var nowmin = 59 - Number(curtime[1])
    var nowsec = 59 - Number(curtime[2])
    box.innerHTML = nowhr + ":" + nowmin + ":" + nowsec
}
setInterval(timer, 1000)

function showlogin(element) {
    document.getElementById("formc").style.display = "flex"
    numberChoosen = element.innerHTML
    console.log(numberChoosen)
    document.getElementById("betting").value = numberChoosen
    document.getElementById("change").innerHTML = numberChoosen
}
function closebet() {
    document.getElementById("formc").style.display = "none"
}
function copy() {


    navigator.clipboard.writeText("upiod");
    document.getElementById("clip").innerHTML = "Upi Id # Coppied #"

}
// Loading numbers
fetch('https://sheetdb.io/api/v1/1ul6ojuovasee?cast_numbers=first,second,third&limit=1')
    .then((response) => response.json())
    .then((data) => document.getElementById("data").innerHTML=`<button id="num1" onclick="showlogin(this)">${data[0].first}</button>\
    <button id="num2" onclick="showlogin(this)">${data[0].second}</button>\
    <button id="num3" onclick="showlogin(this)">${data[0].third}</button>`);