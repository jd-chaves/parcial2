# parcial2

Entrega del parcial 2 de la materia Programación con Tecnologías Web de la Universidad de los Andes. Usa el API de nextbus,
en particular peticiones de la forma 


`http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=${agencia}`
`http://webservices.nextbus.com/service/publicJSONFeed?command=schedule&a=${agencia}&r=${ruta}`

Para obtener listas de rutas de una agencia en particular y detalles de una ruta de una agencia, respectivamente.
La aplicación se encuentra desplegada [aquí](http://parcial2-web-dev.herokuapp.com/). Para usarla debe hacerse login, seleccionar una agencia, y seleccionar una ruta. Una vez hecho esto se pueden ver "time-tables" de la ruta y comentar en ellas. Además en la página principal se puede ver un historial de las busquedas y para cada entrada del historias hay un botón "Go" que permite ir al resultado de esa busqueda. 

Creado con Meteor-React-D3


## Tecnologias

En este proyecto se utilizó :
  - MongoDB
  - React
  - Meteor
  - D3

## Autor
 
  - [Juan Diego Chaves](https://github.com/jd-chaves)
