import React, {Component} from "react";


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
		var strUser1 = e.options[e.selectedIndex].text;
		this.props.manejarSubmitRoute(strUser, strUser1);
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

				<button className="btn btn-info" type="button" onClick={this.props.home}>Home</button>
			</div>
		):<div></div>;
				
	}

} 