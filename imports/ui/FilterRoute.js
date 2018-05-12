import React, {Component} from "react";
import * as d3 from "d3";

export default class FilterRoute extends Component{

	constructor(props)
	{
		super(props);
		this.manejarSubmit = this.manejarSubmit.bind(this);
	}


	manejarSubmit()
	{
		var e = document.getElementById("rutas_opt");
		var strUser = e.options[e.selectedIndex].value;

		console.log(strUser);
		this.props.manejarSubmitRoute(strUser);
	}

	render()
	{
	    rutas = this.props.rutas;

		return (rutas!==null)?(
			<div>
				<select id="rutas_opt">
					     {rutas.map((a)=><option value={a.tag}>{a.title}</option>)}
				</select>
				<button className="btn btn-info" type="button" onClick={this.manejarSubmit}>Buscar</button>
			</div>
		):<div></div>;
				
	}

} 