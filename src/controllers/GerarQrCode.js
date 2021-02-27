import firebase from 'firebase/app';

const auth = firebase.auth()
const db = firebase.firestore()
export const get_cargas = async () => {
    let cargas = []
    return db.collection("carga").where("lote", "==", "-1")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = {
                    id: doc.id,
                    linha: doc.data().linha,
                    data: new Date(doc.data().data).toLocaleDateString()
                }
                console.log()
                cargas.push(data);
            });
            console.log(cargas)
            return cargas
        }
        )
}

export const get_cargas_by_datas = async (inicio, fim) => {
    let cargas = []
    return db.collection("carga").where("lote", "==", "-1")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = {
                    id: doc.id,
                    linha: doc.data().linha,
                    data: new Date(doc.data().data).toLocaleDateString()
                }
                console.log()
                cargas.push(data);
            });
            console.log(cargas)
            return cargas
        }
        )
}

export const gerar_lote = async (state) => {
    var lote = {
        data: Date.now(),
        observacao: state.observacao
    }
    
    return db.collection("lote").add(lote).then((ref)=>{
        console.log(ref.id)
        state.selected.forEach(carga => {
            db.collection("carga").doc(carga).update({lote: ref.id});
        })
        return "http://localhost:3000/lote/"+ref.id
    })
    
}