function getStatusClass(status) {
    switch (status) {
        case "Em Atendimento":
            return "badge--success";

        case "Monitoramento":
            return "badge--warning";

        case "Finalizado":
            return "badge--neutral";

        default:
            return "";
    }
}

function getPriorityClass(priority) {
    switch (priority) {
        case "Crítica":
            return "badge--critic";
        case "Alta":
            return "badge--danger";

        case "Média":
            return "badge--warning";

        case "Baixa":
            return "badge--success";

        default:
            return "";
    }
}

window.Helper = {
    getPriorityClass,
    getStatusClass
}