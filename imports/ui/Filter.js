import React, {Component} from "react";


export default class Filter extends Component{

	constructor(props)
	{
		super(props);
		this.manejarSubmit = this.manejarSubmit.bind(this);
	}


	manejarSubmit()
	{
		var e = document.getElementById("agencies_opt");
		var strUser = e.options[e.selectedIndex].value;

		var strUser1 = e.options[e.selectedIndex].text;
		this.props.manejarSubmitTag(strUser, strUser1);
	}


	

	render()
	{
		agencias = [{title:"AC Transit",regionTitle:"California-Northern",tag:"actransit"},{title:"APL",regionTitle:"Maryland",tag:"jhu-apl"},{title:"Asheville Redefines Transit",regionTitle:"North Carolina",tag:"art"},{title:"Atlanta Streetcar - Beta",regionTitle:"Georgia",tag:"atlanta-sc"},{title:"Big Blue Bus",regionTitle:"California-Southern",tag:"bigbluebus"},{title:"Brockton Area Transit Authority",regionTitle:"Massachusetts",tag:"brockton"},{title:"Camarillo Area (CAT)",regionTitle:"California-Southern","shortTitle":"Camarillo (CAT)",tag:"camarillo"},{title:"Cape Cod Regional Transit Authority",regionTitle:"Massachusetts","shortTitle":"CCRTA",tag:"ccrta"},{title:"Chapel Hill Transit",regionTitle:"North Carolina","shortTitle":"Chapel Hill",tag:"chapel-hill"},{title:"Charm City Circulator",regionTitle:"Maryland",tag:"charm-city"},{title:"City College NYC",regionTitle:"New York",tag:"ccny"},{title:"City of Oxford",regionTitle:"Mississippi",tag:"oxford-ms"},{title:"City of West Hollywood",regionTitle:"California-Southern",tag:"west-hollywood"},{title:"Config Stuff",regionTitle:"Other",tag:"configdev"},{title:"CyRide",regionTitle:"Iowa",tag:"cyride"},{title:"DC Circulator",regionTitle:"District of Columbia",tag:"dc-circulator"},{title:"DC Streetcar",regionTitle:"District of Columbia",tag:"dc-streetcar"},{title:"Downtown Connection",regionTitle:"New York",tag:"da"},{title:"Downtown Connection",regionTitle:"New York",tag:"dta"},{title:"Dumbarton Express",regionTitle:"California-Northern","shortTitle":"Dumbarton Exp",tag:"dumbarton"},{title:"EZRide - Charles River TMA",regionTitle:"Massachusetts","shortTitle":"Charles River EZRide",tag:"charles-river"},{title:"East Carolina University",regionTitle:"North Carolina",tag:"ecu"},{title:"Escalon eTrans",regionTitle:"California-Northern","shortTitle":"eTrans",tag:"escalon"},{title:"FAST",regionTitle:"California-Northern",tag:"fast"},{title:"Fairfax (CUE)",regionTitle:"Virginia",tag:"fairfax"},{title:"Foothill Transit",regionTitle:"California-Southern",tag:"foothill"},{title:"Fort Worth The T",regionTitle:"Texas",tag:"ft-worth"},{title:"Glendale Beeline",regionTitle:"California-Southern",tag:"glendale"},{title:"Gold Coast Transit",regionTitle:"California-Southern",tag:"south-coast"},{title:"Indianapolis International Airport",regionTitle:"Indiana",tag:"indianapolis-air"},{title:"JFK International Airport",regionTitle:"New York",tag:"jfk"},{title:"Jacksonville Transportation Authority",regionTitle:"Florida","shortTitle":"Jacksonville",tag:"jtafla"},{title:"LaGuardia Airport Employee Shuttle",regionTitle:"New York",tag:"laguardia"},{title:"LaGuardia Airport Shuttle",regionTitle:"New York",tag:"lga"},{title:"Los Angeles Metro",regionTitle:"California-Southern",tag:"lametro"},{title:"Los Angeles Rail",regionTitle:"California-Southern",tag:"lametro-rail"},{title:"MBTA",regionTitle:"Massachusetts",tag:"mbta"},{title:"Massachusetts Institute of Technology",regionTitle:"Massachusetts","shortTitle":"MIT",tag:"mit"},{title:"Moorpark Transit",regionTitle:"California-Southern",tag:"moorpark"},{title:"Newark Liberty International Airport",regionTitle:"New Jersey",tag:"ewr"},{title:"Nova Southeastern University",regionTitle:"Florida","shortTitle":"Nova",tag:"nova-se"},{title:"Omnitrans",regionTitle:"California-Southern",tag:"omnitrans"},{title:"Palos Verdes Transit",regionTitle:"California-Southern",tag:"pvpta"},{title:"Pensacola Beach (SRIA)",regionTitle:"Florida","shortTitle":"SRIA",tag:"sria"},{title:"Plymouth State University",regionTitle:"New Hampshire",tag:"psu"},{title:"Portland Streetcar",regionTitle:"Oregon",tag:"portland-sc"},{title:"Prince Georges County",regionTitle:"Maryland",tag:"pgc"},{title:"RTC RIDE, Reno",regionTitle:"Nevada",tag:"reno"},{title:"Radford Transit",regionTitle:"Virginia",tag:"radford"},{title:"Roosevelt Island",regionTitle:"New York",tag:"roosevelt"},{title:"Rutgers Univ. Newark College Town Shuttle",regionTitle:"New Jersey","shortTitle":"Rutgers Newark Shuttle",tag:"rutgers-newark"},{title:"Rutgers University",regionTitle:"New Jersey","shortTitle":"Rutgers",tag:"rutgers"},{title:"San Francisco Muni",regionTitle:"California-Northern","shortTitle":"SF Muni",tag:"sf-muni"},{title:"Seattle Streetcar",regionTitle:"Washington",tag:"seattle-sc"},{title:"Simi Valley (SVT)",regionTitle:"California-Southern",tag:"simi-valley"},{title:"Societe de transport de Laval",regionTitle:"Quebec","shortTitle":"Laval",tag:"stl"},{title:"Sonoma County Transit",regionTitle:"California-Northern",tag:"sct"},{title:"Spokane International Airport",regionTitle:"Washington",tag:"geg"},{title:"Tahoe Area Regional Transit",regionTitle:"California-Northern","shortTitle":"Tahoe TART",tag:"tahoe"},{title:"Thousand Oaks Transit (TOT)",regionTitle:"California-Southern","shortTitle":"Thousand Oaks Transit",tag:"thousand-oaks"},{title:"Toronto Transit Commission",regionTitle:"Ontario","shortTitle":"Toronto TTC",tag:"ttc"},{title:"Unitrans ASUCD/City of Davis",regionTitle:"California-Northern","shortTitle":"Unitrans",tag:"unitrans"},{title:"University of California Berkeley",regionTitle:"California-Northern","shortTitle":"UC Berkeley",tag:"ucb"},{title:"University of California San Francisco",regionTitle:"California-Northern",tag:"ucsf"},{title:"University of Maryland",regionTitle:"Maryland",tag:"umd"},{title:"Ventura Intercity (VCTC)",regionTitle:"California-Southern","shortTitle":"Ventura (VCTC)",tag:"vista"},{title:"Western Kentucky University",regionTitle:"Kentucky",tag:"wku"},{title:"Winston-Salem",regionTitle:"North Carolina",tag:"winston-salem"},{title:"York College",regionTitle:"Pennsylvania",tag:"york-pa"}]


		return (
			<div>

			
				<h1>Buscar Agencia</h1>
				<select id="agencies_opt">
					{agencias.map((a)=>a.tag==="sf-muni"?<option value={a.tag} selected="selected">{a.title}</option>:<option value={a.tag}>{a.title}</option>)}
				</select>
				<button className="btn btn-info" type="button" onClick={this.manejarSubmit}>Buscar</button>

				<button className="btn btn-info" type="button" onClick={this.props.home}>Home</button>
			</div>
		)
				
	}

} 