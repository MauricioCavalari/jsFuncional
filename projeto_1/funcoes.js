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

function elementosTerminadosCom(array, padraoTextual) {
    return array.filter(elem => elem.endsWith(padraoTextual))
}

function removerSeVazio(array) {
    return array.filter(elem => elem.trim())
}

function removerSeIncluir(array, padraoTextual) {
    return array.filter(elem => !elem.includes(padraoTextual))
}

function removerSeApenasNumero(array) {
    return array.filter(elem => {
        const num = parseInt(elem.trim())
        return num !== num
    })
}

module.exports = {
    lerDiretorio,
    elementosTerminadosCom,
    lerArquivo,
    lerArquivos,
    removerSeVazio,
    removerSeIncluir,
    removerSeApenasNumero
}