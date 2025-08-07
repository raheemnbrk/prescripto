import { docInfos } from "../assets/assets"

export default function MyAppointments(){
    return(
        <>
          <div className="flex flex-col space-y-6 mt-16" >
            <h1 className="text-gray-600 text-xl capitalize" >My appointements</h1>
            <div className="flex flex-col space-y-4 px-4 py-6" >
                {docInfos.slice(0,3).map((ele , ind) => (
                    <div key={ind} className="p-4 flex flex-col md:flex-row md:justify-between gap-8 items-center border-b border-b-neutral-500" >
                        <div  className="flex flex-col md:flex-row gap-2 items-center">
                            <div className="w-full md:w-[200px]" ><img src={ele.image}/></div>
                            <div>
                                <h1 className="text-xl font-medium" >{ele.name}</h1>
                                <p className="font-light text-gray-600" >{ele.speciality}</p>
                                <p className="mt-6 text-gray-600 capitalize font-semibold text-lg" >adress</p>
                                <p className="text-gray-500 font-light">{ele.address.line1}</p>
                                <p className="text-gray-500 font-light">{ele.address.line2}</p>
                                <p className="flex gap-4" >
                                    <span>date & time:</span>
                                    <span className="text-gray-500 font-light" >23jul -2025 | 5:30pm</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 capitalize font-semibold self-start ml-6 md:self-center" >
                            {ind !== 0 && (<button className="bg-primary text-white cursor-pointer px-4 py-2" >paid</button>) }
                            <button className="px-4 py-2 w-fit border border-neutral-500 cursor-pointer text-neutral-500" >cancel appointement</button>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </>
    )
}