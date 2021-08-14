// If click the button on popup page of the extension, call checkPdf function
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("click-this").addEventListener("click", checkPdf);
});

// If the document is Pdf then call the modifyPDF with url
async function checkPdf() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let url = tabs[0].url;
        chrome.tabs.executeScript(tabs[0].id, { code: 'document.contentType' }, ([mimeType]) => {
            if (mimeType == 'application/pdf') {
                // Call modifyPdf function
                modifyPdf(url);
            }
            else {
                alert("Do nothing, as file is NOT PDF");
            }
        });
    });
}

// Open the Pdf and re-set the Mediabox with the 4*6 inch
async function modifyPdf(url) {
    // Import PDFDocument from pdf-lib
    const {
        PDFDocument,
    } = PDFLib;

    const originalPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(originalPdfBytes)

    // Get pages of the PDF
    const pages = pdfDoc.getPages();
    // Get the first page of the PDF
    const page = pages[0];

    // x:396 is the middle of the PDF page horizontally, new width = x + width
    // 4 in = 384 px, 6 in = 576 px
    // Set the new Mediabox x:396, y:0, width: x + 384 px, height: 576 px
   //mediaBox = page.getMediaBox();
    //console.log(mediaBox);
    //newWidth = mediaBox.x + 384
   
    page.setMediaBox(396, 0, 780, 576)
    // page.setMediaBox(396, 0, 384, 576)

    const pdfBytes = await pdfDoc.save()
    // Download the new cropped PDF file to local
    var filename = '4x6_' + url.substring(url.lastIndexOf('/')+1);
    //alert(filename);
    download(pdfBytes, filename, "application/pdf");
}