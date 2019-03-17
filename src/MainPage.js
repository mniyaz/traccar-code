import React, {Component} from 'react';
import {connect} from 'react-redux';
import ContainerDimensions from 'react-container-dimensions';
import MainToobar from './MainToolbar';
import MainMap from './MainMap';
import withStyles from '@material-ui/core/styles/withStyles';
import SocketController from './SocketController';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {get} from 'lodash';

const mapStateToProps = state => ({
    positions: get(state.reducer, 'positions')
});

const position = [3.0409857, 101.601594];
const map = (
    <Map center={position} zoom={13}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={position}>
            <Popup>A pretty CSS3 popup.<br/>Easily customizable.</Popup>
        </Marker>
    </Map>
);

const styles = theme => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column-reverse'
        }
    },
    mapContainer: {
        flexGrow: 1
    },
});

class MainPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            columnDefs: [
                {headerName: 'Name', field: 'name', sortable: true, filter: true, checkboxSelection: true},
                {headerName: 'Status', field: 'status', sortable: true},
                {headerName: 'SpeedLimit', field: 'speedLimit', sortable: true, filter: true},
                {headerName: 'Ignition', field: 'ignition', sortable: true, filter: true},
                {headerName: 'Latitude', field: 'latitude', sortable: true, filter: true},
                {headerName: 'Longitude', field: 'longitude', sortable: true, filter: true}

            ],
            rowData: [],
            markers: [[51.505, -0.09]],
            devicesJson: [],
            positionJson: [],
        };
        //this.setState({ rowData: [{make: "Nissan", model: "Celica", price: 35000},{make: "Toyota", model: "Celica", price: 35000}] }) ;
        this.state.devicesJson.map(
            function (elem) {

                console.log('elem' + elem.id);
            }
        );

    }


    addMarker = (e) => {
        const {markers} = this.state;
        markers.push(e.latlng);
        this.setState({markers});
    };

    componentDidMount() {


        fetch('/api/session').then(response => {
            if (response.ok) {
                this.setState({
                    loading: false
                });
            } else {
                this.props.history.push('/login');
            }
        });
    }

    render() {
        const tableData = [];
        fetch('/api/devices').then(response => {
            if (response.ok) {

                response.json().then(devices => {
                    this.setState({devicesJson: devices});

                    fetch('/api/positions').then(response => {
                        if (response.ok) {

                            response.json().then(positions => {
                                this.setState({positionJson: positions});

                                for (let i = 0; i < this.state.devicesJson.length; i++) {
                                    //console.log("tableData"+this.state.devicesJson[i].id);
                                    for (let j = 0; j < this.state.positionJson.length; j++) {
                                        //console.log("this.state.devicesJson[i].id::"+this.state.devicesJson[i].id);
                                        // console.log("this.state.positionJson[i].id::"+this.state.positionJson[j].deviceId);
                                        if (this.state.devicesJson[i].id == this.state.positionJson[j].deviceId) {
                                            // console.log("pushed");
                                            tableData.push({
                                                name: this.state.devicesJson[i].name,
                                                status: this.state.devicesJson[i].status,
                                                speedLimit: this.state.devicesJson[i].attributes.speedLimit,
                                                ignition: this.state.positionJson[j].attributes.ignition,
                                                latitude: this.state.positionJson[j].latitude,
                                                longitude: this.state.positionJson[j].longitude
                                            });
                                        }
                                    }
                                    if (tableData.length == i) {
                                        tableData.push({
                                            name: this.state.devicesJson[i].name,
                                            status: this.state.devicesJson[i].status,
                                            speedLimit: this.state.devicesJson[i].attributes.speedLimit,
                                            ignition: '',
                                            latitude: '',
                                            longitude: ''
                                        });
                                    }
                                }


                                this.setState({rowData: tableData});
                            });
                        }


                    });
                });
            }

        });


        const {classes} = this.props;
        const {loading} = this.state;
        //console.log('here' + this.state.devicesJson);
        if (loading) {
            return (
                <div>Loading...</div>
            );
        } else {
            return (
                <div className={classes.root}>
                    <SocketController/>
                    <MainToobar history={this.props.history}/>
                    <div className={classes.mapContainer}>
                        <ContainerDimensions>
                            <MainMap/>
                        </ContainerDimensions>
                    </div>
                    <div className={classes.content}>

                    </div>
                    <div>
                        <div
                            className="ag-theme-balham"
                            style={{
                                height: '150px',
                                width: '100%'
                            }}
                        >

                            <AgGridReact rowSelection="multiple"
                                         columnDefs={this.state.columnDefs}
                                         rowData={this.state.rowData}>
                            </AgGridReact>
                        </div>
                    </div>
                </div>
            );
        }
    }
}


export default connect(mapStateToProps)(withStyles(styles)(MainPage));

