const ITEMS_PER_PAGE = 5;
const tableBody = document.getElementById("patientsTableBody");
const modal = document.getElementById("patientModal");
const btnNewPatient = document.getElementById("btnNewPatient");

let currentMode = null;
let currentPatientId = null;
let currentPage = 1;
let filteredPatients = [...Mock.PATIENTS];

function renderPatients() {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pagePatients = filteredPatients.slice(start, end);

    tableBody.innerHTML = "";

    pagePatients.forEach((patient, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.community}</td>
                <td>${patient.occurrence}</td>
                <td>${patient.unit}</td>
                <td><span class="badge ${Helper.getStatusClass(patient.status)}">${patient.status}</span></td>
                <td><span class="badge ${Helper.getPriorityClass(patient.priority)}">${patient.priority}</span></td>
                <td>
                    <div class="patients__actions-group">
                        <button class="patients__action-btn patients__action-btn--view" onclick="openModal('view', '${patient.id}')">
                            <span class="material-symbols-rounded">visibility</span>
                        </button>
                        <button class="patients__action-btn patients__action-btn--edit" onclick="openModal('edit', '${patient.id}')">
                            <span class="material-symbols-rounded">edit</span>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    renderPagination();
}

function openModal(mode, patientId = null) {
    const patient = patientId ? Mock.PATIENTS.find(p => p.id === patientId) : {};

    currentMode = mode;
    currentPatientId = patientId

    renderModal(mode, patient);
    modal.classList.remove("hidden");
};

function closeModal(mode, patient) {
    modal.classList.add("hidden");
    currentMode = null;
    currentPatientId = null;
};

function renderModal(mode, patient) {
    const fields = {
        name: patient.name || "",
        age: patient.age || "",
        gender: patient.gender || "",
        community: patient.community || "",
        occurrence: patient.occurrence || "",
        unit: patient.unit || "",
        notes: patient.notes || "",
    };

    document.getElementById("modalTitle").textContent =
        mode === "create" ? "Novo Paciente" : patient.name

    document.getElementById("modalSubtitle").textContent =
        mode === "create" ? "Cadastro" : patient.name

    Object.entries(fields).forEach(([key, value]) => {
        const container = document.querySelector(`[data-field="${key}"]`);

        if (!container) return;

        if (mode === "view") {
            container.innerHTML = `
                <span class="field-value">${value}</span>
            `;
        } else {
            if (key === "gender") {
                container.innerHTML = `
                    <select id="${key}" class="field-input">
                        <option value="Feminino" ${value === "Feminino" ? "selected" : ""}>Feminino</option>
                        <option value="Masculino" ${value === "Masculino" ? "selected" : ""}>Masculino</option>
                    </select>
                `;
                return;
            }

            if (key === "community") {
                container.innerHTML = `
                    <select id="${key}" class="field-input">${createCommunityOptions(value)}</select>
                `;
                return;
            }

            if (key === "unit") {
                container.innerHTML = `
                    <select id="${key}" class="field-input">${createUnitOptions(value)}</select>
                `;
                return;
            }

            if (key === "notes") {
                container.innerHTML = `
                    <textarea id="${key}" class="field-textarea" rows="5">${value}</textarea>
                `;
                return;
            }

            container.innerHTML = `
                <input id="${key}" class="field-input" value="${value}">
            `;
        }
    });

    configureFooter(mode);
};

function configureFooter(mode) {
    const saveBtn = document.getElementById("saveBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    cancelBtn.onclick = closeModal;

    if (mode === "view") {
        saveBtn.style.display = "inline-flex";
        saveBtn.textContent = "Editar";
        saveBtn.onclick = () => {
            openModal("edit", currentPatientId);
        };
        return;
    }

    if (mode === "edit") {
        saveBtn.style.display = "inline-flex";
        saveBtn.textContent = "Salvar";
        saveBtn.onclick = savePatient;
        return;
    }

    if (mode === "create") {
        saveBtn.style.display = "inline-flex";
        saveBtn.textContent = "Cadastrar";
        saveBtn.onclick = savePatient;
    }
};

function savePatient() {
    const patientIndex = Mock.PATIENTS.findIndex(patient => patient.id === currentPatientId);
    const patientData = {
        id: currentMode === "create"
            ? generatePatientId() : Mock.PATIENTS[patientIndex].id,
        name: document.getElementById("name").value,
        age: Number(document.getElementById("age").value),
        gender: document.getElementById("gender").value,
        community: document.getElementById("community").value,
        unit: document.getElementById("unit").value,
        notes: document.getElementById("notes").value,
        status:
            currentMode === "create"
                ? "Em Atendimento"
                : Mock.PATIENTS[patientIndex].status,
        priority:
            currentMode === "create"
                ? "Média"
                : Mock.PATIENTS[patientIndex].priority,
        occurrence: document.getElementById("occurrence").value,
    }

    if (currentMode === "create") {
        Mock.PATIENTS.push(patientData);
    } else {
        Mock.PATIENTS[patientIndex] = patientData;
    }

    filteredPatients = [...Mock.PATIENTS];
    applyFilters();
    closeModal();
}

function generatePatientId() {
    const nextId = Mock.PATIENTS.length + 1;
    return `P${String(nextId).padStart(3, "0")}`;
}

function createCommunityOptions(selectedValue = "") {
    return COMMUNITIES
        .map(community => `
            <option
                value="${community.name}"
                ${community.name === selectedValue ? "selected" : ""}
            >
                ${community.name}
            </option>
        `).join("");
}

function createUnitOptions(selectedValue = "") {
    return UNITS
        .map(unit => `
            <option value="${unit.id}" ${unit.id === selectedValue ? "selected" : ""}>${unit.id}</option>
        `).join("");
}

function renderCommunityFilter() {
    const select = document.getElementById("communityFilter");
    Mock.COMMUNITIES.forEach(community => {
        select.innerHTML += `
            <option value="${community.name}">
                ${community.name}
            </option>
        `;
    });
}

function applyFilters() {
    const search = document.getElementById("searchPatient").value.toLowerCase();
    const status = document.getElementById("statusFilter").value;
    const community = document.getElementById("communityFilter").value;

    filteredPatients = Mock.PATIENTS.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(search);
        const matchesStatus = !status || patient.status === status;
        const matchesCommunity = !community || patient.community === community;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesCommunity
        );
    });

    currentPage = 1;
    renderPatients();
}

function renderPagination() {
    const totalPages = Math.max(1, Math.ceil(filteredPatients.length / ITEMS_PER_PAGE));

    document.getElementById("pageInfo").textContent = `Página ${currentPage} de ${totalPages}`;
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages;
}

document.querySelector(".modal__close").addEventListener("click", closeModal);
document.querySelector(".modal__overlay").addEventListener("click", closeModal);
document.getElementById("searchPatient").addEventListener("input", applyFilters);
document.getElementById("statusFilter").addEventListener("change", applyFilters);
document.getElementById("communityFilter").addEventListener("change", applyFilters);
document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderPatients();
    }
});
document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        renderPatients();
    }
});

btnNewPatient.addEventListener("click", () => { openModal("create"); });

window.addEventListener("DOMContentLoaded", () => {
    filteredPatients = [...Mock.PATIENTS];
    renderCommunityFilter();
    renderPatients();
    closeModal();
});