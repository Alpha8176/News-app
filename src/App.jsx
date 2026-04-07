import React, { useState } from 'react'
import NavBar from './component/NavBar'
import NewsBoard from './component/NewsBoard'
import './App.css'

const App = () => {
  const [category,setCategory] = useState("general");
  return (
    <div >
<NavBar setCategory={setCategory}/>
<NewsBoard category={category}/>
    </div>
  )
}

export default App
