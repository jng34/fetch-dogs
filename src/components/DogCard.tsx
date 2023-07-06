import { useEffect, useState } from "react";

interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

export default function DogCard({ dogObj }: Dog) {

  return (
    <li>
      <img src={dogObj.img} style={{ width: '100px', height: '100px '}}/>
      {dogObj.name}
    </li>
  )
}