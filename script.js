var vlib = {
    init(){
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("width",500);
        this.canvas.setAttribute("height",500);
        
        this.video = document.querySelector('#v1');
        this.ctx = this.canvas.getContext('2d');
        this.w = this.video.width ;
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
    save(){
        this.btnSave.href = this.img.src;
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
        
        setTimeout( ()=>{
            //on capture une img de la video
            this.ctx.drawImage(this.video,0,0,500,500,10,10,480,490);

            this.img = document.createElement("img");
            this.img.src = this.canvas.toDataURL('image/jpeg', 1.0);
            this.output.prepend(this.img);

            this.divVideo.setAttribute("hidden", true);
            this.btnSave.removeAttribute("hidden");
        } ,6000)
    },
    async startCamera(){

        let stream
        try{
           stream = await navigator.mediaDevices.getUserMedia({video:true})//return a promise
          // this.video.removeAttribute("hidden");
           this.video.srcObject = stream
           this.video.play()
           this.btnStart.setAttribute("hidden",true);
           this.divVideo.removeAttribute("hidden");
        }catch(error){
            console.log(error);
        }
    }
}
