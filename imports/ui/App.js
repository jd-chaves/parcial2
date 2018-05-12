import React, { Component } from 'react';
import Visual from './Visual.js';
import Filter from './Filter.js';
import FilterRoute from './FilterRoute.js';
// App component - represents the whole app

export default class App extends Component {

	constructor(props)
{
	super(props);

this.state = {
	buses:null,
	selectedRoute: null,
	tag: null,
	route: null,
	rutas: null
}
this.manejarSubmitTag = this.manejarSubmitTag.bind(this);
this.manejarSubmitRuta = this.manejarSubmitRuta.bind(this);
}

componentDidMount()
{
	
	fetch("https://gist.githubusercontent.com/john-guerra/6a1716d792a20b029392501a5448479b/raw/e0cf741c90a756adeec848f245ec539e0d0cd629/sfNSchedule")
			.then(data => data.json())
			.then(json => this.getData(json));
	

	
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
		selectedRoute
	});
}
manejarSubmitTag(str)
{
	this.setState({tag: str});
}


manejarSubmitRuta(str)
{
	this.setState({route:str});
}

render() {
	if((this.state.buses!==null&&this.state.selectedRoute!==null))
					return (
								<div className="container">

										<Visual buses={this.state.buses} selectedRoute={this.state.selectedRoute} />
										
											
									</div>
);

	else if(this.state.tag===null)
					return (
							<div>
									<Filter manejarSubmit={this.manejarSubmitTag}/>
							</div>

					);

	else if(this.state.tag!==null)
					return (
							<div>
									<FilterRoute manejarSubmit={this.manejarSubmitRuta}/>
							</div>

					);

else
return (<div></div>);
}
}

