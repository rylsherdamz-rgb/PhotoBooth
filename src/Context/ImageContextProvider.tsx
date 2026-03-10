import React, { useState } from "react";
import { imageContext,  } from "./ImageContext";
import type {ImageContext as ImgCtxType} from "./ImageContext"
import type{ReactNode} from "react"
import { useLocalStorage } from "../hooks/useLocalStorage";
interface ImageProviderProps {
  children: ReactNode;
}

export const ImageContextProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [image, setImage] = useState<ImgCtxType[]>([]);
  const [selectedLayoutId, setSelectedLayoutId] = useLocalStorage<string | null>(
    "photobooth_selected_layout",
    null
  );

  return (
    <imageContext.Provider
      value={{ data: image, setImage, selectedLayoutId, setSelectedLayoutId }}
    >
      {children}
    </imageContext.Provider>
  );
};
