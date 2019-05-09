# Photo Editor

## Application
This app is a simple photo editor that allow to take a picture from computer's user, apply some filters like adding brightness, constrat, blur and others. We can also crop image and save/download it with changes.

## Technologies
Created with Javascript and canvas API

## Wieframes
* Interface 1

![wf1](https://user-images.githubusercontent.com/36522492/57416561-40841b00-71f0-11e9-8e35-4193f8139fd6.PNG)

* Interface 2

![wf4](https://user-images.githubusercontent.com/36522492/57416861-7c6bb000-71f1-11e9-9e69-55a5ac431569.PNG)

----
## DEMO

* Interface: 
![1](https://user-images.githubusercontent.com/36522492/57413864-59d39a00-71e5-11e9-9140-58e56e8408f6.PNG)

* Step 1: Take a picture
![2](https://user-images.githubusercontent.com/36522492/57413890-7e2f7680-71e5-11e9-922e-08ea0807c2b9.PNG)

------

* Step 2: Edit Photo, apply filters
![3](https://user-images.githubusercontent.com/36522492/57413894-825b9400-71e5-11e9-98ec-d6e6991e5aab.PNG)
![4](https://user-images.githubusercontent.com/36522492/57413906-8a1b3880-71e5-11e9-9fd2-54666c666e85.PNG)
![5 invert](https://user-images.githubusercontent.com/36522492/57413951-acad5180-71e5-11e9-816d-58859cef2211.PNG)
-----
* Crop and save image: 

![6 crop](https://user-images.githubusercontent.com/36522492/57413958-afa84200-71e5-11e9-9ab6-9a5e420b52b8.PNG)

![6 crop save](https://user-images.githubusercontent.com/36522492/57413961-b33bc900-71e5-11e9-97d9-cf1765449402.PNG)

* Step3: Download the picture
![7 download](https://user-images.githubusercontent.com/36522492/57413964-b59e2300-71e5-11e9-89f1-86cd989b7379.PNG)
----
## Sequence Diagram
* Taking picture:

![ds1](https://user-images.githubusercontent.com/36522492/57415509-0b75c980-71ec-11e9-8f1f-be0a0646acf8.PNG)

---
* Apllying Filters:

![ds 2](https://user-images.githubusercontent.com/36522492/57415512-0dd82380-71ec-11e9-8bd5-570d52de34a3.PNG)

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
* Apply filters: Exemple of Blur filter

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
* Download image: using a button
```
this.ctx.drawImage(this.img,0,0, this.img.width, this.img.height);
this.downloadLink.href = this.canvas.toDataURL('image/jpeg', 1.0); 
```


### Dounia Ait Hammi
### GLSID 2
