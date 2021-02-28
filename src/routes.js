/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import ConsultarDados from "views/examples/ConsultarDados.js";
import LancarColeta from "views/examples/LancarColeta.js";
import LancarQualidade from "views/examples/LancarQualidade.js";
import AnaliseQualidade from "views/examples/AnaliseQualidade.js";
import ListagemLotes from "views/examples/ListagemLotes.js";

var routes = [{
        path: "/index",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        component: Index,
        layout: "/admin",
    },
    {
        path: "/user-profile",
        name: "User Profile",
        icon: "ni ni-single-02 text-yellow",
        component: Profile,
        layout: "/admin",
    },

    {
        path: "/consultar-dados-produtor",
        name: "Meu histórico",
        icon: "ni ni-active-40 text-primary",
        component: ConsultarDados,
        layout: "/admin",
        role: "produtor"
    },

    {
        path: "/lancar-coleta",
        name: "Lançar Coleta",
        icon: "ni ni-active-40 text-primary",
        component: LancarColeta,
        layout: "/admin",
        role: "produtor"
    },
    {
        path: "/lancar-coleta",
        name: "Lançar Coleta",
        icon: "ni ni-active-40 text-primary",
        component: LancarColeta,
        layout: "/admin",
        role: "motorista"
    },

    {
        path: "/lancar-qualidade",
        name: "Lançar Qualidade",
        icon: "ni ni-active-40 text-primary",
        component: LancarQualidade,
        layout: "/admin",
        role: "analista"
    },
    {
        path: "/lancar-qualidade",
        name: "Lançar Qualidade",
        icon: "ni ni-active-40 text-primary",
        component: LancarQualidade,
        layout: "/admin",
        role: "produtor"
    },

    {
        path: "/listarLotes",
        name: "Listar Lotes",
        icon: "ni ni-active-40 text-primary",
        component: ListagemLotes,
        layout: "/admin",
        role: "produtor"
    },

    {
        path: "/analise-qualidade",
        name: "Análise de Qualidade",
        icon: "ni ni-active-40 text-primary",
        component: AnaliseQualidade,
        layout: "/admin",
        role: "analista"
    },
    {
        path: "/analise-qualidade",
        name: "Análise de Qualidade",
        icon: "ni ni-active-40 text-primary",
        component: AnaliseQualidade,
        layout: "/admin",
        role: "produtor"
    },

    {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: Login,
        layout: "/auth",
    },
    {
        path: "/register",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        component: Register,
        layout: "/auth",
    },
];
export default routes;