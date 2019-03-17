import React, {Component} from 'react';
import ContainerDimensions from 'react-container-dimensions';
import MainToobar from './MainToolbar';
import MainMap from './MainMap';
import withStyles from '@material-ui/core/styles/withStyles';
import SocketController from './SocketController';
import withWidth from '@material-ui/core/withWidth';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';


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
    mapContainer: {
        flexGrow: 1,
        height: '100%'
    },
});

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
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
    }

    render() {
        var layout = [
            {i: '5v5', x: 0, y: 0, w: 2, h: 2, minW: 4, maxW: 8, static: true},
            {i: '5v5', x: 0, y: 0, w: 2, h: 2, minW: 4, maxW: 8, static: true},
            {i: 'm25', x: 0, y: 0, w: 2, h: 2, minW: 4, maxW: 8, static: true},
            {i: 'm25', x: 0, y: 0, w: 2, h: 2, minW: 4, maxW: 8, static: true}
        ];
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
                    <GridLayout container className="layout" layout={layout} cols={4} rowHeight={50} width={1500}>

                        <div key="a" class="panel-header"><span class="pull-left"><span class="vechicle-title">AHM3456 Kumar</span> l <a
                            href="dashboard.html">Change</a></span>
                            className={classes.drawerPaper}>
                            <div className={classes.mapContainer}>
                                <ContainerDimensions>
                                    <MainMap/>
                                </ContainerDimensions>
                            </div>
                        </div>

                        <div key="b" className={classes.drawerPaper}>
                            <div className={classes.mapContainer}>
                                <ContainerDimensions>
                                    <MainMap/>
                                </ContainerDimensions>
                            </div>
                        </div>

                        <div key="c" className={classes.drawerPaper}>
                            <div className={classes.mapContainer}>
                                <ContainerDimensions>
                                    <MainMap/>
                                </ContainerDimensions>
                            </div>
                        </div>

                        <div key="d" className={classes.drawerPaper}>
                            <div className={classes.mapContainer}>
                                <ContainerDimensions>
                                    <MainMap/>
                                </ContainerDimensions>
                            </div>
                        </div>

                    </GridLayout>
                </div>
            );
        }
    }
}

export default withWidth()(withStyles(styles)(MainPage));