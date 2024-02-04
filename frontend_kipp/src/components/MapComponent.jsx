import React, { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Fill, Stroke, Circle } from "ol/style";

const MapComponent = () => {
  useEffect(() => {
    // Create a new OpenLayers map
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    const markerStyle = new Style({
      image: new Circle({
        radius: 3,
        fill: new Fill({
          color: "blue",
        }),
        stroke: new Stroke({
          color: "black",
          width: 1,
        }),
      }),
    });

    // Create a vector layer for markers
    const vectorLayer = new VectorLayer({
      source: new VectorSource(),
    });

    map.addLayer(vectorLayer);

    // Function to handle double click
    const handleDoubleClick = (event) => {
      // Get the clicked coordinates
      const clickedCoord = event.coordinate;

      // Convert the coordinates to longitude and latitude
      const lonLat = toLonLat(clickedCoord);

      // Create a point feature at the clicked location
      const marker = new Feature(new Point(clickedCoord));

      marker.setStyle(markerStyle);

      // Add the marker to the vector layer
      vectorLayer.getSource().addFeature(marker);

      console.log("Double-Clicked Coordinates:", lonLat);
    };

    const handleCurrentLocation = () => {
      // Get the current location using the Geolocation API
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          const currentPosition = fromLonLat(coordinates);

          // Create a point feature at the current location
          const marker = new Feature(new Point(currentPosition));

          // Add the marker to the vector layer
          vectorLayer.getSource().addFeature(marker);

          // Center the map on the current location
          map.getView().setCenter(currentPosition);
          map.getView().setZoom(10); // Adjust the zoom level as needed

          // Log the coordinates to the console (you can do anything else with the coordinates here)
          console.log("Current Location Coordinates:", coordinates);
        },
        (error) => {
          console.error("Error getting current location:", error.message);
        }
      );
    };

    // Add a double click event listener to the map
    map.on("dblclick", handleDoubleClick);
    handleCurrentLocation();

    // Clean up function to destroy the map when the component unmounts
    return () => {
      map.un("dblclick", handleDoubleClick); // Remove the double click event listener
      map.setTarget(null);
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "100vh" }}></div>;
};

export default MapComponent;
