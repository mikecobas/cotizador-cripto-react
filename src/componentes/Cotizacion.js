import React from 'react';
import styled  from '@emotion/styled'

const ResultadoDiv = styled.div`
    color:#fff;
`

const Info = styled.p`
    font-size:18px;
    font-family:Arial, Helvetica, sans-serif;

    span{
        font-weight:bold
    }

`
const Precio = styled.p`
    font-size:30px;
    font-family:Arial, Helvetica, sans-serif;

    span{
        font-weight:bold
    }
`

const Cotizacion = ({resultado}) => {
    if(Object.keys(resultado).length === 0) return null;


    return ( 
        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>Precio más alto del día: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio más bajo del día: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variación últimas 24 hrs: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Ultima actualización: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
     )
}
 
export default Cotizacion;