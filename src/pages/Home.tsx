import HomeCanvas from "../components/HomeCanvas";
import Footer from "../components/Footer"

export default function Home() {


  return (
    <div className="w-full h-full flex-1 overflow-x-hidden relative">
       <div className="w-full h-full">
          <HomeCanvas  />
        </div>
      <Footer />
    </div>
  );
}
