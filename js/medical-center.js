let currentCaseId = null;

function renderCases() {
    const container = document.getElementById("casesList");

    container.innerHTML = "";

    Mock.MEDICAL_CASES.forEach(medicalCase => {
        container.innerHTML += `
            <div
                class="medical-center__case ${medicalCase.id === currentCaseId ? "medical-center__case--active" : ""}"
                onclick="selectCase('${medicalCase.id}')"
            >
                <div>
                    <h4 class="medical-center__case-title">${medicalCase.patient.name}</h4>
                    <span class="medical-center__case-community">${medicalCase.patient.community}</span>
                </div>
                <span class="badge ${Helper.getPriorityClass(medicalCase.status)}">${medicalCase.status}</span>
            </div>
        `;
    });
}

function selectCase(caseId) {
    currentCaseId = caseId;
    const medicalCase = MEDICAL_CASES.find(item => item.id === caseId);

    renderCaseDetails(medicalCase);
    renderCases();
}

function renderCaseDetails(medicalCase) {
    document.getElementById("patientName").textContent = medicalCase.patient.name;
    document.getElementById("patientAge").textContent = `${medicalCase.patient.age} anos`;
    document.getElementById("patientCommunity").textContent = medicalCase.patient.community;
    document.getElementById("patientUnit").textContent = medicalCase.patient.unit;
    document.getElementById("heartRate").textContent = `${medicalCase.vitals.heartRate} bpm`;
    document.getElementById("spo2").textContent = `${medicalCase.vitals.spo2}%`;
    document.getElementById("pressure").textContent = medicalCase.vitals.pressure;
    document.getElementById("aiDiagnosis").textContent = medicalCase.aiAnalysis.diagnosis;
    document.getElementById("aiConfidence").textContent = `Confiança: ${medicalCase.aiAnalysis.confidence}%`;
    document.getElementById("aiRecommendation").textContent = medicalCase.aiAnalysis.recommendation;

    renderChat(medicalCase.messages);
}

function renderChat(messages) {
    const chat = document.getElementById("chatMessages");

    chat.innerHTML = "";

    messages.forEach(message => {
        const isDoctor = message.sender === "Especialista";

        chat.innerHTML += `
            <div class="medical-center__message ${isDoctor ? "medical-center__message--doctor" : ""}">
                <strong>${message.sender}</strong>
                <p>${message.text}</p>
            </div>
        `;
    });

    chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById("messageInput");
    const text = input.value.trim();

    if (!text) return;

    const medicalCase = MEDICAL_CASES.find(item => item.id === currentCaseId);

    medicalCase.messages.push({ sender: "Especialista", text });
    input.value = "";

    renderChat(medicalCase.messages);
}

document.getElementById("sendMessageBtn").addEventListener("click", sendMessage);
document.getElementById("messageInput").addEventListener("keydown", event => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

window.addEventListener("DOMContentLoaded", () => {
    currentCaseId = MEDICAL_CASES[0].id;
    renderCases();
    renderCaseDetails(MEDICAL_CASES[0]);
});