"use client";

import ComponentLevelLoader from "@/components/loader/ComponentLevelLoader";
import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/service/product";
import { AddProductTypes } from "@/types/productTypes";
import { useContext, useState } from "react";
import Image from 'next/image'



export default function Home() {

  const [products, setProducts] = useState<AddProductTypes>();
  const [fileName, setFileName] = useState('');

  const {
    isAuthUser,
    componentLevelLoader,
    currentUpdatedProduct,
  } = useContext(GlobalContext);

  async function getListOfProducts() {
    const res = await getAllAdminProducts(fileName);
    if (res.success) {
      setProducts(res.data);
    }
  }

  function handleImage(e: any) {
    // setProducts({} as AddProductTypes )
    e.target.files[0] && setFileName(e.target.files[0].name);

  }
  return (
    <div>
      <div className={`${isAuthUser ? "afterLoginbg" : "bgImg flex items-center"}`}>
        <div className="px-3 pt-5">
          <h1 className="text-white text-6xl font-extrabold text-center">AUTOMATED BIRD SPECIES IDENTIFICATION</h1>
          <p className="text-white text-3xl text-center mt-5">Using Audio Signal Processing and Neural Network</p>
        </div>
        {
          isAuthUser &&
          <div className="pt-5">
            <h1 className="bg-gray-800 text-white p-2 text-center text-2xl font-bold">Bird Species Identification</h1>
            <div className='max-w-screen-xl mx-auto px-16 mt-4 flex justify-center'>
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
                      text={currentUpdatedProduct !== null ? 'Predict' : "Predict"}
                      color={"#ffffff"}
                      loading={componentLevelLoader && componentLevelLoader.loading}
                    />
                  ) : currentUpdatedProduct !== null ? (
                    "Predict"
                  ) : (
                    "Predict"
                  )}
                </button>
              </div>
              {
                products &&
                <div className="flex justify-between gap-4">
                  <div>
                    <Image src={products.imagesUrl} width={200} height={100} alt="bird image" className="object-contain aspect-square" ></Image>
                  </div>
                  <div className="">
                    <p className="font-medium text-gray-600 bg-white">
                      Audio File
                    </p>
                    <audio controls className="mt-3">
                      <source src={products.audioUrl} type="audio/ogg" />
                      Your browser does not support the audio element.
                    </audio>

                    <div className="mt-5">
                      <p className="font-medium text-gray-600 bg-white">
                        Bird Name
                      </p>
                      <p className="mt-3 text-white">{products.fileName}</p>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  );
}