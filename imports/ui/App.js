import React, { Component } from 'react';
import Visual from './Visual.js';
import Filter from './Filter.js';
import FilterRoute from './FilterRoute.js';
import { History } from '../api/history.js';
import { Comments } from '../api/comments.js';
import { Meteor } from 'meteor/meteor';

import { withTracker } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper.js';

import Historial from './Historial.js';
import Comentarios from './Comentarios.js';
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
this.manejarSubmitComentarios = this.manejarSubmitComentarios.bind(this);
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

manejarSubmitComentarios(str)
{

    Meteor.call('comments.insert', str, this.state.tag, this.state.tag_name, this.state.route, this.state.route_name);

}

render() {

	if(!this.props.currentUser)
					return(<AccountsUIWrapper />);

	if((this.state.buses!==null&&this.state.selectedRoute!==null))
	{
		console.log("props");
		console.log(this.state.tag);

		console.log(this.state.route);
		console.log(this.props.comentarios);
		var comentarios = this.props.comentarios.filter((c)=>(c.agency === this.state.tag&&this.state.route === c.route));
		console.log("filter");
		console.log(comentarios);
					return (
								<div className="container">
								<AccountsUIWrapper />
										<Visual buses={this.state.buses} selectedRoute={this.state.selectedRoute} home={this.home} />
										<Comentarios manejarSubmitComentario={this.manejarSubmitComentarios} comentarios={comentarios} route_name={this.state.route_name} tag_name={this.state.tag_name} tag={this.state.tag} route={this.state.route}/>
									</div>
    );

	}

	else if(this.state.tag===null)
					return (
							<div>
							<AccountsUIWrapper />
									<Filter manejarSubmitTag={this.manejarSubmitTag} home={this.home}/>
									<h3>Historial</h3>
									<Historial history={this.props.history}   manejarSubmitHistorial={this.manejarSubmitHistorial}/>
							</div>

					);

	else if(this.state.tag!==null)
					return (
							<div>
							<AccountsUIWrapper />
									<FilterRoute rutas={this.state.rutas} manejarSubmitRoute={this.manejarSubmitRuta} home={this.home}/>
																		<h3>Historial</h3>

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
    comentarios: Comments.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);