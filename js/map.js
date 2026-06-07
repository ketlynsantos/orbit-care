// Localização Brasil
const map = L.map("map").setView([-5, -60], 5);

const unitIcon = L.icon({
    iconUrl: '/assets/marker-unit.svg',
    iconSize: [31, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
});

const communityIcon =  L.icon({
    iconUrl: '/assets/marker-community.svg',
    iconSize: [31, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
});

const emergencyIcon =  L.icon({
    iconUrl: '/assets/marker-emergency.svg',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
});

let selectedCommunityArea = null;

L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: '&copy; OpenStreetMap' }
).addTo(map);

document
    .getElementById("resetMap")
    .addEventListener("click", () => {

        if (selectedCommunityArea) {
            map.removeLayer(selectedCommunityArea);
            selectedCommunityArea = null;
        }

        map.flyTo(
            [-5, -60], 
            5,
            { duration: 1.5 }
        );
    });

Mock.UNITS.forEach(unit => {
    L.marker(
        [unit.lat, unit.lng],
        { icon: unitIcon }
    )
    .addTo(map)
    .bindPopup(`
        <div class="popup">
            <div class="popup__header u-border-bottom u-padding-horizontal-bottom">
                <h3 class="popup__title">${unit.id}</h3>
                <span class="popup__status popup__status--${unit.status}">${unit.status}</span>
            </div>
            <div class="popup__infos">
                <div class="popup__info">
                    <span class="material-symbols-rounded popup__icon">location_on</span>
                    <span>${unit.community}</span>
                </div>
                <div class="popup__info">
                    <span class="material-symbols-rounded popup__icon">emergency</span>
                    <span>Unidade Móvel de Saúde</span>
                </div>
            </div>
        </div>
    `);
});

Mock.EMERGENCIES.forEach(emergency => {
    L.marker(
        [emergency.lat, emergency.lng],
        { icon: emergencyIcon }
    )
    .addTo(map)
    .bindPopup(`
        <div class="popup">
            <div class="popup__header u-border-bottom u-padding-horizontal-bottom">
                <h3 class="popup__title">${emergency.type}</h3>
                <span class="popup__badge popup__badge--danger">Crítica</span>
            </div>
            <div class="popup__infos">
                <div class="popup__info">
                    <span class="material-symbols-rounded popup__icon">location_on</span>
                    <span>${emergency.community}</span>
                </div>
                <div class="popup__info">
                    <span class="material-symbols-rounded popup__icon">warning</span>
                    <span>Atendimento prioritário</span>
                </div>
            </div>
        </div>
    `);
});


Mock.COMMUNITIES.forEach(community => {
    const marker = L.marker(
        [community.lat, community.lng],
        { icon: communityIcon }
    );


    marker.bindPopup(`
        <div class="popup">
            <div class="popup__header u-border-bottom u-padding-horizontal-bottom">
                <h3 class="popup__title">${community.name}</h3>
                <span class="popup__badge popup-badge--warning">Prioritária</span>
            </div>
            <div class="popup__infos u-border-bottom u-padding-horizontal-bottom">
                <div class="popup__info">
                    <span class="material-symbols-rounded popup__icon">groups</span>
                    <span>${community.inhabitants.toLocaleString()} habitantes</span>
                </div>

                <div class="popup__info">
                    <span class="material-symbols-rounded popup__icon">local_hospital</span>
                    <span>${community.distanceHospital}</span>
                </div>

                <div class="popup__info">
                    <span class="material-symbols-rounded popup__icon">satellite_alt</span>
                    <span>${community.connectivity}</span>
                </div>

                <div class="popup__info">
                    <span class="material-symbols-rounded popup__icon">emergency</span>
                    <span>${community.activeUnit}</span>
                </div>
            </div>
            <div class="popup__risks">
                <h4 class="popup__subtitle">Principais acometimentos</h4>
                ${community.risks.map(risk =>`<span class="popup__tag">${risk}</span>`).join("")}
            </div>
        </div>
    `);

    marker.on("click", () => {
        // Remove destaque anterior
        if (selectedCommunityArea) {
            map.removeLayer(selectedCommunityArea);
            selectedCommunityArea = null;
        }

        // Cria novo destaque
        selectedCommunityArea = L.circle(
            [community.lat, community.lng],
            { 
                radius: getCommunityRadius(community.inhabitants),
                color: "#3d8d80",
                weight: 3,
                fillColor: "#89d2ad",
                fillOpacity: 0.25
            }
        ).addTo(map);

        const bounds = selectedCommunityArea.getBounds();
        map.flyToBounds(bounds, {
            padding: [20, 20],
            duration: 1.5
        });

        marker.openPopup();
    });

    marker.addTo(map);
});

function getCommunityRadius(inhabitants) {
    if (inhabitants < 700) {
        return 8000;
    }

    if (inhabitants < 1000) {
        return 10000;
    }

    return 12000;
}