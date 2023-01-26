const seuVotoPara = document.querySelector('.divisao-1-1 span');
const cargo = document.querySelector('.divisao-1-2 span');
const descricao = document.querySelector('.divisao-1-4');
const aviso = document.querySelector('.divisao-2');
const lateral = document.querySelector('.divisao-1-right');
const numeros = document.querySelector('.divisao-1-3');
const tela = document.querySelector('.tela');

let etapaAtual = 0;
let numero = '';
let votoBranco = true;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
            numeroHtml += '<div class="numero"></div>'
        }
        
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero == numero) {
            return true;
        } else {
            return false;
        }
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `
            Nome: ${candidato.nome} <br>
            Partido: ${candidato.partido}
        `;
        aviso.style.display = 'block';

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `
                <div class="divisao-1-image small">
                    <img src="./assets/images/${candidato.fotos[i].url}" alt="">
                    <p>${candidato.fotos[i].legenda}</p>
                </div>
                `
            } else {
                fotosHtml += `
                <div class="divisao-1-image">
                    <img src="./assets/images/${candidato.fotos[i].url}" alt="">
                    <p>${candidato.fotos[i].legenda}</p>
                </div>
                `
            }
            
        };
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
        aviso.style.display = 'block';
    }
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');

    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}


function branco(n) {
        numero = '';
        votoBranco = true;

        seuVotoPara.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        lateral.innerHTML = '';

}

function corrige(n) {
    comecarEtapa();
}

function confirma(n) {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length == etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            tela.innerHTML = '<div class="aviso-gigante pisca">FIM</div>'
            console.log(votos);
        }
    }
}

comecarEtapa();