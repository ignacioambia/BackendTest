### Auth

Para el dominio de Auth, vamos a necesitar que el usuario pueda registrarse por primera vez con sus datos (email, password), asimismo comprobar que no pueda hacerlo nuevamente si ya se encuentra registrado.

Luego el usuario procede a loguearse con los respectivos datos, una vez realizado el logueo, este EP (endpoint) nos devuelve un **token**. 

Para la evaluación del **token**, necesitamos crear un _middleware_ utilizando la librería _JWT_ y asignarle una **key** valida provista por una variable de entorno alojada en nuestro archivo _.env_

Una vez obtenido el **token**, podemos guardarlo como una variable global en nuestro software para probar API REST _(Postman, Insomnia)_, ya que luego va a ser requerido para ser utilizado en los **Headers**.

Requerimientos antes de consumir cada EP:
- Chequear que el token sea valido y no haya expirado.
- Corroborar que el usuario sea valido.

Jwt npm
https://www.npmjs.com/package/jsonwebtoken

Global variables (postman)
https://learning.postman.com/docs/sending-requests/variables/