
type Props={
    page?:number;
    pages?:number;
    onPageChange:(page?:number)=>void;
    refetch:()=> void;
}

const Pagination = ({page, pages, onPageChange, refetch}:Props) => {
    const pageNumbers= [];
    if(pages){
        for(let i=1; i<=pages;i++){
            pageNumbers.push(i);
        }
    }
  return (
    <div className="flex justify-center">
      <div className="flex border border-slate-300">
        {
            pageNumbers.map((number)=>(
                <button onClick={()=>{onPageChange(number); refetch();}} className={`px-2 py-1 ${page===number && "bg-gray-400"}`}>{number}</button>
            ))
        }
      </div>
    </div>
  )
}

export default Pagination
