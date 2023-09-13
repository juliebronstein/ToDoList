import React from 'react'

export const ConvertColor = ({item,className}) => {
//   const mystyle = {
//     color: item.code? item.code:null,
//     backgroundColor: item.code? item.code:null,
//   };
// style={mystyle}

  return (
    
    <div className={className} style={{background:`${item?item:"null"}` ,color:`${item?item:"null"}`}}></div>
  )
}