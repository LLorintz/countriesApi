


const Filter = ({onSelect}:{onSelect:(value:string)=>void}) => {

    const handleSelection = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        onSelect(e.target.value)
    }

  return (
    <select onChange={handleSelection}>
        <option className="option" value="">Filter by Region</option>
        <option className="option" value="Africa">Africa</option>
        <option className="option" value="America">America</option>
        <option className="option" value="Asia">Asia</option>
        <option className="option" value="Europe">Europe</option>
        <option className="option" value="Oceania">Oceania</option>
    </select>
  )
}

export default Filter