
// FUNÇÃO PARA CONVERTER PARA REAL
const numberToReal = (money: string) => {
    const numero = parseFloat(money).toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}

export default numberToReal;