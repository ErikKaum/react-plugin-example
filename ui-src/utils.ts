export function base64ToArrayBuffer(base64: any) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

export async function encode(canvas : any , ctx :any, imageData : ImageData | undefined) {
  ctx.putImageData(imageData, 0, 0)
  return await new Promise((resolve, reject) => {
    canvas.toBlob((blob : Blob) => {
      const reader : FileReader = new FileReader()
      // @ts-ignore
      reader.onload = () => resolve(new Uint8Array(reader.result))
      reader.onerror = () => reject(new Error('Could not read from blob'))
      reader.readAsArrayBuffer(blob)
    })
  })
}
  
export async function decode(canvas :any , ctx :any , bytes : any, width?: number, height?: number) {
  const url = URL.createObjectURL(new Blob([bytes]))
  const image = await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = url
  })
  // if no values are given for width and height, it's 512
  const imgWidth = width? width : 512 
  const imgHeight = height? height :  512
  
  canvas.width = imgWidth
  canvas.height = imgHeight

  ctx.drawImage(image, 0, 0)
  const imageData = ctx.getImageData(0, 0, imgWidth, imgHeight)
  return imageData
}