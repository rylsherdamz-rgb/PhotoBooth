import { createContext } from "react";


export interface ImageContext {
    imgSrc: string;
     dateCreated: Date; 
     filter: string | null 


}

export const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };


export interface imageContextType {
    data : ImageContext[] | null
    setImage :  React.Dispatch<React.SetStateAction<ImageContext[]>>
    selectedLayoutId: string | null
    setSelectedLayoutId: React.Dispatch<React.SetStateAction<string | null>>
}

export const imageContext = createContext<imageContextType | null>( null)
