"use client";
import Image from "next/image"
const propertyHeaderImage =({image}) => {
  return (
    <section>
    <div className="container-xl m-auto">
      <div className="grid grid-cols-1">
        <Image
          src={`/properties/${image}`}
          alt=""
          className="object-cover h-[400px] w-full"
          width={0}
          height ={0}
          sizes='100vw'
        />
      </div>
    </div>
  </section>
  )
}

export default propertyHeaderImage