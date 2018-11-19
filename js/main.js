$( document ).ready(function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
 
    // ici sont instanciées les variables
    var link;
    var radius;
    var gomme = false;
    var filler = false;
    var tool = "pen";
    var paint;
    var mouseX;
    var mouseY;
    var last_mouseX;
    var last_mouseY;

    var color = $("#palette").val();
    var width = $("#number").val();
    context.lineJoin = "round";
    context.lineWidth = width;
    context.strokeStyle = color;
    context.fillStyle = color;

    //ici les event boutons

    $('#palette').on('change',function(){
        color = $("#palette").val();
        context.strokeStyle = color;
        context.fillStyle = color;
        });

    $('#number').on('change',function(){
        width = $("#number").val();
        if (width > 50){
            width = 50;
        }
        context.lineWidth = width;
    });

    $("#line").click(function () { 
        tool = "line";
        gomme = false;
        context.globalCompositeOperation="source-over";
    });

    $("#circle").click(function () { 
        tool = "circle";
        gomme = false;
        context.globalCompositeOperation="source-over";
    });

    $("#fill").click(function () {
        if (filler == true){
            filler = false;
        }
        else {
            filler = true;
        }
    });

    $("#eraser").click(function () {
        gomme = true;
        tool = "pen";
    });

    $("#pen").click(function () { 
        tool = "pen";
        gomme = false;
        context.globalCompositeOperation="source-over";
    });

    $("#rectangle").click(function () { 
        tool = "rectangle";
        gomme = false;
        context.globalCompositeOperation="source-over";
    });

    $("#clear").click(function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    // ici le boutton de download canavas

    var link = document.createElement('a');
    link.innerHTML = 'download image';
    $(link).addClass('save');
    
    $('#save').append(link);

    $(".save").click(function () {
        link.href = canvas.toDataURL();
    link.download = "mypainting.png";
    });

    // ici les outils

    $('#canvas').mousedown(function(e){
        if(tool == "pen"){
             mouseX = e.pageX - this.offsetLeft;
            mouseY = e.pageY - this.offsetTop;
            context.beginPath();
            context.moveTo(mouseX, mouseY);
            paint = true;
        }
        else if(tool == "line"){
            mouseX = e.pageX - this.offsetLeft;
            mouseY = e.pageY - this.offsetTop;
            context.beginPath();
            context.moveTo(mouseX, mouseY);
        }
        else if (tool == "rectangle"){
            last_mouseX = e.pageX - this.offsetLeft;
            last_mouseY = e.pageY - this.offsetTop;
        }
        else if (tool == "circle"){
            mouseX = e.pageX - this.offsetLeft;
            mouseY = e.pageY - this.offsetTop;
        }
       
    });

    $('#canvas').mousemove(function(e){
        if (tool == "pen"){
            if(paint){
                mouseX = e.pageX - this.offsetLeft;
                mouseY = e.pageY - this.offsetTop;
                context.lineTo(mouseX, mouseY);
                if (gomme == true){
                    context.globalCompositeOperation="destination-out";
                }
                else{
                    context.globalCompositeOperation="source-over";
                }
                context.stroke();
            }
        }
        
    });


    $('#canvas').mouseup(function(e){
        if (tool == "pen"){
            paint = false;
        mouseX = e.pageX - this.offsetLeft;
        mouseY = e.pageY - this.offsetTop;
        context.lineTo(mouseX, mouseY);
        if (gomme == true){
            context.globalCompositeOperation="destination-out";
        }
        else{
            context.globalCompositeOperation="source-over";
        }
        context.stroke();
        }
        else if(tool == "line"){
            mouseX = e.pageX - this.offsetLeft;
            mouseY = e.pageY - this.offsetTop;
            context.lineTo(mouseX, mouseY);
            
            context.stroke();
        }
        else if (tool == "rectangle"){
            mouseX = e.pageX-this.offsetLeft;
            mouseY = e.pageY-this.offsetTop;
            context.beginPath();
            var width = mouseX-last_mouseX;
            var height = mouseY-last_mouseY;
            if (filler == true){
                context.fillRect(last_mouseX,last_mouseY,width,height);
            }
            else{
                context.rect(last_mouseX,last_mouseY,width,height);
            }
            
            context.stroke();
        }
        else if (tool == "circle"){
            last_mouseX = e.pageX - this.offsetLeft;
            last_mouseY = e.pageY - this.offsetTop;
            let x = mouseX - last_mouseX;
            let y = mouseY - last_mouseY;

            radius = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
            context.beginPath();
            context.arc(mouseX,mouseY,radius,0,2*Math.PI);
            if (filler){
                context.fill();
            }else{
                context.stroke();
            }
        }
    });

    document.getElementById('image').onchange = function(e) {
        var img = new Image();
        img.src = URL.createObjectURL(this.files[0]);
        img.onload = draw;
        img.onerror = failed;
      };
      function draw() {
        context.drawImage(this, 0,0,1100,800);
      }
      function failed() {
        console.error("The provided file couldn't be loaded as an Image media");
      }
	     

	 

});