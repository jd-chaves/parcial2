import React, {Component} from "react";
import { Comments } from '../api/comments.js'


export default class Comentarios extends Component{

	constructor(props)
	{
		super(props);
		this.manejarSubmit = this.manejarSubmit.bind(this);
	}

	manejarSubmit()
	{
		var e = document.getElementById("comentario");
		var strUser = e.value;
		this.props.manejarSubmitComentario(strUser);

	}
	render()
	{
		temp = this.props.comentarios;
		console.log(temp);
		return(<div>
			<h1>Comentarios</h1>
			<textarea id="comentario" rows="3" cols="90" placeholder="Escribe aqui tus comentarios"></textarea>
			<br/>
			<br/>
			<button className="btn btn-info" type="button" onClick={this.manejarSubmit}>Comentar</button>
			<br/>
			<br/>
					<ul>
							{temp.map((c)=><li>
									<h6>User: {c.username}</h6>
									<p>{c.text}</p>
								</li>)}
					</ul>
			 

			</div>);
	}

} 