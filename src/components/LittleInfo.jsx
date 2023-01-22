import React  from 'react'

const LittleInfo = ({littleInfo}) => {
    const {imgSrc, drinkName, positionX, positionY, display} = littleInfo
  return (
    <div className='littleInfo' style={{display,top:`${positionY}px`,left:`${positionX}px`}}>
        <img src={imgSrc} alt="sc"/>
        <h4>{drinkName}</h4>             
    </div>
  )
}

export default LittleInfo