import React, {Component} from "react";


export default class DatoHistorial extends Component{

	constructor(props)
	{
		super(props);

		this.state = {
			agency: this.props.dato.agency,
			agency_name: this.props.dato.agency,
			route: this.props.dato.route,
			route_name: this.props.dato.route 

		}
		this.manejarSubmit = this.manejarSubmit.bind(this);
	}


	manejarSubmit()
	{
		this.props.manejarSubmitHistorial(this.state.agency, this.state.agency_name,this.state.route, this.state.route_name )
	}


	

	render()
	{
		return(<div>
			<p><strong>Agency:</strong> {this.props.dato.agency_name}.      <strong>Route:</strong> {this.props.dato.route_name}</p>
			<button className="btn btn-info" type="button" onClick={this.manejarSubmit}>Go</button>
		</div>);
				
	}

} 