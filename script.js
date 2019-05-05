var vlib = {
    init(){
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.canvas.setAttribute("width",500);
        this.canvas.setAttribute("height",500);

        this.tools = document.getElementById("tools");
        this.tool = document.getElementsByClassName('tool');

        let stream;
        let deg = 0; //degree of rotation
        
        this.video = document.querySelector('#v1');
        this.w = this.video.width;
        this.h = this.video.height;
        this.btnStart = document.querySelector('#start');
        this.btnCapture = document.querySelector('.capture');
        this.btnDownload = document.querySelector('.download');
        this.saveDiv = document.querySelector(".save");
        this.divVideo = document.querySelector("#divVideo");
        this.divStart = document.querySelector("#divStart");
        this.output = document.querySelector("#imgOutput");
        this.count = document.querySelector("#divCount");
        this.img;
        this.OriginImage;
        this.downloadLink;
        this.saveButton;
        this.startCamera();
        this.cropper;
        this.isCropped = false;
    },
    capture(){
        let i = 4;
        this.divVideo.removeAttribute('hidden');
        const interval = setInterval( () => {
            if(i==4) this.count.innerHTML = 'Get Ready..' ;
            else this.count.innerHTML = i ;
            i -= 1;
            if(i == 0){
                clearInterval(interval);
            }
            }, 500); 
        
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
            let retry = document.createElement('p');
            retry.innerHTML = "RETRY";
            retry.setAttribute('onclick','vlib.retry()');
            retry.className+='retry';
            this.divStart.appendChild(retry);

            this.divVideo.parentNode.removeChild(this.divVideo);
            this.btnCapture.setAttribute('hidden', 'true')
            this.count.setAttribute('hidden', 'true')

            //create save button
            this.saveButton = document.createElement('button');
            this.saveButton.innerHTML = "Save"
            this.saveButton.setAttribute('onclick', 'vlib.saveImage()')
            this.saveButton.className += "download";    
            //create download link
            this.downloadLink = document.createElement('a');
            this.downloadLink.innerHTML = "Download"
            this.downloadLink.setAttribute('role', 'button')
            this.downloadLink.setAttribute('download', 'picture.jpeg')
            this.downloadLink.className += "download";            
            this.downloadImage();

            this.output.prepend(this.img);
            this.btnDownload.prepend(this.downloadLink);
            this.saveDiv.prepend(this.saveButton);
            
            for(let i =0; i<10;i++) this.tool[i].removeAttribute('hidden');

            } ,6000);  
    },
    async startCamera(){
        try{
           this.stream = await navigator.mediaDevices.getUserMedia({video:true})//return a promise
          this.btnCapture.removeAttribute('hidden');
           this.video.srcObject = this.stream
           this.video.play()
           this.btnStart.parentNode.removeChild(this.btnStart);
           this.divVideo.removeAttribute("hidden");
        }catch(error){
            console.log(error);
        }
    },
    retry: function(){
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
    applyFilter: function(filter){
        if(filter=='blur') {
            this.img.className='';
            this.img.className ='blur';
            this.ctx.filter = "blur(5px)";
        }
        else if(filter=='contrast'){
            this.img.className='';
            this.img.className ='contrast';
            this.ctx.filter = "contrast(150%)";
        }
        else if(filter=='brightness'){
            this.img.className=''; 
            this.img.className='brightness';
            this.ctx.filter='brightness(150%)';
        }
        else if(filter=='invert'){
            this.img.className='';
            this.img.className='invert';
            this.ctx.filter='invert(100%)';
        }
        else if(filter=='hue'){
            this.img.className='';
            this.img.className='hue';
            this.ctx.filter='hue-rotate(90deg)';
        }
        else if(filter=='grayscale'){
            this.img.className='';
            this.img.className='grayscale';
            this.ctx.filter='grayscale(100%)';
        }
        else if(filter=='sephia'){
            this.img.className='';
            this.img.className='sephia';
            this.ctx.filter='sepia(100%)';
        }
        else if(filter=='none'){
            this.img.className='';
            this.img.className='none';
            this.ctx.filter='none';
            this.img.src=this.OriginImage;

        } else if(filter=='saturation'){
            this.img.className='';
            this.img.style.webkitFilter = "saturate(200%)";
            this.ctx.filter='saturate(200%)';
        }
        //DOES NOT WORK
        else if(filter=='rotate') {
            if(this.deg<270) this.deg+=90;
            else this.deg = 0;

            this.ctx.translate(this.img.width/2, this.img.height/2);
            this.ctx.rotate(this.deg*Math.PI/180);
            this.ctx.translate(-this.img.width/2, -this.img.height/2);
            this.saveImage();
            this.ctx.rotate(-this.deg*Math.PI/180);
            this.ctx.restore();
           /*
            this.img.style.transform = 'rotate('+this.deg+'deg)';
            this.ctx.translate(this.img.width/2, this.img.height/2);
            this.ctx.rotate(this.deg*Math.PI/180);
            this.ctx.translate(-this.img.width/2, -this.img.height/2);
            this.ctx.drawImage(this.img,0,0, this.img.width, this.img.height);
            this.saveImage();
            this.ctx.restore();*/
        }else if(filter=="crop"){
            this.cropper = new Cropper(this.img);
            this.isCropped = true;
        }
    },
}

