import firebase from 'firebase/app';

const auth = firebase.auth()
const db = firebase.firestore()
const salvar_coleta = async (state) =>  {
    const coleta = {
        observacao: state.observacao,
        data: state.data,
        horario: state.horario,
        quantidade: state.quantidade,
        temperatura: state.temperatura,
        produtor: firebase.auth().currentUser.uid,
    }
    console.log(coleta)
    console.log(db)
    db.collection("coleta").add(coleta)
    
}
export default salvar_coleta;