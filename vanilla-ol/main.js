window.onload = init


function init() {
    const center = [51.505, -0.09]
    const zoom = 2
    // const minZoom = 2
    // const maxZoom = 6

    const map = new ol.Map({
        view: new ol.View({
            center,
            zoom,
            // maxZoom, minZoom
        }), layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],keyboardEventTarget: document
        , target: 'demo-map'
    })

    const popupContainerElement = document.getElementById('popup-coordinates');
    const popup = new ol.Overlay({
        element: popupContainerElement,
        positioning: 'top-right'
    })


    //Overlay
    map.addOverlay(popup);

    map.on('click', function (e) {
        const clickedCoordinate = e.coordinate;
        popup.setPosition(undefined);
        popup.setPosition(clickedCoordinate);
        popupContainerElement.innerHTML = clickedCoordinate;
    })

    // DragRotate Interaction
    const dragRotateInteraction = new ol.interaction.DragRotate({
        condition: ol.events.condition.altKeyOnly
    })

    map.addInteraction(dragRotateInteraction)


    //Draw Polygon/Circle/Freehand
    const drawInteraction = new ol.interaction.Draw({
        type: 'Polygon',freehand:true
    })

    map.addInteraction(drawInteraction)

    drawInteraction.on('drawend',(e)=> {
        console.log(e)
        console.log('the end')
    })

    drawInteraction.on('drawend',function(e) {
        let parser = new ol.format.GeoJSON();
        let drawnFeatures = parser.writeFeaturesObject([e.feature])
        console.log(drawnFeatures)
    })
}




