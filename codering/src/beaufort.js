const assert = (voorwaarde, boodschap) => { if (!voorwaarde) throw new Error(boodschap);};

const mod = (n, d) => ((n%d)+d)%d;

const ggd = (a, b) => b === 0 ? Math.abs(a) : ggd(b, a % b);
const kgv = (a,b) => (a*b)/ggd(a,b);
const alphabet ="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
class Beaufort{
    constructor(sleutel) {
        this.sleutel=sleutel
    }

    codeerLetter(letter,pos){
        return alphabet[mod(alphabet.search(this.sleutel[mod(pos,this.sleutel.length)])-alphabet.search(letter.toUpperCase()),26)]
    }

    decodeerLetter(letter,pos){
        return alphabet[mod(alphabet.search(this.sleutel[mod(pos,this.sleutel.length)])-alphabet.search(letter.toUpperCase()),26)]
    }

    codeer(bericht){
        let cijfertekst=""
        for (let i in bericht){
            cijfertekst+=this.codeerLetter(bericht[i],i)
        }
        return cijfertekst
    }

    decodeer(bericht){
        return this.codeer(bericht)
    }


}

function tellen(vOne,vTwo,op){
    let result=""
    let kl = kgv(vOne.sleutel.length,vTwo.sleutel.length)
    let keyOne=vOne.sleutel.repeat(kl/vOne.sleutel.length)
    let keyTwo=vTwo.sleutel.repeat(kl/vTwo.sleutel.length)
    for (let i in keyOne){
        let ko=keyOne[i]
        let kt=keyTwo[i]
        if (op) result+=alphabet[mod(alphabet.search(ko)+alphabet.search(kt),26)]
        else result+=alphabet[mod(alphabet.search(ko)-alphabet.search(kt),26)]
    }
    return new Beaufort(result)
}

function optellen(vOne,vTwo){
    return tellen(vOne,vTwo,true)
}


function aftrekken(vOne,vTwo){
    return tellen(vOne,vTwo,false)
}

function vermenigvuldigen(k,v){
    let result=""
    if (typeof k !== "number"){
        let between=k
        k=parseInt(v)
        v=between
    }
    for (let i in v.sleutel){
        result+=alphabet[mod(alphabet.search(v.sleutel[i])*k,26)]
    }


    return new Beaufort(result)
}

const codec = new Beaufort("SECRET")
console.log(codec.codeer("hahaha"))


