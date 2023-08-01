export function formatoMonetario(valor:any){
    return valor?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}