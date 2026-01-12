import { useState, useEffect } from "react";
import HomeCanvas from "../components/HomeCanvas";

export default function Home() {


  return (
    <div className="w-full h-full flex-1 overflow-x-hidden relative">
       <div className="w-full h-full">
          <HomeCanvas  />
        </div>
    </div>
  );
}
