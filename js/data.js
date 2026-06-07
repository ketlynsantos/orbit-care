const COMMUNITIES = [
    {
        name: "Rio Verde",
        inhabitants: 1240,
        distanceHospital: "85 km",
        connectivity: "Via satélite",
        risks: ["Doenças respiratórias", "Hipertensão"],
        activeUnit: "ORB-02",
        lat: -3.119,
        lng: -60.021
    },
    {
        name: "Nova Esperança",
        inhabitants: 860,
        distanceHospital: "120 km",
        connectivity: "Via satélite",
        risks: ["Gestação de risco", "Diabetes"],
        activeUnit: "ORB-05",
        lat: -2.443,
        lng: -54.708
    },
    {
        name: "São Lucas",
        inhabitants: 540,
        distanceHospital: "150 km",
        connectivity: "Via satélite",
        risks: ["Acidentes de trabalho"],
        activeUnit: "ORB-09",
        lat: -9.974,
        lng: -67.824
    }
];

const EMERGENCIES = [
    {
        community: "Rio Verde",
        type: "Emergência respiratória",
        priority: "alta",
        lat: -3.112,
        lng: -60.005
    },
    {
        community: "Nova Esperança",
        type: "Gestante de risco",
        priority: "alta",
        lat: -2.436,
        lng: -54.700
    },
    {
        community: "São Lucas",
        type: "Acidente de trabalho",
        priority: "alta",
        lat: -9.966,
        lng: -67.815
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
        lat: -3.123,
        lng: -60.028
    },
    {
        id: "ORB-03",
        status: "deslocamento",
        community: "Rio Verde",
        lat: -3.128,
        lng: -60.034
    },
    {
        id: "ORB-04",
        status: "retorno",
        community: "Rio Verde",
        lat: -3.133,
        lng: -60.012
    },

    // Nova Esperança
    {
        id: "ORB-05",
        status: "atendimento",
        community: "Nova Esperança",
        lat: -2.447,
        lng: -54.703
    },
    {
        id: "ORB-06",
        status: "atendimento",
        community: "Nova Esperança",
        lat: -2.451,
        lng: -54.697
    },
    {
        id: "ORB-07",
        status: "deslocamento",
        community: "Nova Esperança",
        lat: -2.438,
        lng: -54.716
    },
    {
        id: "ORB-08",
        status: "retorno",
        community: "Nova Esperança",
        lat: -2.456,
        lng: -54.723
    },

    // São Lucas
    {
        id: "ORB-09",
        status: "atendimento",
        community: "São Lucas",
        lat: -9.978,
        lng: -67.820
    },
    {
        id: "ORB-10",
        status: "atendimento",
        community: "São Lucas",
        lat: -9.983,
        lng: -67.814
    },
    {
        id: "ORB-11",
        status: "deslocamento",
        community: "São Lucas",
        lat: -9.969,
        lng: -67.833
    },
    {
        id: "ORB-12",
        status: "retorno",
        community: "São Lucas",
        lat: -9.987,
        lng: -67.842
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

const MEDICAL_CASES = [
    {
        id: "CASE001",
        patient: {
            name: "Maria Souza",
            age: 67,
            community: "Nova Esperança",
            unit: "ORB-05"
        },
        status: "Crítica",
        vitals: {
            heartRate: 110,
            spo2: 88,
            pressure: "15x10"
        },
        aiAnalysis: {
            diagnosis: "Pneumonia",
            confidence: 82,
            recommendation: "Transferência prioritária."
        },
        messages: [
            {
                sender: "ORB-02",
                text: "Paciente com falta de ar."
            },
            {
                sender: "Especialista",
                text: "Iniciar oxigênio suplementar."
            }
        ]
    },
    {
        id: "CASE002",
        patient: {
            name: "João Silva",
            age: 54,
            community: "Rio Verde",
            unit: "ORB-02"
        },
        status: "Média",
        vitals: {
            heartRate: 94,
            spo2: 95,
            pressure: "13x08"
        },
        aiAnalysis: {
            diagnosis: "Infecção Respiratória",
            confidence: 71,
            recommendation: "Monitoramento contínuo."
        },
        messages: [
            {
                sender: "ORB-05",
                text: "Paciente com febre."
            }
        ]
    }
];

window.Mock = {
    UNITS,
    COMMUNITIES,
    EMERGENCIES,
    PATIENTS,
    MEDICAL_CASES
}