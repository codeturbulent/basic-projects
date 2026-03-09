# EnCode (DarkSide)

A secure text encoder and decoder that uses a custom randomized radix encoding scheme to protect your confidential data.

## Features
- **Encode:** Converts your text into a series of numbers using randomly generated bases (bases 10-36).
- **Download:** Saves the encoded data into a `.txt` file with the secret keys embedded in the filename.
- **Decode:** Upload the encoded `.txt` file to instantly retrieve your original message.
- **Privacy:** All processing happens locally in your browser; no data is sent to any server.

## How to Use
### Encoding
1. Open `Index.html`.
2. Enter your confidential message in the text area.
3. Click "Download file".
4. **Important:** Do not rename the downloaded file, as the filename contains the keys needed for decoding.

### Decoding
1. Click the "Decode" link or open `index1.html`.
2. Click "Upload Your File Here" and select the encoded `.txt` file.
3. Your decoded message will appear in the text area.

## Technologies Used
- HTML5
- CSS3 (Matrix/Terminal aesthetic)
- JavaScript (Blob API, FileReader API, Custom Encoding)

## Credits
Created by [Himanshu Yadav](https://github.com/codeturbulent)
