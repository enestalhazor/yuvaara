import { useNavigate } from "react-router-dom";
import { AppContext, useContext } from "./AppContext"


function AdoptionLists() {

  const { lists } = useContext(AppContext)


  return (
    <>
      <div className="grid md:grid-cols-4 xl:grid-cols-5 gap-3">
        {lists.map((list) => (
          <div className="flex flex-col cursor-pointer group border rounded-xl border-zinc-600 bg-zinc-950 overflow-hidden">
            <div className="overflow-hidden">
              <img src={list.image} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-3 flex flex-col gap-1">
              <p className="text-sm text-white ">{list.name}</p>
              <p className="text-xs text-gray-300">{list.breed} · {list.age}</p>
              <p className="text-xs text-gray-500">{list.location}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AdoptionLists;