import Navigation from "../components/Navigation"

export default function About() {

    

  return <div className="w-full flex flex-col gap-y-10  h-full" >
    <div className="w-full  h-20">
<Navigation />  
    </div>
    <div className="w-full h-screen bg-gray-200  py-10 px-5 ">
     <div className="flex flex-row gap-x-5 w-full h-[40vh]">
      <div className="w-1/2 h-full py-4 px-5 bg-red-300">
      <div className="border rounded-2xl px-4 w-30 py-1">
      <p className="text-lg  font-semibold">
        About Us
      </p>
   
      </div>
     <div className="w-full py-5 flex flex-col gap-y-5 mb-5 ">
    <p className="text-2xl">
      About Our PhotoBooth
    </p>    
    <p>
      We built SnapCharm to bring the classic joy of photo booths straight to your screen — no lines, no bulky hardware, and no limits. Whether you’re capturing a solo selfie, snapping laughs with friends, or creating memories with family, SnapCharm makes every moment picture-perfect and shareable.
    </p> 
      </div>
      <div className="w-full h-10 flex flex-row gap-x-5">
      <button className="bg-red-500 rounded-xl px-4 ">Get Started</button>
      <button className="border border-blue-300 px-4 rounded-xl">See Photos</button>
      </div>
        </div> 
    <div className="w-1/2 h-full p-5 px-30 bg-green-300">
      <div className="w-full h-full rounded-lg bg-blue-300">

      </div>
        </div>
    </div> 

    </div>
  </div>
}
