function drawText(text, fontSize, width){

    const padding = 10;

    const canvas = document.createElement('canvas');

    const ctx = canvas.getContext('2d');

    canvas.width = width;

    canvas.height = fontSize + padding;

    ctx.fillStyle = '#fff';

    ctx.font = `bold ${fontSize}px monospace`;

    if(canvas.width > ctx.measureText(text).width + padding ){

        //ctx.fillText(text, padding, fontSize);
        ctx.fillText(text, (width / 2) - (ctx.measureText(text).width / 2), fontSize);
    }
    else {

        const words = text.split(' ');

        let rows = [''];

        let index = 0;

        words.forEach((value, i) => {

            let text = rows[index] + value + ' ';

            if(canvas.width > ctx.measureText(text).width + padding){

                rows[index] = text;
            }
            else {
                index += i === 0 ? 0 : 1
                rows[index] = value + ' ';
            }
        });

        canvas.height = rows.length * fontSize + padding;

        ctx.fillStyle = '#fff';

        ctx.font = `bold ${fontSize}px monospace`;

        rows.forEach((text, i) => {

            ctx.fillText(text, padding, fontSize * (i + 1));
        });
    }

    return canvas;
}



class Particle {

    constructor(x, y, color, alpha){

        this.x = Math.random() * x;     this.y = Math.random() * y;

        this.origin = { x, y };

        this.size = 1;

        this.density = Math.random() * alpha * 10 + 1;

        this.color = color || '#fff';

        this.alpha = alpha;
        
    }

    update(mouse){
        
        //Calcular la Distancia entre el Mouse y las Particulas
        const dx = mouse.x - this.x;

        const dy = mouse.y - this.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        //Movimiento
        const forceDirectionX = dx / distance;

        const forceDirectionY = dy / distance;

        const force = (mouse.radius - distance) / mouse.radius;

        const movementX = forceDirectionX * force * this.density;

        const movementY = forceDirectionY * force * this.density;

        if(distance < mouse.radius){

            this.x -= movementX;
            this.y -= movementY;
        }
        else {

            if(this.x !== this.origin.x){

                let dx = this.x - this.origin.x;

                this.x -= dx / 10;
            }

            if(this.y !== this.origin.y){

                let dy = this.y - this.origin.y;

                this.y -= dy / 10;
            }
        }
    }

    draw(ctx, mouse = {radius: 0, x: 0, y: 0}){

        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        ctx.closePath();
        
        ctx.fill();
        
        this.update(mouse);
    }
}

function getParticles(canvas, distance){

    const particles = [];

    const ImageData = canvas.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height);

    for(let y = 0; y < ImageData.height; y++){

        for(let x = 0; x < ImageData.width; x++){

            let R = ImageData.data[(y * 4 * ImageData.width) + (x * 4)];
            let G = ImageData.data[(y * 4 * ImageData.width) + (x * 4 + 1)];
            let B = ImageData.data[(y * 4 * ImageData.width) + (x * 4 + 2)];
            let A = ImageData.data[(y * 4 * ImageData.width) + (x * 4 + 3)];

            if(A > 0){
                
                let color = `rgb(${R}, ${G}, ${B})`;
                let alpha = A;
                let px = x * distance;
                let py = y * distance;

                particles.push(new Particle(px, py, color, alpha / 100));
            }
        }
    }

    return particles;
}


//---------------------------------------------------------------------------------------------------------------------------

function drawMouseRadius(ctx, mouse){

    ctx.fillStyle = 'rgba(27, 154, 90, 0.3)';

    ctx.beginPath();

    ctx.ellipse(mouse.x, mouse.y, mouse.radius, mouse.radius, 0, 0, Math.PI * 2);

    ctx.fill();
}

function connectParticles(ctx, particles = [], maxDistance = 5){

    for (let i = 0; i < particles.length; i++) {

        for (let j = i; j < particles.length; j++) {
            
            const A = particles[i];     const B = particles[j];

            //Calcular la Distancia entre 2 Particulas
            const dx = A.x - B.x;

            const dy = A.y - B.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if(distance < maxDistance){

                let opacity = 1 - distance / maxDistance;

                ctx.strokeStyle = `rgba(255, 255, 255, ${0.4})`;
                ctx.beginPath();
                ctx.moveTo(A.x, A.y);
                ctx.lineTo(B.x, B.y);
                ctx.stroke();
            }
        }
    }
}

//---------------------------------------------------------------------------------------------------------------------------

const defaultOptions = {
    fontSize: 18,
    distance: 5,
    connect: true,
    connectDistance: 10,
    drawRadius: true
}

export function TextAnimation(canvas, text = '', opt = {}){

    const {fontSize, distance, connectDistance, connect, drawRadius} = {...defaultOptions, ...opt}

    const ctx = canvas.getContext('2d');

    const TextCanvas = drawText(text, fontSize, canvas.width / distance);
    
    canvas.height = TextCanvas.height * distance;

    //Show Text
    //ctx.putImageData( TextCanvas.getContext('2d').getImageData(0, 0, TextCanvas.width, TextCanvas.height), 0, 0);


    //Particles
    const Particles = getParticles(TextCanvas, distance);

    return {
        draw(mouseRef){

            const mouse = mouseRef.current;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            Particles.forEach( particle => particle.draw(ctx, mouse) );

            if(connect) connectParticles(ctx, Particles, connectDistance);

            if(drawRadius) drawMouseRadius(ctx, mouse);
        }
    }
}