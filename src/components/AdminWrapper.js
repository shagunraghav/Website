import React from 'react';
import "./assets/css/admin.css";

import className from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Sidebar from './Common/Sidebar';

//drawer imports
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';

const drawerwidth=240;

const styles = theme => ({
    
    root:{
        display:'flex'
    },
    
    toolbar:{
        paddingRight:24
    },
    appBar:{
        zIndex:theme.zIndex.drawer +1,
        transition: theme.transitions.create(['width','margin'],{
            easing: theme.transitions.easing.sharp,
            duration:theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift:{
        marginLeft:drawerwidth,
        width:`calc(100% - ${drawerwidth}px)`,
        transition: theme.transitions.create(['width','margin'],{
            easing: theme.transitions.easing.sharp,
            duration:theme.transitions.duration.enteringScreen,
        }),

    },
    appBarSpace: theme.mixins.toolbar,


    drawerPaper:{
        position:'relative',
        whiteSpace:"noWrap",
        width: drawerwidth,
        transition: theme.transitions.create('width',{
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
            })
    },
    drawerPaperClose:{
        overflowX:'hidden',
        width:theme.spacing.unit *7,
        transition: theme.transitions.create('width',{
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
        })
        },
    toolbarIcon:{
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-end',
        padding:'0 8px',
        ...theme.mixins.toolbar
    },
    content:{
        flexGrow:1,
        padding:theme.spacing.units*3,
        height:'100vh',
        overflow:'auto'
    }
})


class AdminWrapper extends React.Component{
    constructor(props){
        super(props);

        this.state={
            open: true
        }
    }
    handleDrawerOpen=(e)=>{
        this.setState({open:true});
    }
    handleDrawerClose=(e)=>{
        this.setState({open:false});
    }

    render(){
        const {classes}=this.props;
        return(
            <div id='admin-page' className={classes.root}>
                <AppBar className={className(classes.appBar ,this.state.open && classes.appBarShift) }>
                    <ToolBar className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerOpen}>
                            <MenuIcon>

                            </MenuIcon>
                        </IconButton>
                        <Typography 
                            component='h1'
                            variant="h6"
                            color="inherit"
                            nowrap>
                                Admin
                            </Typography>

                    </ToolBar>
                </AppBar>
                <Drawer
                classes={{
                paper: className(classes.drawerPaper,!this.state.open && classes.drawerPaperClose)
            }}
                variant="permanent"
                open={true}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon>

                            </ChevronLeftIcon>
                        </IconButton>
                    </div>
                    <Divider/>
                    <Sidebar/>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpace}/>
                    {this.props.children}
                </main>

                
            </div>
        )
    }
}

export default withStyles(styles)(AdminWrapper);