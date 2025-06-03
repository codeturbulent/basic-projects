document.getElementById("myBtn").addEventListener("click", function() {

    var reader = new FileReader();
    reader.addEventListener('load', function() {
      document.getElementById('file').innerText = this.result;
    });
    reader.readAsText(document.querySelector('input').files[0]);
  
  });

for (i = 0;i>100;i+=1) {

}