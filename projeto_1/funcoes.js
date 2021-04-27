const fs = require('fs')
const path = require('path')

function lerDiretorio(caminho) {
    return new Promise((resolve, rejects) => {
        try {
            let arquivos = fs.readdirSync(caminho)
            arquivos = arquivos.map(arquivo => path.join(caminho, arquivo))
            resolve(arquivos)
        } catch {
            rejects(e)
        }
    })
}

function lerArquivo(caminho) {
    return new Promise((resolve, rejects) => {
        try {
            const conteudo = fs.readFileSync(caminho, { encoding: 'utf-8' })
            resolve(conteudo.toString())
        } catch (e) {
            rejects(e)
        }
    })
}

function lerArquivos(caminhos) {
    return Promise.all(caminhos.map(caminho => lerArquivo(caminho)))
}

function elementosTerminadosCom(padraoTextual) {
    return function (array) {
        return array.filter(elem => elem.endsWith(padraoTextual))
    }
}

function removerElementosSeVazio(array) {
    return array.filter(elem => elem.trim())
}

function removerElementosSeIncluir(padraoTextual) {
    return function (array) {
        return array.filter(elem => !elem.includes(padraoTextual))
    }
}

function removerElementosSeApenasNumero(array) {
    return array.filter(elem => {
        const num = parseInt(elem.trim())
        return num !== num
    })
}

function removerSimbolos(simbolos) {
    return function (array) {
        return array.map(elem => {
            let textoSemSimbolos = elem
            simbolos.forEach(simbolo => {
                textoSemSimbolos = textoSemSimbolos.split(simbolo).join('')
            });
            return textoSemSimbolos
        })
    }
}

function mesclarElementos(array) {
    return array.join(' ')
}

function separarTextoPor(simbolo) {
    return function (texto) {
        return texto.split(simbolo)
    }
}

module.exports = {
    lerDiretorio,
    elementosTerminadosCom,
    lerArquivo,
    lerArquivos,
    removerElementosSeVazio,
    removerElementosSeIncluir,
    removerElementosSeApenasNumero,
    removerSimbolos,
    mesclarElementos,
    separarTextoPor
}