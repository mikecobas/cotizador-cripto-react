import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import axios from 'axios'

import useMoneda from '../hooks/useMoneda';
import useCriptoMoneda from '../hooks/useCriptomoneda';
import Error from './Error'


const Boton = styled.input`
    margin-top:20px;
    font-weight:bold;
    font-size:20px;
    padding:10px;
    background-color:#66a2fe;
    border:none;
    width:100%;
    border-radius:10px;
    color:#fff;
    transition: background-color .3s ease;

    &:hover{
        background-color:#326ac0;
        cursor:pointer;
    }
`

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    // State del listado de criptomonedas

    const [listadocripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);


    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra esterlina'},
    ];
    // Utilizar useMoneda

    const [moneda, SelectMonedas ] = useMoneda('Elige tu Moneda', '', MONEDAS); // Se pueden pasar valores, y usar en el state
    const [criptomoneda, SelectCripto ] = useCriptoMoneda('Elige tu Criptomoneda', '', listadocripto);

    useEffect(()=>{
        const consultarAPI = async () =>{
            const url ="https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
            const resultado = await axios.get(url)

            guardarCriptomonedas(resultado.data.Data)
        }
        consultarAPI()
    }, [])


    // cuando el usuario hace submit

    const cotizarMoneda = e =>{
        e.preventDefault();
        
        // validar si ambos estan llenos

        if(moneda === '' || criptomoneda === ''){
            guardarError(true)
            return
        }
        guardarError(false)
        guardarMoneda(moneda)
        guardarCriptomoneda(criptomoneda)

    }
    return (  
        <form
            onSubmit={cotizarMoneda}
        >
        {error ? <Error mensaje='Todos los campos son Obligatorios' /> : null}
        <SelectMonedas />
        <SelectCripto/>
            <Boton 
                type="submit"
                value="Calcular"
            />
        </form>
    );
}
 
export default Formulario;