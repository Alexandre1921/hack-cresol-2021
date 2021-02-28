import firebase from 'firebase/app';

const auth = firebase.auth()
const db = firebase.firestore()

var meses=[
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
]

var colors = {
    gray: {
        100: "#f6f9fc",
        200: "#e9ecef",
        300: "#dee2e6",
        400: "#ced4da",
        500: "#adb5bd",
        600: "#8898aa",
        700: "#525f7f",
        800: "#32325d",
        900: "#212529",
    },
    theme: {
        default: "#172b4d",
        primary: "#5e72e4",
        secondary: "#f4f5f7",
        info: "#11cdef",
        success: "#2dce89",
        danger: "#f5365c",
        warning: "#fb6340",
    },
    black: "#12263F",
    white: "#FFFFFF",
    transparent: "transparent",
};

function compare(a,b) {
    return a.data.toDate().getMonth() < b.data.toDate().getMonth();
  }

export const obter_dados = async (uid) => {
    return db.collection("produtor").where("idProdutor","==",uid).get()
        .then(query=>!query.empty?query.docs[0]:Promise.reject("Produtor não encontrado"))
        .then(doc=>{
        if (doc.exists) {
            return db.collection("qualidade").where("produtor","==", doc.id).orderBy("data", "asc").get()
            .then(querySnapshot=>{
                    console.log(querySnapshot.empty);
                    var analises = []
                    const ccs = []
                    const mes = []
                    const ccb = []
                    querySnapshot.forEach((doc) => {
        
                        const data = doc.data()
                        analises.push(data);
                    });
                    var analises_ord = analises.sort(compare)
                    analises_ord.forEach((data)=>{
                        ccs.push(data.ccs)
                        ccb.push(data.ccb)
                        mes.push(meses[data.data.toDate().getMonth()])
                    })
                    console.log(analises_ord)
                    let qualidadeData = {
                        options: {
                            scales: {
                                yAxes: [
                                    {
                                        gridLines: {
                                            color: colors.gray[900],
                                            zeroLineColor: colors.gray[900],
                                        },
                                        ticks: {
                                            callback: function (value) {
                                                if (!(value % 10)) {
                                                    return value;
                                                }
                                            },
                                        },
                                    },
                                ],
                            },
                            tooltips: {
                                callbacks: {
                                    label: function (item, data) {
                                        var label = data.datasets[item.datasetIndex].label || "";
                                        var yLabel = item.yLabel;
                                        var content = "";
        
                                        if (data.datasets.length > 1) {
                                            content += label;
                                        }
        
                                        content += yLabel;
                                        return content;
                                    },
                                },
                            },
                        },
                        data1: (canvas) => {
                            return {
                                labels: mes,
                                datasets: [
                                    {
                                        label: "CCS",
                                        data: ccs,
                                    },
                                ],
                            };
                        },
                        data2: (canvas) => {
                            return {
                                labels: mes,
                                datasets: [
                                    {
                                        label: "CCB",
                                        data: ccb,
                                    },
                                ],
                            };
                        },
                    };
                    return qualidadeData
        
                })
        }
        });
}

