
function getParticles(numberOfParticles = 5000){

    class Particle {
    
        constructor(){
    
            //Position
            this.x = Math.random() * 1920;
    
            this.y = 0;
    
            this.speed = 0;
    
            this.velocity =  Math.random() * 3.5  + 1;// 0 a 3.5
    
            this.size = Math.random() * 2.5 + 0.5;
        }
    
        update(width, height){
    
            this.y += this.velocity;

            this.x -= this.velocity;

            if(this.y >= height){
    
                this.y = 0;
                this.x = Math.random() * width;
            }

            if(this.x <= 0){
    
                this.x = width;
                this.y = Math.random() * height;
            }
    
        }
    
        draw(ctx, width, height){

            ctx.fillStyle = '#ffffff';
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
    
            this.update(width, height);
        }
    }


    const particles = [];

    for (let i = 0; i < numberOfParticles; i++) {
        
        particles.push( new Particle() );
    }

    return particles;
}


export function BackgroundAnimation(){

    const particles = getParticles(500);

    return {
        draw: (canvas) => {

            const ctx = canvas.getContext('2d');

            ctx.globalAlpha = 0.5;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach( particle => particle.draw(ctx, canvas.width, canvas.height) );
        }
    }
}










    



    