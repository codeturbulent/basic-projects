document.getElementById("viewBtn").addEventListener("click", function () {
  const fileInput = document.getElementById("fileInput");
  if (fileInput.files.length === 0) {
    alert("Please select a file first.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    document.getElementById("fileDisplay").innerText = this.result;
  };
  reader.onerror = function () {
    alert("Error reading file.");
  };
  reader.readAsText(fileInput.files[0]);
});
