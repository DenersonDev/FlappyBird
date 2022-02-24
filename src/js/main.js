console.log('Flappy Bird - Dener')

const sprites = new Image()
sprites.src = './src/images/sprites.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

const FlappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    positionX: 15,
    positionY: 50,
    velocidade: 0,
    gravidade: 0.25,
    
    atualiza(){
        this.velocidade += this.gravidade
        this.positionY += this.velocidade
    },

    desenha(){
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.positionX, this.positionY,
            this.largura, this.altura
        )
    }
}

const Chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    positionX:0,
    positionY: canvas.height - 112,

    desenha(){
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.positionX, this.positionY,
            this.largura, this.altura
        )
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.positionX + this.largura, this.positionY,
            this.largura, this.altura
        )
    }    
}

const Fundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    positionX:0,
    positionY: canvas.height - 204,

    desenha(){
        contexto.fillStyle = '#70c5ce'
        contexto.fillRect(0,0,canvas.width, canvas.height)
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.positionX, this.positionY,
            this.largura, this.altura
        )
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.positionX + this.largura, this.positionY,
            this.largura, this.altura
        )
    }    
}

function loop(){
    FlappyBird.atualiza()

    Fundo.desenha()
    Chao.desenha()
    FlappyBird.desenha()


    requestAnimationFrame(loop)
}

loop()