const assert = (voorwaarde, boodschap) => { if (!voorwaarde) throw new Error(boodschap);};
class Codeersleutel {


    normaliseer(s) {
        return s.toUpperCase().replace(/[^A-Z]+/g, "");
    };

    constructor(sleutelwoord,omschrijving) {
        this.sleutelwoord=sleutelwoord
        this.omschrijving=omschrijving
        this.size=sleutelwoord.length
        this.rooster=this.maakSleutel(this.maakVeld(this.size))
    }

    maakVeld(size){
        let rijtjes=[]
        for (let i = 0 ; i < size ; i++){
            let kolom = []
            for (let j = 0 ; j < size ; j++){
                kolom.push("-")
            }
            rijtjes.push(kolom)
        }
        return rijtjes
    }

    maakSleutel(rooster){
        let result=rooster
        this.afbeelding= {}
        let index = 0
        let pos = 0
        while(pos<this.omschrijving.length){
            let char = this.omschrijving[pos]

            if (char.search(/[0-9]/)>=0) {
                if (this.omschrijving[pos+1].search(/[0-9]/)>-1) {
                    index+=parseInt(this.omschrijving.slice(pos,pos+2))
                    pos+=2
                }
                else {
                    index+=parseInt(char)
                    pos++
                }
            }else if (char.search(/[a-zA-Z]/)>=0){
                result[Math.floor(index/this.size)][index%this.size] = char.toUpperCase()
                this.afbeelding[char]=this.sleutelwoord[Math.floor(index/this.size)]+this.sleutelwoord[index%this.size]
                index++
                pos++
            }
        }
        return result
    }

    toString(){
        let result=""
        for (let i = 0 ; i < this.size ; i++){
            for (let j = 0 ; j < this.size ; j++){
                result+=this.rooster[i][j]
            }
            result+="\n"
        }
        return result.trim()
    }
    codeer(code){
        let result=""
        code = this.normaliseer(code)
        for (let letter of code){

            assert(Object.keys(this.afbeelding).includes(letter),"ongeldig bericht")
            result+=this.afbeelding[letter]
        }
        return result
    }

    decodeer(code){
        let result=""
        for (let i = 0 ; i < code.length ; i+=2){
            let bigram = code.slice(i,i+2)
            let row=this.sleutelwoord.search(bigram[0])
            let column= this.sleutelwoord.search(bigram[1])
            assert(row>-1
                && column>-1
                && this.rooster[row][column].search(/[^-]/)>-1
                ,"ongeldig bericht")
            result+=this.rooster[row][column]
        }
        return result
    }
}


let sleutel02 = new Codeersleutel("HISPAYMENT", "14K1S2DL1NW4P2R1H3T3U2O6X3A1F6B1G4I1C2V1Y3E2M2J")


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('message to encode: ', name => {
    console.log(sleutel02.codeer(`${name}`));
    readline.close();
});
