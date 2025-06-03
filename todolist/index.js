var current = new Date();
var hrs = current.getHours();
var miut = current.getMinutes();
var sec = current.getSeconds();
var date = current.getDate();
var month = current.getMonth() + 1;
var year = current.getFullYear();
var time = hrs + ":" + miut + ":" + sec;
console.log(time);
var dateo = date + "/" + month + "/" + year;
console.log(dateo);

function save() {
  var area = document.getElementById("textar").value;
  var title = document.getElementById("text").value;
  var text = `<tr> <td width="70px"></td> <td width="500px"  title="${area}" >${title}</td> <td width="120px" title="${dateo}" >${time}</td> <td class="tdbtn" width="110px" onClick="deleteRow(this)">Remove</td> <td  width="100px" class="tdbtn" onClick="doneRow(this)">Check </td> </tr>`;
  let table = document.getElementById("table");
  console.log(text);

  table.innerHTML += text;
}
function remove() {
  let table = document.getElementById("table");
  var empty = "";
  table.innerHTML = empty;
}
function deleteRow(obj) {
  var index = obj.parentNode.rowIndex - 1;
  var table = document.getElementById("table");
  table.deleteRow(index);
}
function done() {
  var index = document.getElementById("table").rows.length;
  remove();


  var taskdone = eval(parseInt(document.querySelector('span').textContent, 10) + index);
  document.querySelector("span").innerHTML = taskdone;
}
function doneRow(obj){

  var taskdone = eval(parseInt(document.querySelector('span').textContent, 10) + 1);
  document.querySelector("span").innerHTML = taskdone;
  deleteRow(obj);
}
