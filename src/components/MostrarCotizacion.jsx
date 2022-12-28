import React from 'react'

function MostrarCotizacion({mostrarCotizacion}) {
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE}=mostrarCotizacion
    return (
        <div className='md:flex justify-between p-5 md:p-10  lg:p-5 items-center bg-black shadow-xl opacity-90 rounded-xl'>
            <div>
            <p className='text-white font-bold text-xl md:text-3xl'>El precio es de: <span className='text-purple-500'>{PRICE}</span></p>
            <p className='text-white font-bold text-lg'>El precio mas alto del dia: <span className='text-purple-500'>{HIGHDAY}</span></p>
            <p className='text-white font-bold text-lg'>El precio mas bajo del dia: <span className='text-purple-500'>{LOWDAY}</span></p>
            <p className='text-white font-bold text-lg'>Variacion ultimas 24hrs: <span className='text-purple-500'>{CHANGEPCT24HOUR}</span></p>
            <p className='text-white font-bold text-lg'>Ultima Actualizacion: <span className='text-purple-500'>{LASTUPDATE}</span></p>
            </div>

            <div className='w-10 mx-auto lg:mx-0 md:w-1/5 '>
                <img className='' src={`https://www.cryptocompare.com/${IMAGEURL}`} alt="" />
            </div>
            
        </div>
    )
}

export default MostrarCotizacion
