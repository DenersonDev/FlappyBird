console.log('Flappy Bird - Dener')

const sprites = new Image()
sprites.src = './src/images/sprites.png'

const somde_HIT = new Audio('./src/effects/efeitos_hit.wav')

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

const verificaColisão = (item1, item2) =>{
    const fator1 = item1.positionY + item1.altura
    const fator2 = item2.positionY

    if (fator1 >= fator2){
        return true
    }
    return false
}

const TelaInicio = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    positionX: (canvas.width / 2) - (174 /2) ,
    positionY: 50,

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

const FlappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    positionX: 15,
    positionY: 50,
    velocidade: 0,
    gravidade: 0.25,
    pulo: 4.6,
    
    atualiza(){
        if (verificaColisão(this, Chao)){
            somde_HIT.play()
            setTimeout(() => {
                mudaTela(Telas.INICIO)
            }, 0.5*1000);
            return
        }
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
    },

    pula(){
        this.velocidade = - this.pulo
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

//
//[Telas]
//
let telaAtiva = {}
function mudaTela(novaTela){
    telaAtiva = novaTela
}
const Telas = {
    INICIO:{
        desenha(){
            Fundo.desenha()
            Chao.desenha()
            FlappyBird.positionY = 50
            FlappyBird.velocidade = 0
            FlappyBird.desenha()
            TelaInicio.desenha()
        },
        atualiza(){

        },
        click(){
            mudaTela(Telas.INGAME)
        }
    },
    INGAME:{
        desenha(){
            Fundo.desenha()
            Chao.desenha()
            FlappyBird.desenha()
        },
        atualiza(){
            FlappyBird.atualiza()

        },
        click(){
            FlappyBird.pula()
        }
    }
}
// Fim de telas

function loop(){
    telaAtiva.atualiza()
    telaAtiva.desenha()
    requestAnimationFrame(loop)
}

window.addEventListener('mousedown', function(){
    if (telaAtiva.click){
        telaAtiva.click()
    }
})

mudaTela(Telas.INICIO)
loop()