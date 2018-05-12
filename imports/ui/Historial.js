import React, {Component} from "react";

import DatoHistorial from './DatoHistorial.js';

export default class Historial extends Component{
	render()
	{

		var temp = this.props.history;
				return(<div>
{temp.map((h)=>  <DatoHistorial dato={h} manejarSubmitHistorial={this.props.manejarSubmitHistorial} />)}
				</ div>);
	}

} 