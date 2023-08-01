export function formatoMonetario(valor:any){
    return valor?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}
export   function calculoDaOdi(total:number,aposta:number,margemDeLucro:number) {
    let odi = total/aposta
    let porc = margemDeLucro/100
    let lucro = odi - odi*porc 
    return lucro.toFixed(2)
}