/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example requires the Drawing library. Include the libraries=drawing
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=drawing">
let map;
let overlay;
let polygonsArr = [];

function initMap(): void {
  // google.maps.Polygon.prototype.getGeoJSON = function () {
  //   let geoJSON = {
  //     type: 'Polygon',
  //     coordinates: [],
  //   };
  //
  //   let paths = this.getPaths().getArray();
  //
  //   for (path of paths) {
  //     let pathArray = [];
  //     let points = path.getArray();
  //     let firstPoint = false;
  //
  //     for (point of points) {
  //       if (firstPoint === false) {
  //         firstPoint = point;
  //       }
  //
  //       pathArray.push([point.lng(), point.lat()]);
  //     }
  //
  //     pathArray.push([firstPoint.lng(), firstPoint.lat()]);
  //
  //     geoJSON.coordinates.push(pathArray);
  //   }
  //
  //   return geoJSON;
  // };

  map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  const drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        // google.maps.drawing.OverlayType.MARKER,
        // google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.POLYLINE,
        // google.maps.drawing.OverlayType.RECTANGLE,
      ],
    },
    markerOptions: {
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    },
    circleOptions: {
      fillColor: '#ffff00',
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      zIndex: 1,
    },
  });

  drawingManager.setMap(map);

  google.maps.event.addListener(
    drawingManager,
    'overlaycomplete',
    function (event) {
      var paths = event.overlay.getPath().getArray();
      // @ts-ignore
      polygonsArr.push(`[${paths.toString().replaceAll('(', '[').replaceAll(')', ']')}]`)

      // Path for iManager, setting zones
      // @ts-ignore
      $('#vertices').val(`[${paths.toString().replaceAll('(', '[').replaceAll(')', ']')}]`);

      // All polygons drawn on map in Array[].
      // $('#vertices').val(`[${polygonsArr.toString().replaceAll('(', '[').replaceAll(')', ']')}]`);
      if (event.type == 'circle') {
        var radius = event.overlay.getRadius();
      }
    }
  );
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
