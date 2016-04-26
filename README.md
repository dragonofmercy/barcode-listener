# jQuery Barcode Listener
Simple jQuery plugin to detect scanning from a barcode scanner.

## Usage

````javascript
$('body').barcodeListener().on('barcode.valid', function(e, code){
    console.log(code);
})
````