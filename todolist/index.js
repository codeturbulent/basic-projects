let doneCount = 0;
let srNo = 1;

document.getElementById("todoForm").addEventListener("submit", function (e) {
  e.preventDefault();
  save();
  this.reset();
});

function save() {
  const current = new Date();
  const time = current.toLocaleTimeString();
  const dateStr = current.toLocaleDateString();

  const area = document.getElementById("textar").value;
  const title = document.getElementById("text").value;

  const tableBody = document.getElementById("todoTableBody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>\${srNo++}</td>
    <td title="\${area}">\${title}</td>
    <td title="\${dateStr}">\${time}</td>
    <td class="tdbtn" onclick="deleteRow(this)">Remove</td>
    <td class="tdbtn" onclick="doneRow(this)">Check</td>
  `;

  tableBody.appendChild(row);
}

function removeAll() {
  document.getElementById("todoTableBody").innerHTML = "";
  srNo = 1;
}

function deleteRow(btn) {
  btn.closest("tr").remove();
}

function doneRow(btn) {
  doneCount++;
  document.getElementById("doneCount").innerText = doneCount;
  deleteRow(btn);
}

function checkAll() {
  const rows = document.querySelectorAll("#todoTableBody tr");
  doneCount += rows.length;
  document.getElementById("doneCount").innerText = doneCount;
  removeAll();
}
