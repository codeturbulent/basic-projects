function downloadFile(filename, content) {
  const element = document.createElement("a");
  const blob = new Blob([content], { type: "text/plain" });
  const fileUrl = URL.createObjectURL(blob);

  element.setAttribute("href", fileUrl);
  element.setAttribute("download", filename);
  element.style.display = "none";

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function convert() {
  const input = document.getElementById("text").value;
  if (!input) {
    alert("Please enter some text to encode.");
    return;
  }

  // Random bases between 10 and 36
  const base1 = Math.floor(Math.random() * 27) + 10;
  const base2 = Math.floor(Math.random() * 27) + 10;

  let output = "";
  for (let i = 0; i < input.length; i++) {
    const base = i % 2 === 0 ? base1 : base2;
    const separator = i % 2 === 0 ? "`" : ".";
    output += input.charCodeAt(i).toString(base) + separator;
  }

  const filename = `\${base1}.\${base2}.txt`;
  downloadFile(filename, output);
}

document.getElementById("download").addEventListener("click", () => {
  convert();
});
