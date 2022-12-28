import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import MostrarCotizacion from './components/MostrarCotizacion'
import useSelectMoneda from './hooks/useSelectMoneda'

function App() {

  const [cargando,setCargando]=useState(false)

  const moneda = [
    {id: 'USD', nombre: 'Dolar Estadounidense'},
    {id: 'MXN', nombre: 'Peso Mexicano'},
    {id: 'EUR', nombre: 'EURO'},
    {id: 'GBP', nombre: 'Libra Esterlina'},

  ]

  useEffect(()=>{
    
    axios.get("https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD")
    .then(res=>{
      const arrayCripto = res.data.Data.map(i=>{

        const obj={
          id:i.CoinInfo.Name,
          nombre:i.CoinInfo.FullName,
        }
        return obj
      })
      setCripto(arrayCripto)
      })
      
  },[])

  const [cripto,setCripto]=useState([])
  const [state,SeleccionMoneda]=useSelectMoneda("Elige tu moneda:",moneda)
  const [state2,SeleccionCripto]=useSelectMoneda("Elige tu Criptomoneda:",cripto)
  const [error,setError]=useState(false)
  const [monedas,setMonedas]=useState({})
  const [mostrarCotizacion,setMostrarCotizacion]=useState([])
  

  useEffect(()=>{
    if (Object.keys(monedas).length>0) {
      setCargando(true)
      const {state,state2}=monedas
      axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${state2}&tsyms=${state}`)
      .then(res=>{
        console.log(res.data)
        setMostrarCotizacion(res.data.DISPLAY[state2][state]);
        setCargando(false)
      })
    }
},[monedas])
  
  const handleSubmit=e=>{
    e.preventDefault()

    if (state=="" || state==undefined || state2=="" || state2==undefined) {
      setError(true)
    }else{
      setError(false)
      setMonedas({
        state,
        state2,
      })
    }
  }

  return (
    
    <div className="App h-screen  lg:flex justify-end">
      <div className='w-full lg:w-2/5 lg:mr-20 p-2 md:p-10 lg:p-0'>
        <h1 className='text-3xl lg:text-4xl font-bold mt-14 text-center text-white'>{"Cotiza Criptomonedas al Instante".toUpperCase()}</h1>
        <div className='block h-1 w-36 mx-auto bg-purple-500 mb-8 mt-1'></div>
        <form className='' action=""
        onSubmit={handleSubmit}
        >
          <div>
              <SeleccionMoneda/>
          </div>
          <div className='mt-5'>
              <SeleccionCripto/>
          </div>

          <input className='bg-purple-800 cursor-pointer w-full p-3 my-5 shadow-xl text-white font-semibold' type="submit" value="CALCULAR" />
          {error && (
            <>
            <p className='text-red-500 font-bold text-center'>*Elige una moneda*</p>
            </>
          )}
          {mostrarCotizacion.PRICE && <MostrarCotizacion
          mostrarCotizacion={mostrarCotizacion}
          />}
          {cargando && (
            <div className='flex items-center justify-center mt-10 text-white text-xl font-bold'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="animate-spin w-14 h-14 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>

              <span>CARGANDO</span>
          </div>
          )}
        </form>
        
      </div>
    </div>
  )
}

export default App
