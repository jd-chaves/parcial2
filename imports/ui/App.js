import React, { Component } from 'react';
import Visual from './Visual.js';
import Filter from './Filter.js';
import FilterRoute from './FilterRoute.js';
import { History } from '../api/history.js';
import { Meteor } from 'meteor/meteor';

import { withTracker } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper.js';

import Historial from './Historial.js';
// App component - represents the whole app

class App extends Component {

	constructor(props)
{
	super(props);

this.state = {
	buses:null,
	selectedRoute: null,
	tag: null,
	tag_name: null,
	route: null,
	route_name:null,
	rutas: null,
	flag: false
}
this.manejarSubmitTag = this.manejarSubmitTag.bind(this);
this.manejarSubmitRuta = this.manejarSubmitRuta.bind(this);
this.manejarSubmitHistorial = this.manejarSubmitHistorial.bind(this);
this.home = this.home. bind(this);
}

componentDidUpdate()
{	
	if(this.state.tag!==null&&this.state.route!==null&&!this.state.flag)
	{
		var the_tag =this.state.tag;
		var the_route = this.state.route;
	fetch(`http://webservices.nextbus.com/service/publicJSONFeed?command=schedule&a=${the_tag}&r=${the_route}`)
			.then(data => data.json())
			.then(json => this.getData(json));
	}
	else if(this.state.tag!==null&&this.state.rutas==null)
	{
		var the_tag =this.state.tag;
		fetch(`http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=${the_tag}`)
			.then(data => data.json())
			.then(json => this.getDataRutas(json));
		
	}	
}


getDataRutas(agencia)
{
	this.setState({rutas: agencia.route});
}

getData(busSchedule)
{
	let selectedRoute = busSchedule.route[0];
	let buses = [];
	for (let bus of selectedRoute.tr) { 
		let route = bus.stop.filter((d) => d.content!=="--");
		route.forEach((d) => d.date = new Date(+d.epochTime));    
		buses.push(route);
	}
	this.setState({
		buses,
		selectedRoute,
		flag:true
	});
}
manejarSubmitTag(str, the_tag_name)
{
	this.setState({tag: str,
					tag_name: the_tag_name});
}


manejarSubmitRuta(str, the_route_name)
{
	this.setState({route:str,
					route_name: the_route_name, 

	});
	console.log("va a hacer el call");
    Meteor.call('history.insert', this.state.tag, this.state.tag_name, str, the_route_name);

}

home()
{
	this.setState({
	buses:null,
	selectedRoute: null,
	tag: null,
	tag_name: null,
	route: null,
	route_name:null,
	rutas: null,
	flag: false
	})
}


manejarSubmitHistorial(the_tag, the_tag_name, the_route, the_route_name)
{

	this.setState({

	tag: the_tag,
	tag_name: the_tag_name,
	route: the_route,
	route_name:the_route_name,
	rutas: [],
	flag: false

	});
}

render() {

	if(!this.props.currentUser)
					return(<AccountsUIWrapper />);

	if((this.state.buses!==null&&this.state.selectedRoute!==null))
					return (
								<div className="container">
								<AccountsUIWrapper />
										<Visual buses={this.state.buses} selectedRoute={this.state.selectedRoute} home={this.home} />
																					
									</div>
);

	else if(this.state.tag===null)
					return (
							<div>
							<AccountsUIWrapper />
									<Filter manejarSubmitTag={this.manejarSubmitTag} home={this.home}/>
									<Historial history={this.props.history}   manejarSubmitHistorial={this.manejarSubmitHistorial}/>
							</div>

					);

	else if(this.state.tag!==null)
					return (
							<div>
							<AccountsUIWrapper />
									<FilterRoute rutas={this.state.rutas} manejarSubmitRoute={this.manejarSubmitRuta} home={this.home}/>
									<Historial history={this.props.history}   manejarSubmitHistorial={this.manejarSubmitHistorial}/>
							</div>

					);

else
return (<div></div>);
}
}

export default withTracker(() => {
  Meteor.subscribe('history');

  return {
    history: History.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);