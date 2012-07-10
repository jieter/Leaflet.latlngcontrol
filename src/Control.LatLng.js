/**
 * Provide a control to change the center of the map to a certain LatLng.
 *
 */
L.Control.LatLng = L.Control.extend({
	options: {
		editable: true
	},
	
	onAdd: function (map) {
		var className = 'leaflet-control-latlng',
			container = L.DomUtil.create('div', className);
		this._lat = 0;
		this._lng = 0;

		this._map = map;
		this._init(className, container, map);
		return container;
	},

	getValue: function () {
		return new L.LatLng(this._lat.value, this._lng.value);
	},

	_updateControl: function (event) {
		if (event) {
			this._map.panTo(this.getValue());
		} else {
			var mapcenter = this._map.getCenter();
			this._lat.value = L.Util.formatNum(mapcenter.lat, 5);
			this._lng.value = L.Util.formatNum(mapcenter.lng, 5);
		}
		
	},
	
	_init: function(className, container, map) {
		this._lat = L.DomUtil.create('input', className + '-lat', container);
		this._lng = L.DomUtil.create('input', className + '-lng', container);

		var self = this,
			updateClos = function () { self._updateControl(); };
		
		L.DomEvent
			.addListener(map, 'load', updateClos);

		L.DomEvent
			.addListener(container, L.Draggable.START, L.DomEvent.stopPropagation)
			.addListener(container, 'click', L.DomEvent.stopPropagation)
			.addListener(container, 'click', L.DomEvent.preventDefault);
		
		// Update map after change in input.
		L.DomEvent
			.addListener(this._lat, 'change', this._updateControl, this)
			.addListener(this._lng, 'change', this._updateControl, this)

		// Update control after map pan.
		L.DomEvent
			.addListener(map, 'moveend', updateClos)
			.addListener(map, 'drag', updateClos);
			
			
		if (!this.options.editable) {
			this._lat.disabled = "disabled";
			this._lng.disabled = "disabled";
		}
	}
});

L.Map.mergeOptions({
	latLngControl: true
});

L.Map.addInitHook(function () {
	if (this.options.latLngControl) {
		this.latLngControl = new L.Control.LatLng();
		this.addControl(this.latLngControl);
	}
});