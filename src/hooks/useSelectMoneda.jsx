import React, { useState } from 'react'

function useSelectMoneda(label,monedas) {

    const [state,setState]=useState();
  
    const SeleccionMoneda =()=>(
        <>
          <label className='block text-white text-lg font-semibold' htmlFor="moneda">{label}</label>
          <select className='w-full cursor-pointer h-10 rounded-lg text-center shadow-xl' name="moneda" id="moneda"
          value={state}
          onChange={(e)=>setState(e.target.value)}
          >
            <option value="" selected disabled >--SELECCIONA--</option>
            {monedas.map(i=>(
                <option key={i.id} value={i.id}>{i.nombre}</option>
            ))}
          </select>
        </>
    )
 
    return [state,SeleccionMoneda]
}

export default useSelectMoneda
