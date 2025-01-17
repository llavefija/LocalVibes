﻿var map = L.map('map').setView([40.416775, -3.703790], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var places = [
    { name: "Museo del Prado", lat: 40.413781, lng: -3.692127, genreId: 1 },
    { name: "Palacio Real", lat: 40.417955, lng: -3.714312, genreId: 2 },
    { name: "Puerta del Sol", lat: 40.416935, lng: -3.703570, genreId: 1 }
];

var musicGenres = @Html.Raw(musicGenresJson);

var genreGroups = {};

musicGenres.forEach(function (genre) {
    genreGroups[genre.GenereMusicName] = L.layerGroup().addTo(map);
});

places.forEach(function (place) {
    var locationIcon = L.icon({
        iconUrl: '/Assets/location-marker.png',
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24]
    });

    var genreName = musicGenres.find(g => g.IdGenereMusic === place.genreId)?.GenereMusicName || "Unknown";

    var marker = L.marker([place.lat, place.lng], { icon: locationIcon }).addTo(map);

    marker.on('mouseover', function (e) {
        marker
            .bindPopup(`
                    <div class="card" style="width: 12rem;">
                        <img src="https://placehold.co/10" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Título del lugar</h5>
                            <p class="card-text">Este es un ejemplo de contenido Bootstrap en un popup de Leaflet.</p>
                            <a href="#" class="btn btn-primary">Ver más</a>
                        </div>
                    </div>
                `)
            .openPopup();
    });

    marker.on('mouseout', function (e) {
        map.closePopup();
    });

    genreGroups[genreName]?.addLayer(marker);
});

var layersControl = L.control.layers(null, genreGroups).addTo(map);

var layersControlContainer = layersControl.getContainer();

layersControlContainer.style.fontSize = "0.9rem";
layersControlContainer.style.textAlign = "left";

var layersControlButton = document.querySelector('.leaflet-control-layers-toggle');
layersControlButton.style.backgroundImage = "url('/Assets/music-note.png')";