import React, {Component, Fragment} from 'react';
import {GeoJSON, Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    positions: state.reducer.positions
});

type;
Position = [number, number];

type;
Props = { |
    content;
:
string,
    position;
:
Position,;
|
}

type;
MarkerData = { |;
...
Props, key;
:
string |
}

const MyPopupMarker = ({content, position}: Props) => (
    <Marker position={position}>
        <Popup>{content}</Popup>
    </Marker>
);

const MyMarkersList = ({markers}: { markers: Array<MarkerData> }) => {
    const items = markers.map(({key, ...props}) => (
        <MyPopupMarker key={key} {...props} />
    ));
    return <Fragment>{items}</Fragment>;
};

type;
State = {
    markers: Array < MarkerData >,
};

class MainMap extends Component {

    state = {
        lat: 3.0409857,
        lng: 101.601594,
        zoom: 12,
        data: null,
        markers: [
            {key: 'marker1', position: [3.0409857, 101.601594], content: 'My first popup'},
            {key: 'marker2', position: [51.51, -0.1], content: 'My second popup'},
            {key: 'marker3', position: [51.49, -0.05], content: 'My third popup'},
        ],
    };

    onEachFeature = (feature, layer) => {
        console.log('onEachFeature fired: ');
        layer.bindPopup('<h3><p>DriverName: ' + feature.properties.DriverName + '</p></h3><p>Status: ' + feature.properties.Status + '</p>');
        layer.on('mouseover', function (e) {
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            this.closePopup();
        });
        layer.on('click', function (e) {
            console.log('Event CLicked::' + e);
        });
    };


    render() {
        const position = [this.state.lat, this.state.lng];


        return (
            <Map style={{height: this.props.height, width: this.props.width}} center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"/>
                <GeoJSON data={getGeoJson()} style={this.getStyle} onEachFeature={this.onEachFeature}>

                </GeoJSON>

            </Map>
        );
    }
}

function getGeoJson() {
    return {
        'type': 'FeatureCollection',
        'features': [{
            'type': 'Feature',
            'properties': {'DriverName': 'USHA SELVAM', 'Speed': '0.0', 'Status': 'Idle'},
            'geometry': {'type': 'Point', 'coordinates': ['101.601594', '3.0409857']}
        }, {
            'type': 'Feature',
            'properties': {'DriverName': 'SANKAR LINGAM RAMASAMY', 'Speed': '0.0', 'Status': 'Idle'},
            'geometry': {'type': 'Point', 'coordinates': ['77.0190541', '11.0318117']}
        }, {
            'type': 'Feature',
            'properties': {'DriverName': 'Arumugam D', 'Speed': '0.0', 'Status': 'Idle'},
            'geometry': {'type': 'Point', 'coordinates': ['77.0187893', '11.0316581']}
        }, {
            'type': 'Feature',
            'properties': {'DriverName': 'ROBERT WILLIAMS', 'Speed': '0.0', 'Status': 'Idle'},
            'geometry': {'type': 'Point', 'coordinates': ['77.0189908', '11.0318452']}
        }, {
            'type': 'Feature',
            'properties': {'DriverName': 'STEVE J', 'Speed': '0.0', 'Status': 'Idle'},
            'geometry': {'type': 'Point', 'coordinates': ['77.0189776', '11.0318264']}
        }, {
            'type': 'Feature',
            'properties': {'DriverName': 'Dhamu D', 'Speed': '0.0', 'Status': 'Idle'},
            'geometry': {'type': 'Point', 'coordinates': ['77.018957', '11.031827']}
        }, {
            'type': 'Feature',
            'properties': {'DriverName': 'prem nazeer', 'Speed': '0.0', 'Status': 'Idle'},
            'geometry': {'type': 'Point', 'coordinates': ['74.4404307', '16.7046639']}
        }, {
            'type': 'Feature',
            'properties': {'DriverName': 'Eugene Tan', 'Speed': '0.0', 'Status': 'Idle'},
            'geometry': {'type': 'Point', 'coordinates': ['77.0190039', '11.031811']}
        }, {
            'type': 'Feature',
            'properties': {'DriverName': 'XXX THREE', 'Speed': '0.0', 'Status': 'Idle'},
            'geometry': {'type': 'Point', 'coordinates': ['101.6009117', '3.0453283']}
        }, {
            'type': 'Feature',
            'properties': {'DriverName': 'demo demo', 'Speed': '0.0', 'Status': 'Idle'},
            'geometry': {'type': 'Point', 'coordinates': ['101.5996234', '3.0499416']}
        }, {
            'type': 'Feature',
            'properties': {'DriverName': 'DEMO STEVEN PANG', 'Speed': '0.0', 'Status': 'Idle'},
            'geometry': {'type': 'Point', 'coordinates': ['101.5995162', '3.0501256']}
        }, {
            'type': 'Feature',
            'properties': {'DriverName': 'BRUNO SEBASTIN', 'Speed': '0.0', 'Status': 'Idle'},
            'geometry': {'type': 'Point', 'coordinates': ['77.0189917', '11.0318028']}
        }, {
            'type': 'Feature',
            'properties': {'DriverName': 'PAWAN KUMAR', 'Speed': '0.0', 'Status': 'Idle'},
            'geometry': {'type': 'Point', 'coordinates': ['77.0189811', '11.0318593']}
        }, {
            'type': 'Feature',
            'properties': {'DriverName': 'David Raj', 'Speed': '0.0', 'Status': 'Idle'},
            'geometry': {'type': 'Point', 'coordinates': ['101.5488853', '3.0224654']}
        }, {
            'type': 'Feature',
            'properties': {'DriverName': 'RANJITH KUMAR', 'Speed': '0.0', 'Status': 'Idle'},
            'geometry': {'type': 'Point', 'coordinates': ['77.0183108', '11.0315925']}
        }, {
            'type': 'Feature',
            'properties': {'DriverName': 'ANADHA RAJ', 'Speed': '0.0', 'Status': 'Idle'},
            'geometry': {'type': 'Point', 'coordinates': ['77.0190075', '11.0318433']}
        }]
    };
}

export default connect(mapStateToProps)(MainMap);