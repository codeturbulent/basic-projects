function clearScreen() {
  document.getElementById("smscr").value = "";
  document.getElementById("lrscr").value = "";
}

function appendValue(val) {
  document.getElementById("lrscr").value += val;
}

function calculate() {
  let x = document.getElementById("lrscr").value;
  if (!x) return;
  
  document.getElementById("smscr").value = x;
  try {
    let y = eval(x);
    document.getElementById("lrscr").value = y;
  } catch (e) {
    document.getElementById("lrscr").value = "Error";
    setTimeout(clearScreen, 1500);
  }
}
