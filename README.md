# Photo Editor

## Application
This app is a simple photo editor that allows to take a picture from computer's user using computer camera or upload it, apply some filters like adding brightness, constrat, blur and others. We can also crop image and save/download it with changes.

## Technologies
Created with Javascript, Bootstrap, CropJs and canvas API

## Wireframes
![6](https://user-images.githubusercontent.com/36522492/59168465-c10aa400-8b2d-11e9-9c62-d915d5dff28b.PNG)
----

## DEMO

* Interface: 
![1](https://user-images.githubusercontent.com/36522492/59168443-b51ee200-8b2d-11e9-98c2-a66cbdc5a635.PNG)

* Take a picture
![5](https://user-images.githubusercontent.com/36522492/59168464-c0720d80-8b2d-11e9-8199-fde920505725.PNG)

* Or upload it
![2](https://user-images.githubusercontent.com/36522492/59168447-b7813c00-8b2d-11e9-8ab0-e24558f91659.PNG)

------

* Edit Photo, apply filters
![3](https://user-images.githubusercontent.com/36522492/59168456-bb14c300-8b2d-11e9-8f07-378df67a41d8.PNG)
-----

* Crop and save image: 
![4](https://user-images.githubusercontent.com/36522492/59168458-bbad5980-8b2d-11e9-9578-381f94edf05e.PNG)
----

## Explanatory code
* Start Camera: Using navigator media devices
```
this.stream = await navigator.mediaDevices.getUserMedia({video:true})
```
* Take picture: Using canvas 
```
this.ctx.drawImage(this.video,0,0,this.video.width, this.video.height);
this.img = document.createElement("img");
this.img.id="img" ;
this.img.src = this.canvas.toDataURL('image/jpeg', 1.0);
```
* Apply filters: Example of Blur filter

**HTML**
```
<div id="blur" class="tool" onclick="vlib.applyFilter('blur')">Blur</div>
```
**Javascript**: we use CSS Filters to apply the filter and canvas the image modified
```
if(filter=='blur') {
            this.img.className='';
            this.img.className ='blur';
            this.ctx.filter = "blur(5px)";
}
```
* Save filters
```
this.ctx.drawImage(this.img,0,0, this.img.width, this.img.height);
this.img.sr = this.canvas.toDataURL('image/jpeg', 1.0); 
```
* Download image
```
this.ctx.drawImage(this.img,0,0, this.img.width, this.img.height);
this.downloadLink.href = this.canvas.toDataURL('image/jpeg', 1.0); 
```


### Dounia Ait Hammi
