import firebase from 'firebase/app';

const db = firebase.firestore()
export const get_carga = async (lote) => {
    let cargas = []
    return db.collection("carga").where("lote", "==", lote)
        .get()
        .then((carga) => {
            carga.forEach(async (carg) => {
                cargas.push({id:carg.id,
                data: carg.data().data,
                })
            })
            return cargas
        })

}

export const get_coleta = async (carga) => {
    let coletas = []

    return db.collection("coleta").where("carga", "==", carga.id)
        .get()
        .then((coleta) => {
            coleta.forEach(async (col) => {
                coletas.push(col.data())
            })
            return coletas
        })
}

export const get_produtor = async (col) => {
    let produtores = []
    return db.collection("produtor").where("idProdutor", "==", col.produtor)
    .get()
    .then((coleta) => {
        coleta.forEach(async (col) => {
            
                produtores.push({
                    id: col.data().idProdutor,
                    nome: col.data().nome,
                    empresaAtual: col.data().empresaAtual,
                    idProdutor: col.data().idProdutor,
                })
            })
            return produtores
        })
}

export const get_lote_qualidade = async ( produtores) => {
    let ccs = []
    let ctb = []
    let ureia = []
    let somaccs = 0
    let somactb = 0
    let somaureia = 0
    console.log("produtores", produtores)
    produtores.forEach((prod) => {
        console.log(prod)

        db.collection("qualidade").where("produtor", "==", prod.idProdutor)
            .get()
            .then((qualidade) => {
                qualidade.forEach(qual => {
                    let data = qual.data()
                    console.log(data)
                    // if (data.data > maxData || data.data < minData) {
                    if (ccs !== "00.00") {
                        ccs.push(data.ccs)
                        somaccs = somaccs + data.ccs
                    }
                    if (ctb !== "00.00") {
                        ctb.push(data.ccb)
                        somactb = somactb + data.ccb
                    }
                    if (ureia !== "00.00") {
                        ureia.push(data.ureia)
                        somaureia = somaureia + data.ureia
                    }
                    // }
                })
            })

    })
    let mdccs = somaccs / ccs.length
    let mdctb = somactb / ctb.length
    let mdureia = somaureia / ureia.length
    console.log(mdccs)
    return [mdccs, mdctb, mdureia, ccs, ctb, ureia]


}