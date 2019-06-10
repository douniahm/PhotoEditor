var vlib = {
    init(){
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.canvas.setAttribute("width",400);
        this.canvas.setAttribute("height",400);

        this.tools = document.getElementById("toolsContainer");
        this.tool = document.getElementsByClassName('tool');        
        this.video = document.querySelector('#v1');
        this.w = this.video.width;
        this.h = this.video.height;
        this.btnStart = document.querySelector('#start');
        this.btnUpload = document.querySelector('#upload');
        this.btnCapture = document.querySelector('#capture');
        this.btnDownload = document.querySelector('.download');
        this.saveDiv = document.querySelector(".save");
        this.retry = document.querySelector(".retry");
        this.del = document.querySelector(".delete");
        this.divVideo = document.querySelector("#divVideo");
        this.divStart = document.querySelector("#divStart");
        this.outputs = document.querySelector("#imgOutput");
        this.outputs2 = document.querySelector("#outputs");
        this.title = document.querySelector("#divCount");
        this.uploadModal = document.querySelector("#uploadModal");

        let stream;
        this.downloadLink;
        this.saveButton;
        this.cropper;
        this.isCropped = false;
    },
    lunchCamera(){
        this.init();
        this.startCamera();
        this.btnStart.setAttribute('hidden', 'true');
        this.btnUpload.setAttribute('hidden', 'true');
        this.outputs2.removeAttribute('hidden');
    },
    uploadPhoto(){
        this.init();
        this.btnStart.setAttribute('hidden', 'true');
        this.btnUpload.setAttribute('hidden', 'true');
    },
    getUploadedImg(event){
        var reader = new FileReader();
        this.img = document.createElement("img");
        this.img.id="img" ;
        this.img.setAttribute('width','400px');
        this.img.setAttribute('height','400px');
        reader.onload = function() {
            vlib.img.setAttribute('src',reader.result);
            vlib.OriginImage = vlib.img.src;
            vlib.outputs.prepend(vlib.img);
            console.log(vlib.img);
        }
        reader.readAsDataURL(event.target.files[0]);
    },
    capture(){
        this.btnCapture.setAttribute('hidden', 'true');
        let i = 4;
        this.divVideo.removeAttribute('hidden');
        const interval = setInterval( () => {
            if(i==4) this.title.innerHTML = 'Get Ready..' ;
            else this.title.innerHTML = i ;
            i -= 1;
            if(i == 0){
                clearInterval(interval);
            }
            }, 1000); 
        
        setTimeout( async ()=>{
            //capture video
            this.ctx.drawImage(this.video,0,0,this.video.width, this.video.height);
            this.img = document.createElement("img");
            this.img.id="img" ;
            this.img.src = this.canvas.toDataURL('image/jpeg', 1.0);
            this.OriginImage = this.img.src;

            try{
                this.stream.getTracks()[0].stop();
            }catch(error){
                console.log(error);
            }

            this.divVideo.parentNode.removeChild(this.divVideo);
            this.title.innerHTML = "";
            
            this.generateEditor();

            } ,6000);  
    },
    generateEditor(){
        //this.outputs2.removeAttribute('hidden');
        //create save button
        this.saveButton = document.createElement('a');
        this.saveButton.innerHTML = "<img src='https://img.icons8.com/ios/20/ffffff/save-as-filled.png' alt='save changes'>"
        this.saveButton.setAttribute('onclick', 'vlib.saveImage()');
        this.saveButton.className += "download";  
        
        //create reset button
        let retry = document.createElement('a');
        retry.innerHTML = "<img src='https://img.icons8.com/ios5/20/ffffff/synchronize-filled.png' alt='retry'>";
        retry.setAttribute('onclick', 'vlib.applyFilter("none",0)');
        retry.className += "download";    

        //create download link
        this.downloadLink = document.createElement('a');
        this.downloadLink.innerHTML = "<img src='https://img.icons8.com/material/20/ffffff/downloads.png' alt='download'>"
        this.downloadLink.setAttribute('download', 'picture.jpeg')
        this.downloadLink.className += "download";            
        this.downloadImage();

        //create delete button
        let del = document.createElement('a');
        del.innerHTML = "<img src='https://img.icons8.com/ios/20/ffffff/housekeeping-filled.png' alt='retry'>";
        del.setAttribute('onclick', 'vlib.cleanEditor()');
        del.className += "download"; 

        this.outputs.prepend(this.img);/////////////////////////////
        this.btnDownload.prepend(this.downloadLink);
        this.saveDiv.prepend(this.saveButton);
        this.retry.prepend(retry);
        this.del.prepend(del);
        this.tools.removeAttribute('hidden');
        //for(let i =0; i<10;i++) this.tool[i].removeAttribute('hidden');
    },
    async startCamera(){
        try{
           this.stream = await navigator.mediaDevices.getUserMedia({video:true})//return a promise
           this.video.srcObject = this.stream
           this.video.play()
           this.btnStart.parentNode.removeChild(this.btnStart);
           this.divVideo.removeAttribute("hidden");
           this.btnCapture.removeAttribute('hidden');
        }catch(error){
            console.log(error);
        }
    },
    retry: function(){
        window.location.reload();
    },
    cleanEditor(){
        window.location.reload();
    },
    //save change: capture and update image
    saveImage: function(){
        if(this.isCropped){//cropped image not yet saved
            const src = this.cropper.getCroppedCanvas({
                width: this.img.width,
                height: this.img.height,
                fillColor: '#fff'
           }).toDataURL('image/jpeg', 1.0);
           this.cropper.destroy();
           this.img.src = src;
           this.downloadLink.href = src;
           this.isCropped = false;
        }else{
            this.ctx.width = this.img.width;
            this.ctx.height = this.img.height;
            this.ctx.drawImage(this.img,0,0, this.img.width, this.img.height);
            const src = this.canvas.toDataURL('image/jpeg', 1.0); 
            this.ctx.filter='none';
            this.img.className='';
            this.downloadLink.href = src;
            this.img.src = src;
        }
    },
    downloadImage: function(){
        this.ctx.width = this.img.width;
        this.ctx.height = this.img.height;
        this.ctx.drawImage(this.img,0,0, this.img.width, this.img.height);
        this.downloadLink.href = this.canvas.toDataURL('image/jpeg', 1.0); 
    },
    applyFilter: function(filter,value){
        if(filter=='none'){
            this.ctx.filter='none';
            this.img.src=this.OriginImage;
        }
        else if(filter=='blur') {
            //this.img.className='blur';
            this.img.style.webkitFilter = "blur("+value+"px)";
          //  this.img.style.filter = "blur("+value+"px)";
            this.ctx.filter = "blur("+value+"px)";
        }
        else if(filter=='contrast'){
            this.img.style.webkitFilter = "contrast("+value+"%)";
            this.ctx.filter = "contrast("+150+"%)";
        }
        else if(filter=='brightness'){
            this.img.style.webkitFilter = "brightness("+value+"%)";
            this.ctx.filter='brightness('+value+'%)';
        }
        else if(filter=='invert'){
            this.img.style.webkitFilter = "invert("+value+"%)";
            this.ctx.filter='invert('+100+'%)';
        }
        else if(filter=='hue'){
            this.img.style.webkitFilter = "hue-rotate("+value+"deg)";
            this.ctx.filter='hue-rotate('+value+'deg)';
        }
        else if(filter=='grayscale'){
            this.img.style.webkitFilter = "grayscale("+value+"%)";
            this.ctx.filter='grayscale('+value+'%)';
        }
        else if(filter=='sepia'){
            this.img.style.webkitFilter = "sepia("+value+"%)";
            this.ctx.filter='sephia('+value+'%)';
        }
        else if(filter=='saturation'){
            this.img.style.webkitFilter = "saturate("+value+"%)";
            this.img.style.filter = "saturate("+value+"%)";
            this.ctx.filter='saturate('+value+'%)';
        }
        else if(filter=="crop"){
            this.cropper = new Cropper(this.img);
            this.isCropped = true;
        }
    },
}

