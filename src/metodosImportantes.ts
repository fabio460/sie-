export function formatoMonetario(valor:any){
    return valor?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}
export   function calculoDaOdi(total:number,aposta:number) {
    const margemDeLucro = 20
    let odi = total/aposta
    let porc = margemDeLucro/100
    let lucro = odi - porc*odi 
    return lucro
}

export const geraHash = ()=>{
    let res = ""
    let hash = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q']
    for (let index = 0; index < hash.length; index++) {
        res += hash[Math.ceil(Math.random()*15)];
    }
    return res
}

export const handleODI = (aposta:number, apostaDoMc:number ,somaDasApostas:number)=>{
   const porcPaga = 50/100 
   const pagar = somaDasApostas - somaDasApostas*porcPaga
   const lucrar = somaDasApostas*porcPaga
   if (aposta > somaDasApostas) {
    
   }
   return somaDasApostas/apostaDoMc*(1 - porcPaga) 
}