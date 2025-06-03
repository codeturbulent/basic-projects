function downloadFile(filename, content) {
  // It works on all HTML5 Ready browsers as it uses the download attribute of the <a> element:
  const element = document.createElement("a");

  //A blob is a data type that can store binary data
  // "type" is a MIME type
  // It can have a different value, based on a file you want to save
  const blob = new Blob([content], { type: "plain/text" });

  //createObjectURL() static method creates a DOMString containing a URL representing the object given in the parameter.
  const fileUrl = URL.createObjectURL(blob);

  //setAttribute() Sets the value of an attribute on the specified element.
  element.setAttribute("href", fileUrl); //file location
  element.setAttribute("download", filename); // file name
  element.style.display = "none";

  //use appendChild() method to move an element from one element to another
  document.body.appendChild(element);
  element.click();

  //The removeChild() method of the Node interface removes a child node from the DOM and returns the removed node
  document.body.removeChild(element);
}

// function to encode data

function convert() {
  // function to get random no
  var text = "myy name is himanshu";
  var x1 = Math.random() * 100;
  x1 = x1 | 0;
  if (x1 == 0) {
    x = 8;
  } else if (x1 == 1) {
    x = 5;
  } else if (x1 >= 36) {
    x = ((Math.random() + 2) * 10) | 0;
  } else {
    x = x1;
  }
  var x1 = Math.random() * 100;
  x1 = x1 | 0;
  if (x1 == 0) {
    x2 = 8;
  } else if (x1 == 1) {
    x2 = 5;
  } else if (x1 >= 36) {
    x2 = ((Math.random() + 2) * 10) | 0;
  } else {
    x2 = x1;
  }
  console.log(x);
  // function to change  ot random base


  var input = document.getElementById("text").value;


  // encoading
  var output = "";
  for (i = 0 ,j=1; i < input.length,j<input.length; i+=2 , j+=2) {
    output +=  input[i].charCodeAt(0).toString(x) + "`" + input[j].charCodeAt(0).toString(x2)+".";
    console.log(i , j)
  }
  
 

  // to get file name

  //The value of the file name input box
  const filename = x +"."+x2+"."+ "txt";

  //The value of what has been input in the textarea
  const content = output;

  // running functon to download file
  downloadFile(filename, content);
  
}

document.getElementById("download").addEventListener("click", (e) => {
  
  convert();
});
