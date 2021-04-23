function gerarNumerosEntre(min, max) {
    if (min > max) {
        [max, min] = [min, max]
    }

    return new Promise(resolve => {
        const fator = max - min + 1
        const aletorio = parseInt(Math.random() * fator) + min
        resolve(aletorio)
    })
}

gerarNumerosEntre(10, 30)
    .then(num => num * 10)
    .then(numX10 => `O número gerado foi ${numX10}`)
    .then(console.log)
