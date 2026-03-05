"use client";
import React from "react";

export default function Home() {
  const devices = {
    air1: React.useState(false),
    air2: React.useState(false),
    air3: React.useState(false),
    air4: React.useState(false),
    light1: React.useState(false),
    light2: React.useState(false),
    light3: React.useState(false),
  };

  type Device = keyof typeof devices;
  // interface Command {
  //   ons: Device[];
  //   offs: Device[];
  // }
  const keys=Object.keys(devices) as Device[]
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="row-start-2 flex flex-col gap-4">
        {keys.map((key)=>(
          <div key={key} className="flex items-center gap-2">
            <label htmlFor={key}>{key}</label>
            <input
              id={key}
              type="checkbox"
              checked={devices[key][0]}
              onChange={(e) => devices[key][1](e.target.checked)}
            />
          </div>
        ))}
        <button
          onClick={()=>{
            fetch('http://localhost:5000/',{
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
                ons:keys.filter(k=>devices[k][0]),
                offs:keys.filter(k=>!devices[k][0])
              })
            })
          }}
        >send</button>
      </div>

    </div>
  );
}
