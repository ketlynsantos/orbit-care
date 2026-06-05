const COMMUNITIES = [
    {
        name: "Rio Verde",
        inhabitants: 1240,
        distanceHospital: "85 km",
        connectivity: "Via satélite",
        risks: [
            "Doenças respiratórias",
            "Hipertensão"
        ],
        activeUnit: "ORB-02",
        lat: -3.119,
        lng: -60.021
    },
    {
        name: "Nova Esperança",
        inhabitants: 860,
        distanceHospital: "120 km",
        connectivity: "Via satélite",
        risks: [
            "Gestação de risco",
            "Diabetes"
        ],
        activeUnit: "ORB-05",
        lat: -2.443,
        lng: -54.708
    },
    {
        name: "São Lucas",
        inhabitants: 540,
        distanceHospital: "150 km",
        connectivity: "Via satélite",
        risks: [
            "Acidentes de trabalho"
        ],
        activeUnit: "ORB-03",
        lat: -9.974,
        lng: -67.824
    }
];

const EMERGENCIES = [
    {
        community: "Rio Verde",
        type: "Emergência respiratória",
        priority: "alta",
        lat: -3.109,
        lng: -60.011
    },
    {
        community: "Nova Esperança",
        type: "Gestante de risco",
        priority: "alta",
        lat: -2.443,
        lng: -54.708
    },
    {
        community: "São Lucas",
        type: "Acidente de trabalho",
        priority: "alta",
        lat: -9.974,
        lng: -67.824
    }
];

const UNITS = [
    // Rio Verde
    {
        id: "ORB-01",
        status: "atendimento",
        community: "Rio Verde",
        lat: -3.110,
        lng: -60.015
    },
    {
        id: "ORB-02",
        status: "atendimento",
        community: "Rio Verde",
        lat: -3.129,
        lng: -60.031
    },
    {
        id: "ORB-03",
        status: "deslocamento",
        community: "Rio Verde",
        lat: -3.125,
        lng: -60.030
    },
    {
        id: "ORB-04",
        status: "retorno",
        community: "Rio Verde",
        lat: -3.130,
        lng: -60.010
    },

    // Nova Esperança
    {
        id: "ORB-05",
        status: "atendimento",
        community: "Nova Esperança",
        lat: -2.443,
        lng: -54.708
    },
    {
        id: "ORB-06",
        status: "atendimento",
        community: "Nova Esperança",
        lat: -2.450,
        lng: -54.700
    },
    {
        id: "ORB-07",
        status: "deslocamento",
        community: "Nova Esperança",
        lat: -2.435,
        lng: -54.715
    },
    {
        id: "ORB-08",
        status: "retorno",
        community: "Nova Esperança",
        lat: -2.455,
        lng: -54.720
    },

    // São Lucas
    {
        id: "ORB-09",
        status: "atendimento",
        community: "São Lucas",
        lat: -9.974,
        lng: -67.824
    },
    {
        id: "ORB-10",
        status: "atendimento",
        community: "São Lucas",
        lat: -9.980,
        lng: -67.818
    },
    {
        id: "ORB-11",
        status: "deslocamento",
        community: "São Lucas",
        lat: -9.968,
        lng: -67.832
    },
    {
        id: "ORB-12",
        status: "retorno",
        community: "São Lucas",
        lat: -9.985,
        lng: -67.840
    }
];

const PATIENTS = [
    {
        id: "P001",
        name: "João Silva",
        age: 52,
        gender: "Masculino",
        community: "Rio Verde",
        occurrence: "Emergência Respiratória",
        unit: "ORB-02",
        priority: "Crítica",
        status: "Em Atendimento",
        notes: "Paciente com dificuldade respiratória."
    },
    {
        id: "P002",
        name: "Maria Souza",
        age: 34,
        gender: "Feminino",
        community: "Nova Esperança",
        occurrence: "Gestação de Risco",
        unit: "ORB-05",
        priority: "Alta",
        status: "Monitoramento",
        notes: "Acompanhamento semanal."
    }
];

window.Mock = {
    UNITS,
    COMMUNITIES,
    EMERGENCIES,
    PATIENTS
}