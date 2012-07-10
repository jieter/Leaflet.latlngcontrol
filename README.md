# A LatLng control for Leaflet #

This Leaflet plugin extends the [Leaflet](https://github.com/CloudMade/Leaflet) API with a LatLng control:
 - The Latitude and Longnitude are displayed in a control.
 - The user can change the values to move the map's center.

<img src="https://github.com/jieter/Leaflet.latlngcontrol/raw/master/examples/latlngcontrol.png">

# Code examples
After loading ```leaflet.js```, ```src/Control.LatLng.js``` and ```src/Control.LatLng.css``` should be included and the control is activated by default.

Another position:
```javascript
map.removeControl(map.latLngControl);
map.addControl(new L.Control.LatLng({ position: "topleft" }));
```

## Todo
 - Support control positioning of the control.
 - 51° 28' 38" N coordinate syntax.
 - Fix the first update of the control after adding it manually to the map.

## Credits
The code of this plugin is heavily inspired by [Kartena](https://github.com/kartena/)'s Zoomslider and PanControl