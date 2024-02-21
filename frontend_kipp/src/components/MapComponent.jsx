import React, { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Fill, Stroke, Circle } from "ol/style";
import CustomButton from "./Button";
import { DeleteIcon } from "@chakra-ui/icons";

const MapComponent = ({ coordinates }) => {
  // Create a vector layer for markers
  const vectorLayer = new VectorLayer({
    source: new VectorSource(),
  });

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
          color: "red",
        }),
        stroke: new Stroke({
          color: "black",
          width: 1,
        }),
      }),
    });

    map.addLayer(vectorLayer);

    let olCoordinates = coordinates.map((coord) => [coord.x, coord.y]);

    olCoordinates.forEach((coord) => {
      console.log("coord:", coord);
      const markerPosition = fromLonLat(coord);
      const marker = new Feature(new Point(markerPosition));
      marker.setStyle(markerStyle);

      vectorLayer.getSource().addFeature(marker);
    });

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
    handleCurrentLocation();

    // Clean up function to destroy the map when the component unmounts
    return () => {
      map.setTarget(null);
    };
  }, [coordinates]);

  const removeCoordinates = () => {
    vectorLayer.getSource().clear();
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <CustomButton
          text={"Remove Coordinates"}
          colorScheme={"red"}
          icon={<DeleteIcon />}
          variant={"solid"}
          onClick={removeCoordinates}
        ></CustomButton>
      </div>
    </div>
  );
};

export default MapComponent;
