type Props={
    selectedPrice?:number;
    onChange:(value?:number)=>void;
}

const PriceFilter = ({selectedPrice, onChange}:Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
        <h4 className="text-md font-semibold mb-2">Max Price</h4>
        <select className="border py-2 w-full px-2" value={selectedPrice} onChange={(event)=> onChange(event.target.value? parseInt(event.target.value): undefined)} >
            <option value="">Select max price</option>
            {[1000,500, 400, 300, 200,100].map((price)=>(
            <option value={price}>${price}</option>
        ))}

        </select>
        
    </div>
  )
}

export default PriceFilter
