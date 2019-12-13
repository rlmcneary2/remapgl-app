import React, { useCallback, useState } from "react";
import { Layer, Map, Marker, Popup } from "remapgl";
import styled from "@emotion/styled";
import { LayerProps } from "remapgl/dist/layer/mapboxgl/layer-types";
import { LngLat } from "remapgl/dist/types/location";
import { MarkerProps } from "remapgl/dist/map/component/marker/marker-types";
import { PopupProps, MarkerPopupProps } from "remapgl/dist/map/component/popup/popup-types";

interface MyMarkerProps extends MarkerProps {
  key: string;
}

const App: React.FC = () => {
  const [layers, setLayers] = React.useState(layerData);
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     const [a, b] = layers;
  //     setLayers([b, a]);
  //   }, 3000);
  // }, [layers]);

  const [location, setLocation] = React.useState<{ center: [number, number]; zoom: number; }>({ center: [-68.2954881, 44.3420759], zoom: 9.5 });
  const [markers, setMarkers] = React.useState<Partial<MyMarkerProps>[]>([]);
  const centers = React.useRef<[number, number][]>([[-68.8008887, 44.5591077], [-68.5923347, 44.434114], [-68.2954881, 44.3420759]]);
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     const [a, ...rest] = centers.current;
  //     centers.current = [...rest, a];
  //     setLocation({
  //       center: a,
  //       zoom: location.zoom === 9.5 ? 11 : 9.5
  //     });
  //   }, 3500);
  // }, [location]);

  React.useEffect(() => {
    // const popup = createPopup();
    const marker: Partial<MyMarkerProps> = { draggable: true, location: [-68.18968201, 44.31101227], key: `${Date.now()}`, popup: createPopup() };
    // const marker: Partial<MyMarkerProps> = { draggable: true, location: [-68.18968201, 44.31101227], key: `${Date.now()}` };
    setMarkers([...markers, marker]);
  }, []);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     console.log(`timeout markers ${markers.length}`);
  //     if (markers.length) {
  //       const [_, ...nextMarkers] = markers;
  //       setMarkers(nextMarkers);
  //     }
  //   }, 5000);
  // }, [markers]);

  const { center, zoom } = location;

  console.log(`render markers ${markers.length}`);
  return (
    <MapStyled
      accessToken="pk.eyJ1IjoicmxtY25lYXJ5MiIsImEiOiJjajgyZjJuMDAyajJrMndzNmJqZDFucTIzIn0.BYE_k7mYhhVCdLckWeTg0g"
      center={center}
      motionType="ease"
      onClick={({ lngLat }) => setMarkers([...markers, { draggable: true, location: lngLat, key: `${Date.now()}`, popup: createPopup() }])}
      zoom={zoom}
    >
      {markers.map(x => {
        // return createMarker(x);
        const {location, ...props} = x;
        let result;
        try {
          // result = location ? <Marker {...props} location={location} /> : null;
          result = location ? <Marker {...props} location={location}><div style={{ background: "pink", height: "50px", width: "50px" }} /></Marker> : null;
        } catch (err) {
          console.log("err=", err);
          debugger;
        }
        return result;
      })}
      {layers.map(x => (
        <Layer key={x.id} {...x} />
      ))}
    </MapStyled>
  );
}

export default App;

const MapStyled = styled(Map)`
  height: 100vh;
  width: 100vw;
`;

// function ClickToggleMarker(props: MarkerProps): JSX.Element {
//   const [popup, setPopup] = useState(false);
//   return (<Marker {...props} onClick={() => setPopup(!popup)} onDrag={() => console.log("drag3")} togglePopup={popup} />);
// }

function createMarker(props: Partial<MarkerProps>): JSX.Element | null {
  const { location, ...otherProps } = props;
  if (!location) {
    return null;
  }

  // return (
  //   <ClickToggleMarker
  //     key={Array.isArray(location) ? `${location[0]}${location[1]}` : `${location.lat}${location.lat}`}
  //     {...otherProps}
  //     location={location}
  //   />
  // );

  return <Marker
    key={Array.isArray(location) ? `${location[0]}${location[1]}` : `${location.lat}${location.lat}`}
    {...otherProps}
    location={location}
  />
}

function createPopup() {
  const props = {
    offset: 40
  };
  return <Popup {...props as any}><div style={{ background: "black", color: "white", margin: "20px" }}>I'm a REAL popup.</div></Popup>
}

const data: any = {
  features: [
    {
      geometry: {
        coordinates: [
          -68.18928528,
          44.32134247
        ],
        type: "Point"
      },
      properties: {
        title: "Thunder Hole"
      },
      type: "Feature"
    },
    {
      geometry: {
        coordinates: [
          -68.18968201,
          44.31101227
        ],
        type: "Point"
      },
      properties: {
        title: "Otter Cliff"
      },
      type: "Feature"
    },
    {
      geometry: {
        coordinates: [
          -68.19212177,
          44.31437683
        ],
        type: "Point"
      },
      properties: {
        title: "Fabbri Picnic Area"
      },
      type: "Feature"
    },
    {
      geometry: {
        coordinates: [
          -68.184021,
          44.32995987
        ],
        type: "Point"
      },
      properties: {
        title: "Sand Beach"
      },
      type: "Feature"
    },
    {
      geometry: {
        coordinates: [
          -68.20548248,
          44.38788986
        ],
        type: "Point"
      },
      properties: {
        title: "Village Green"
      },
      type: "Feature"
    },
    {
      geometry: {
        coordinates: [
          -68.232262,
          44.379589
        ],
        type: "Point"
      },
      properties: {
        title: "Cadillac N Ridge"
      },
      type: "Feature"
    },
    {
      geometry: {
        coordinates: [
          -68.20748138,
          44.36243439
        ],
        type: "Point"
      },
      properties: {
        title: "Sieur De Monts"
      },
      type: "Feature"
    },
    {
      geometry: {
        coordinates: [
          -68.191312,
          44.307236
        ],
        type: "Point"
      },
      properties: {
        title: "Otter Point"
      },
      type: "Feature"
    }
  ],
  type: "FeatureCollection"
};

const paint = {
  "circle-color": "#222",
  "circle-radius": {
    base: 1.15,
    stops: [[10, 5], [14, 5]]
  },
  "circle-stroke-color": "#FFF",
  "circle-stroke-opacity": 0.8,
  "circle-stroke-width": {
    base: 1.15,
    stops: [[10, 3], [14, 3]]
  }
};

const layerData: LayerProps[] = [
  // {
  //   id: "black",
  //   onMouseover: () => console.log("black layer"),
  //   paint,
  //   source: { data, type: "geojson" },
  //   type: "circle"
  // },
  {
    id: "red",
    onMouseover: () => console.log("red layer"),
    paint: { ...paint, "circle-color": "#F22" },
    source: { data, type: "geojson" },
    type: "circle"
  }
];
