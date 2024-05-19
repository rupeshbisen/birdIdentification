"use client";

import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/service/product";
import { AddProductTypes } from "@/types/productTypes";
import ComponentLevelLoader from "@/components/loader/ComponentLevelLoader";
import Image from "next/image";
import Notification from "@/components/Notification";
import { toast } from "react-toastify";

export default function Home() {
  const [products, setProducts] = useState<AddProductTypes>();
  const [fileName, setFileName] = useState('');
  const { isAuthUser, componentLevelLoader, setComponentLevelLoader } = useContext(GlobalContext);

  useEffect(() => {
    // Watch for changes in fileName and update audio source
    if (products) {
      const audioElement = document.getElementById("audioPlayer") as HTMLAudioElement;
      if (audioElement) {
        audioElement.src = products.audioUrl;
      }
    }
  }, [fileName, products]);

  async function getListOfProducts() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res = await getAllAdminProducts(fileName);
    if (res.success) {
      setProducts(res.data);
      toast.success(res.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    // Clear previous audio source
    const audioElement = document.getElementById("audioPlayer") as HTMLAudioElement;
    if (audioElement) {
      audioElement.src = "";
    }
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  }

  return (
    <div>
      <div className={`${isAuthUser ? "afterLoginbg" : "bgImg flex items-center justify-center"} pt-20`}>
        <div className="px-3 pt-5">
          <h1 className="text-white text-3xl md:text-6xl font-extrabold text-center">AUTOMATED BIRD SPECIES IDENTIFICATION</h1>
          <p className="text-white text-xl md:text-3xl text-center mt-5">Using Audio Signal Processing and Neural Network</p>
        </div>
        {isAuthUser && (
          <div className="py-5">
            <h1 className="bg-gray-800 text-white p-2 text-center text-2xl font-bold">Bird Species Identification</h1>
            <div className='max-w-screen-xl mx-auto px-16 mt-4 flex justify-center flex-wrap'>
              <div className="flex flex-col gap-16 m-5">
                <input
                  className='text-black w-60'
                  accept='audio/*,*.mpeg'
                  max='1000000'
                  type="file"
                  onChange={handleImage}
                />
                <button
                  onClick={getListOfProducts}
                  className="inline-flex items-center w-1/2 justify-center bg-blue-600 rounded py-2 px-3 text-base text-white font-medium uppercase tracking-wide"
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={'Predict'}
                      color="#ffffff"
                      loading={componentLevelLoader && componentLevelLoader.loading}
                    />
                  ) : (
                    "Predict"
                  )}
                </button>
              </div>
              {products && (
                <div className="flex flex-wrap justify-center gap-4 bg-slate-400 rounded-md p-5">
                  <div>
                    <Image src={products.imagesUrl} width={200} height={100} alt="bird image" className="object-contain aspect-square" />
                  </div>
                  <div className="">
                    <p className="font-medium text-gray-600 ">Audio File</p>
                    <audio id="audioPlayer" controls className="mt-3">
                      <source src={products.audioUrl} type="audio/ogg" />
                      Your browser does not support the audio element.
                    </audio>
                    <div className="mt-5 flex">
                      <p className="font-medium text-gray-600">Bird Name:</p>
                      <p className="text-slate-100 ps-2">{products.fileName}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Notification />
    </div>
  );
}
