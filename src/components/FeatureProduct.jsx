import { Link } from "react-router-dom"

const FeatureProduct = () => {
  return (
    <div className="w-full mt-15 mb-10 flex justify-center items-center flex-col">
      <div className="flex justify-center gap-3 w-full ">
        <div className="flex flex-col items-center">
            <img className="w-[100px] sm:w-[180px] md:w-[240px] lg:w-[400px] " src="./cane1.png" alt="" />
            <h1 className="uppercase font-semibold text-[12px] w-[100px] mt-2 text-center leading-7 sm:text-lg md:w-[200px]">Pineapple Edition Cocktail</h1>
            <h3 className="uppercase font-semibold mt-1 text-[12px] sm:mt-2 sm:text-lg">rating : 4.5</h3>
            <h3 className="font-semibold mb-5 mt-4">$30</h3>
            <div>
                <Link className="uppercase font-semibold bg-amber-500 text-[10px] py-1 px-2 shadow-xl hover:bg-amber-400 sm:text-lg sm:px-3 sm:py-2">view details</Link>
            </div>
        </div>
        <div className="flex flex-col items-center">
            <img className="w-[100px] sm:w-[180px] md:w-[240px] lg:w-[400px] " src="./10.png" alt="" />
            <h1 className="uppercase font-semibold text-[12px] w-[100px] mt-2 text-center leading-7 sm:text-lg md:w-[200px]">Pineapple Edition Cocktail</h1>
            <h3 className="uppercase font-semibold mt-1 text-[12px] sm:mt-2 sm:text-lg">rating : 4.5</h3>
            <h3 className="font-semibold mb-5 mt-4">$30</h3>
            <div>
                <Link className="uppercase font-semibold bg-amber-500 text-[10px] py-1 px-2 shadow-xl hover:bg-amber-400 sm:text-lg sm:px-3 sm:py-2">view details</Link>
            </div>
        </div>
        <div className="flex flex-col items-center">
            <img className="w-[100px] sm:w-[180px] md:w-[240px] lg:w-[400px]  " src="./11.png" alt="" />
             <h1 className="uppercase font-semibold text-[12px] w-[100px] mt-2 text-center leading-7 sm:text-lg md:w-[200px]">Pineapple Edition Cocktail</h1>
            <h3 className="uppercase font-semibold mt-1 text-[12px] sm:mt-2 sm:text-lg">rating : 4.5</h3>
            <h3 className="font-semibold mb-5 mt-4">$30</h3>
            <div>
                <Link className="uppercase font-semibold bg-amber-500 text-[10px] py-1 px-2 shadow-xl hover:bg-amber-400 sm:text-lg sm:px-3 sm:py-2">view details</Link>
            </div>
        </div>
      </div>
      <div className="mt-10 ">
        <Link className="uppercase underline font-bold text-[18px]">view all products</Link>
      </div>
    </div>
  )
}

export default FeatureProduct
