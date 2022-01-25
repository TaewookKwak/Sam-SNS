import React, { useState } from 'react'

function useForce(props) {
  const [value, setValue] = useState(0) // integer state
  return () => setValue((value) => ++value) // update the state to force render
}

export default useForce
