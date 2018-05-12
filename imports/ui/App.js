import React, { Component } from 'react';
import Visual from './Visual.js';
import Filter from './Filter.js';
import FilterRoute from './FilterRoute.js';
import { History } from '../api/history.js';
import { Meteor } from 'meteor/meteor';

import { withTracker } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper.js';
// App component - represents the whole app

class App extends Component {

	constructor(props)
{
	super(props);

this.state = {
	buses:null,
	selectedRoute: null,
	tag: null,
	route: null,
	rutas: null,
	flag: false
}
this.manejarSubmitTag = this.manejarSubmitTag.bind(this);
this.manejarSubmitRuta = this.manejarSubmitRuta.bind(this);
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
manejarSubmitTag(str)
{
	this.setState({tag: str});
}


manejarSubmitRuta(str)
{
	this.setState({route:str});
	console.log("va a hacer el call");
    Meteor.call('history.insert', this.state.tag,str);

}

home()
{
	this.setState({
	buses:null,
	selectedRoute: null,
	tag: null,
	route: null,
	rutas: null,
	flag: false
	})
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
							</div>

					);

	else if(this.state.tag!==null)
					return (
							<div>
							<AccountsUIWrapper />
									<FilterRoute rutas={this.state.rutas} manejarSubmitRoute={this.manejarSubmitRuta} home={this.home}/>
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