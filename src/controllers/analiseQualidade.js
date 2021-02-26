import firebase from 'firebase/app';

const auth = firebase.auth()
const db = firebase.firestore()
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
export const obter_dados = async () => {

    return db.collection("qualidade").where("produtor", "==", "YkI2KWl7bvaghU6cFfII")
        .get()
        .then((querySnapshot) => {
            const analises = []
            const ccs = []
            const mes = []
            querySnapshot.forEach((doc) => {

                const data = doc.data()
                analises.push(data);
                ccs.push(data.ccs)
                const d = new Date(data.data);
                console.log(data.data.toDate())
            
                mes.push(data.data.toDate().getMonth())
            });
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

                                content += "$" + yLabel + "k";
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
                        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        datasets: [
                            {
                                label: "Performance",
                                data: [0, 20, 5, 25, 10, 30, 15, 40, 40],
                            },
                        ],
                    };
                },
            };
            return qualidadeData

        })
}

