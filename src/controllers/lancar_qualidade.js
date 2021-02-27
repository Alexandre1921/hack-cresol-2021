import firebase from 'firebase/app';

const auth = firebase.auth()
const db = firebase.firestore()
export const salvar_qualidade = async (state) => {
    const qualidade = {
        observacao: state.observacao,
        data: state.data,
        ccs: state.ccs,
        ccb: state.ccb,
        ureia: state.ureia,
        produtor: state.produtor.idPapel,
    }
    console.log(qualidade)
    console.log(db)
    return db.collection("qualidade").add(qualidade).then(val => {
        console.log(val)
    }).catch((error) => {
        return error
    });
}

export const buscar_produtores = async () => {
    const produtores = []
    return db.collection("produtor").where("empresaAtual", "==", "1")
    .get()
    .then((querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            data.idPapel = doc.id
            produtores.push(data);
        });
        return produtores
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

