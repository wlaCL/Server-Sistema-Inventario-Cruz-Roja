import jwt from 'jsonwebtoken'; 


export const generarJWT = ( cedula = "" ) => {
    return new Promise( (resolve, reject) => {
    const payload = {cedula };
    jwt.sign( payload,  "q7497437_U&#UEOUEW@$%", {
        expiresIn: '4h'
    }, ( err, token ) => {

        if ( err ) {
            console.log(err);
            reject( 'No se pudo generar el token' )
        } else {
            resolve( token );
        }
    })

})
}


