import React, { FormEvent, useState } from "react"


type searchProps={
    onsearch:(SearchTerm:string)=>void
}

const Search = ({onsearch}:searchProps) => {
  const [input, setInput] = useState('')
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInput(e.target.value)
  }
const submitHandler=(e:FormEvent)=>{
    e.preventDefault()
    onsearch(input)
}

   return(<form onSubmit={submitHandler}>
        <input type="text" placeholder="Search for a country..." value={input} onChange={handleInputChange} />
   </form>)
  
}

export default Search