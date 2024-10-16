"use client"
import Footer from '@/components/Footer';
import Image from '@/components/Image';
import Loader from '@/components/Loader';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const Home = ()=>{
  const [allChallanges, setAllChallanges] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(()=>{
    const getData = async ()=>{
      const result = await fetch("api/fetchChallanges");
      const data = await result.json();
      setLoader(false);
      setAllChallanges(data.challanges);
      console.log(data);
    }
    getData();
  }, [])
  return <div>
    <h1 className='text-5xl text-center p-3 pt-5 text-purple-600'>All Challanges</h1>
    {
      loader ? <div className='flex justify-center items-center m-[20rem]'>
        <Loader/>
      </div>:
      allChallanges.map((challange:any, idx:number)=>(
        <Link key={idx} href={`/challenge/${challange.id}`}>
        <div className="max-w-6xl mx-auto my-8 flex justify-center">
          <div className="bg-white shadow-md rounded-lg flex flex-col md:flex-row items-center p-6 w-[80%]">
            
            <div className="flex justify-start flex-col text-left space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">{challange.title}</h2>
              <p className="text-gray-600">{challange.description}</p>
            </div>

            <div className="border-2 border-green-300 flex justify-center ml-8">
              <Image id={challange.id} className='base' />
            </div>

          </div>
        </div>
      </Link>
      ))
    }
    <div className='text-center p-4'>More Challanges coming soon...</div>
    <Footer/>
  </div>

}

const page = () => redirect('/challenge/1');

export default Home;
