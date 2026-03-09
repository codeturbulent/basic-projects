document.getElementById("download").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const fileName = file.name;
  const parts = fileName.split(".");
  if (parts.length < 3) {
    alert("Invalid file format. Please do not rename the encoded files.");
    return;
  }

  const base1 = parseInt(parts[0]);
  const base2 = parseInt(parts[1]);

  const reader = new FileReader();
  reader.onload = function (e) {
    const content = e.target.result;
    // Split by ` or . and remove empty strings
    const codes = content.split(/[`.]/).filter((x) => x.length > 0);
    let output = "";

    for (let i = 0; i < codes.length; i++) {
      const base = i % 2 === 0 ? base1 : base2;
      try {
        const charCode = parseInt(codes[i], base);
        if (!isNaN(charCode)) {
          output += String.fromCharCode(charCode);
        }
      } catch (err) {
        console.error("Error decoding character:", codes[i], err);
      }
    }
    document.getElementById("text").value = output;
  };
  reader.readAsText(file);
});
