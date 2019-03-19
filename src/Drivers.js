import React, {Component} from 'react';
import MainToobar from './MainToolbar';
import withStyles from '@material-ui/core/styles/withStyles';
import SocketController from './SocketController';
import withWidth from '@material-ui/core/withWidth';


const styles = theme => ({
    root: {
        flex: 1
    },
    content: {
        flexGrow: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column-reverse'
        }
    },
    drawerPaper: {
        position: 'relative',

        width: 350,


        height: 250

    },
    marginLeft: {
        marginLeft: 10
    },
    margin: {
        margin: 20
    },
});


class MainPage extends Component {
    constructor(props) {
        const data = {'id': 12, 'name': 'Kevin', 'uniqueId': 12345, 'atributes': ''};
        super(props);
        this.state = {
            loading: true,
            driverJson: {'id': 12, 'name': 'Kevin', 'uniqueId': 12345, 'atributes': ''},
        };
    }

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
        fetch('/api/drivers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.driverJson)
        })
            .then(function (response) {
                //return response.json()
            }).then(function (body) {
            console.log('response body::' + body);
        });

    }

    render() {
        const {classes} = this.props;
        const {loading} = this.state;
        if (loading) {
            return (
                <div>Loading...</div>
            );
        } else {
            return (
                <div className={classes.root}>
                    <SocketController/>
                    <MainToobar history={this.props.history}/>
                    <div className={classes.margin}>
                        <div className={classes.marginLeft}>
                            <label>
                                Name:
                                <input type="text" value={this.state.value}/>
                            </label>
                        </div>
                        <div class="form-group">
                            <label>Name:</label>
                            <select class="form-control">
                                <option>Any</option>
                                <option>On Route</option>
                                <option>Not on Route</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Employee ID:</label>
                            <select class="form-control">
                                <option>Any</option>
                            </select>
                        </div>
                    </div>
                </div>

            );
        }
    }
}

export default withWidth()(withStyles(styles)(MainPage));
