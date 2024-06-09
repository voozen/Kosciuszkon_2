'use client';
import { useState } from 'react';
import { getType } from '@/app/action';
import { Loader } from '@/components';
import Image from 'next/image';
import question from '@/assets/question.png';
import cardboard from '@/assets/cardboard.png';
import glass from '@/assets/glass.png';
import metal from '@/assets/metal.png';
import paper from '@/assets/paper.png';
import plastic from '@/assets/plastic.png';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  function onDetect() {
    setLoading(true);
    getType()
      .then(data => (setData(data), setLoading(false)))
      .catch(err => console.error(err));
    console.log(data);
  }

  const assets = { cardboard, glass, metal, paper, plastic };
  const fill = { default: '#121212', paper: '#0A59A8', cardboard: '#0A59A8', plastic: '#FAED25', metal: '#FAED25', glass: '#3BB44B' };

  return (
    <main className="grid grid-rows-2">
      <button className="py-6 px-12 bg-green-300 rounded-2xl text-xl font-semibold" onClick={onDetect}>
        Detect Trash
      </button>
      <div className="grid place-content-center">
        {loading ? <Loader /> : <div className="font-semibold">{data && !loading ? data[0].toUpperCase() + data.substring(1) : null}</div>}
      </div>
      <div className="grid place-items-center">
        <Image
          className={`pt-10 pb-5 -z-10 object-contain h-[150px] w-[150px] ${data && !loading ? 'drop' : ''}`}
          width={120}
          height={120}
          src={data && !loading ? assets[data] : question}
          alt="trash"
        />
        <svg
          className="transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)"
          style={{ fill: data && !loading ? fill[data] : fill.default }}
          width="150"
          height="200"
          viewBox="0 0 52.5 68"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M35.277 12.641C35.277 11.8129 35.9489 11.141 36.777 11.141C37.6051 11.141 38.277 11.8129 38.277 12.641V54.61C38.277 55.4381 37.6051 56.11 36.777 56.11C35.9489 56.11 35.277 55.4381 35.277 54.61V12.641ZM24.66 18.3207C24.66 17.4926 25.3319 16.8207 26.16 16.8207C26.9881 16.8207 27.66 17.4926 27.66 18.3207V48.9377C27.66 49.7658 26.9881 50.4377 26.16 50.4377C25.3319 50.4377 24.66 49.7658 24.66 48.9377V18.3207ZM14.043 12.641C14.043 11.8129 14.7149 11.141 15.543 11.141C16.3711 11.141 17.043 11.8129 17.043 12.641V54.61C17.043 55.4381 16.3711 56.11 15.543 56.11C14.7149 56.11 14.043 55.4381 14.043 54.61V12.641ZM52.32 0H0L7.0352 65.195C7.0977 65.7848 7.37895 66.3005 7.78911 66.6677C8.19145 67.031 8.73442 67.2497 9.33601 67.2497H42.992C43.5623 67.2497 44.0818 67.0505 44.5076 66.695C44.9451 66.3005 45.2264 65.7849 45.2889 65.195L52.3241 4.00543e-05L52.32 0Z"
            fill="currentFill"
          />
        </svg>
      </div>
    </main>
  );
}
