debugger;
function showFile(input) {
  let file = input.files[0];
  alert(`Uploading File .... ${file.name}`);

  return (filename = file.name);
}
document.getElementById("download").addEventListener("change", function () {
  var fr = new FileReader();
  fr.onload = function () {
    var x = filename.indexOf(".");
    var x2 = parseInt(filename.slice(x + 1, x + 3));
    var x1 = parseInt(filename.slice(0, x));
    var predec = fr.result;
    var output = "";
    for (
      i = 0, j = 1;
      i < predec.length + 5, j < predec.length + 5;
      i += 2, j += 2
    ) {
      var symbol1 = predec.indexOf("`");
      var no1 = parseInt(predec.slice(0, symbol1), x1);
      predec = predec.slice(symbol1 + 1);
      var symbol2 = predec.indexOf(".");
      var no2 = parseInt(predec.slice(0, symbol2), x2);
      predec = predec.slice(symbol2 + 1);
      no1 = no1.toString(10);
      no2 = no2.toString(10);
      no1 = String.fromCharCode(no1);
      no2 = String.fromCharCode(no2);

      console.log(i, j);
      output += no1 + "" + no2;
    }
    document.getElementById("text").textContent = output;
  };
  fr.readAsText(this.files[0]);
});
