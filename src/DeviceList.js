import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {updateDevices} from './actions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

const mapStateToProps = state => ({
    devices: state.positionReducer.devices
});

class DeviceList extends Component {
    componentDidMount() {

    }

    render() {
        axios.get('/api/devices').then(devices => {
                    this.props.dispatch(updateDevices(devices));
        });
        const devices = this.props.devices.map(device =>
            <Fragment key={device.id.toString()}>
                <ListItem button>
                    <Avatar>
                        <LocationOnIcon/>
                    </Avatar>
                    <ListItemText primary={device.name} secondary={device.uniqueId}/>
                    <ListItemSecondaryAction>
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <li>
                    <Divider variant="inset"/>
                </li>
                a
            </Fragment>
        );

        return (
            <List>
                {devices}
            </List>
        );
    }
}

export default connect(mapStateToProps)(DeviceList);
