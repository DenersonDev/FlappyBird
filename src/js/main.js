console.log('Flappy Bird - Dener')

const sprites = new Image()
sprites.src = './src/images/sprites.png'
const somde_HIT = new Audio('./src/effects/efeitos_hit.wav')
const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')
let frames = 0

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
    movimentos:[
        {spriteX:0, spriteY:0},
        {spriteX:0, spriteY:26},
        {spriteX:0, spriteY:52}
    ],
    largura: 33,
    altura: 24,
    positionX: 15,
    positionY: 50,
    velocidade: 0,
    gravidade: 0.25,
    pulo: 4.5,
    frameatual: 0,
    
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

    atualizaFrameAtual(){
        const intervaloDeFrames = 10;
        if (frames % intervaloDeFrames == intervaloDeFrames - 1){
            const incremento = 1 + this.frameatual
            const baseRepetição = this.movimentos.length
            this.frameatual = incremento % baseRepetição
        }
    },

    desenha(){
        this.atualizaFrameAtual()
        const {spriteX,spriteY} = this.movimentos[this.frameatual]
        contexto.drawImage(
            sprites,
            spriteX, spriteY,
            this.largura, this.altura,
            this.positionX, this.positionY,
            this.largura, this.altura
        )
    },

    pula(){
        if (FlappyBird.positionY >= 20){
            this.velocidade = - this.pulo
        }
    }
}

const Chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    positionX:0,
    positionY: canvas.height - 112,
    atualiza(){
        const moveChao = 1
        const repetEm = this.largura / 2
        const movimentacao = this.positionX -= moveChao
        this.positionX = movimentacao % repetEm
    },
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

const Canos={
    largura: 52,
    altura: 400,
    baixo:{
        spriteX: 0,
        spriteY: 169
    },
    cima:{
        spriteX: 52,
        spriteY: 169
    },
    espaco: 90,
    pares: [],

    desenha(){
        this.pares.forEach(function(par){
            const randomY = par.y
            const canoCimaX = par.x
            const canoCimaY = randomY;
            const canoBaixoX = par.x
            const canoBaixoY = Canos.altura + Canos.espaco + randomY
            contexto.drawImage(
                sprites,
                Canos.cima.spriteX , Canos.cima.spriteY,
                Canos.largura, Canos.altura,
                canoCimaX, canoCimaY,
                Canos.largura, Canos.altura
            )
            contexto.drawImage(
                sprites,
                Canos.baixo.spriteX , Canos.baixo.spriteY,
                Canos.largura, Canos.altura,
                canoBaixoX, canoBaixoY,
                Canos.largura, Canos.altura
            )
            par.canoCima = {
                x: canoCimaX,
                y: Canos.altura + canoCimaY
            }
            par.canoBaixo ={
                x: canoBaixoX,
                y: canoBaixoY
            }
        })
    },
    temColisao(par){
        const cabecaDoFlappy = FlappyBird.positionY
        const peDoFlappy = FlappyBird.positionY + FlappyBird.altura
        if (FlappyBird.positionX >= par.x){
            if(cabecaDoFlappy <= par.canoCima.y){
                return true
            }
            if(peDoFlappy >= par.canoBaixo.y){
                return true
            }
        }
        return false
    },
    atualiza(){
        const atualizaEm = frames % 101 === 100
        if (atualizaEm){
            Canos.pares.push(
                {x: canvas.width + 1,
                y: -150 * (Math.random() + 1) 
            })
        }
        this.pares.forEach(function(par){
            par.x = par.x - 2
            if (Canos.temColisao(par)){
                somde_HIT.play()
                setTimeout(() => {
                    mudaTela(Telas.INICIO)
                }, 0.5*1000);
                return
            }
            if(par.x + Canos.largura <= 0){
                Canos.pares.shift()
            }
        })
    }
}

//
//[Telas]
let telaAtiva = {}
function mudaTela(novaTela){
    telaAtiva = novaTela
}
const Telas = {
    INICIO:{
        desenha(){
            Fundo.desenha()
            FlappyBird.positionY = 50
            FlappyBird.velocidade = 0
            Canos.pares = []
            FlappyBird.desenha()
            Chao.desenha()
            TelaInicio.desenha()
        },
        atualiza(){
            Chao.atualiza()
        },
        click(){
            mudaTela(Telas.INGAME)
        }
    },
    INGAME:{
        desenha(){
            Fundo.desenha()
            Canos.desenha()
            Chao.desenha()
            FlappyBird.desenha()
        },
        atualiza(){
            Chao.atualiza()
            Canos.atualiza()
            FlappyBird.atualiza()
            
        },
        click(){
            FlappyBird.pula()
        }
    }
}
// Fim de telas

function loop(){
    // console.log(frames)
    telaAtiva.atualiza()
    telaAtiva.desenha()
    frames ++
    requestAnimationFrame(loop)
}

window.addEventListener('mousedown', function(){
    if (telaAtiva.click){
        telaAtiva.click()
    }
})

mudaTela(Telas.INICIO)
loop()