var vlib = {
    init(){
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("width",500);
        this.canvas.setAttribute("height",500);

        this.tools = document.getElementById("tools");
        this.tool = document.getElementsByClassName('tool');

        let stream;
        
        this.video = document.querySelector('#v1');
        this.ctx = this.canvas.getContext('2d');
        this.w = this.video.width;
        this.h = this.video.height;
        this.btnStart = document.querySelector('#start');
        this.btnCapture = document.querySelector('#capture');
        this.btnSave = document.querySelector('#save');

        this.divVideo = document.querySelector("#divVideo");
        this.divStart = document.querySelector("#divStart");
        this.output = document.querySelector("#imgOutput");
        this.count = document.querySelector("#divCount");
        this.img;
        this.startCamera();
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
            }, 1000); 
        
        setTimeout( async ()=>{
            //on capture une img de la video
            this.ctx.drawImage(this.video,0,0,500,500,10,10,480,490);

            this.img = document.createElement("img");
            this.img.src = this.canvas.toDataURL('image/jpeg', 1.0);

            try{
                this.stream.getTracks()[0].stop();
            }catch(error){
                console.log(error);
            }
            this.output.prepend(this.img);

            let retry = document.createElement('p');
            retry.innerHTML = "RETRY";
            retry.setAttribute('onclick','vlib.retry()');
            retry.className+='retry';
            this.divStart.appendChild(retry);

            //this.divVideo.outerHTML="";
            this.divVideo.parentNode.removeChild(this.divVideo);
            this.btnSave.removeAttribute("hidden");
            
            for(let i =0; i<8;i++) this.tool[i].removeAttribute('hidden');

            } ,6000);
        

    },
    async startCamera(){
        try{
           this.stream = await navigator.mediaDevices.getUserMedia({video:true})//return a promise
          // this.video.removeAttribute("hidden");
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

    applyFilter: function(filter){
        if(filter=='blur') {
            this.img.className='';
            this.img.className+='blur';
            this.ctx.filter = "blur(5px)";
        }
        else if(filter=='contrast'){
            this.img.className='';
            this.img.className+='contrast';
            this.ctx.filter = "contrast(150%)";
        }
        else if(filter=='brightness'){
            this.img.className=''; 
            this.img.className+='brightness';
            this.ctx.filter+='brightness(150%)';
        }
        else if(filter=='invert'){
            this.img.className='';
            this.img.className+='invert';
            this.ctx.filter+='invert(100%)';
        }
        else if(filter=='hue'){
            this.img.className='';
            this.img.className+='hue';
            this.ctx.filter+='hue(90deg)';
        }
        else if(filter=='grayscale'){
            this.img.className='';
            this.img.className+='grayscale';
            this.ctx.filter+='grayscale(100%)';
        }
        else if(filter=='sephia'){
            this.img.className='';
            this.img.className+='sephia';
            this.ctx.filter+='sephia(100%)';
        }
        else if(filter=='none'){
            this.img.className='';
            this.img.className+='none';
            this.ctx.filter+='none';
        }
        this.ctx.width = this.img.width;
        this.ctx.height = this.img.height;
        this.ctx.drawImage(this.img,0,0, this.img.width, this.img.height);
       // this.ctx.filter = "sepia(100%)";
        this.btnSave.href = this.canvas.toDataURL('image/jpeg', 1.0);
        
    }
}

