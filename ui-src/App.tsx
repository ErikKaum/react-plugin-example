import React, { useState } from "react";
import img from './laundry-machine.png'
import './App.css'
import { run } from '@banana-dev/banana-dev'
import { base64ToArrayBuffer, decode, encode } from "./utils";

function App() {
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState('')

  const apiKey = ""
  const modelKey = ""

  const getImage = async () => {
    setLoading(true)

    const modelParameters = {
      prompt: prompt
    }
    const res: any = await run(apiKey, modelKey, modelParameters)
    const img = res.modelOutputs[0].image_base64
    
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
  
    const imgArray = base64ToArrayBuffer(img)
    const imgData = await decode(canvas, context, imgArray)
    const newImg = await encode(canvas, context, imgData)
    window.parent.postMessage({pluginMessage: {type: 'image', newImg}}, '*')
    setLoading(false)
  }

  const handleChange = (e:any) => {
    e.preventDefault()
    setPrompt(e.target.value)
  }

  return (
    <main>
        <img className={loading ? "animation" : ""} width={150} height={150} src={img}></img>
      <section>
        <h1>Laundy Machine</h1>
        <textarea onChange={(e) => {handleChange(e)}} placeholder="Write what you whish to see"></textarea>
        <button onClick={getImage}>Start machine</button>
      </section>
    </main>
  );
}

export default App;
