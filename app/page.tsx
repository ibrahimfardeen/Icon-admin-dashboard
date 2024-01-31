"use client"
import { useState } from "react";
import Modal from "./components/Modal";
import SigninButton from "./components/SigninButton";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const [data, setData] = useState([])
  const [source, setSource] = useState(null)
  const [header, setHeader] = useState('Click any of the above buttons');
  const [alldata, setAlldata] = useState(false)
  
  const getData = async (eventname) => {    
    setAlldata(false)
    setHeader("Loading, Please wait...")
    setData([]);
    const res = await fetch("./api/getdata",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventname: eventname
      }),
    });
    const response = await res.json();
    if(eventname == '' && response.data.length > 0){
      setAlldata(true)
      setData(response.data);
      setHeader("All Events Total Registration : " + response.data.length);  
    }else if(eventname != '' && response.data.length > 0){
      setData(response.data);
      setHeader(eventname + " Total Registration : " + response.data.length);  
    }else{
      setData([])
      setHeader("NO REGISTRATIONS YET!");
    }

}
  const date = (x) => {
    return new Date(x).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  }
  const handleclose = () => {
    setSource(null)
  }
  const verify = async (event, verify) => {
    setHeader("Loading, Please wait...")
    setData([]);
    const res = await fetch("./api/verify",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: event,
        verify: verify
      }),
    });
    const response = await res.json();
    getData('');
  }
  const deleteData = async (event) => {
    setHeader("Loading, Please wait...")
    setData([]);
    const res = await fetch("./api/delete",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: event
      }),
    });
    const response = await res.json();
    getData('');
  }

  const teamEvents = ["PAPER-DE-FIESTA", "TECH QUEST", "IGNITE THE STAGE", "ADRENALINE RUSH", "IPL AUCTION"];  
  const { data: session } = useSession();

  

  if(session && session.user){
      return (
        <>         
        <div className="border-spacing-y-2 ml-3 mr-3">
        <span>
            <button onClick={() => signOut()} className="flex items-end gap-2 border-spacing-y-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                <img className="w-5 h-5" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
                <span>Sign out</span>
            </button>
        </span>
        <span><button type="button" onClick={() => getData('')} className="border-spacing-y-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Get All data</button></span> 
        <span><button type="button" onClick={() => getData('PAPER-DE-FIESTA')} className="border-spacing-y-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">PAPER-DE-FIESTA</button></span> 
        <span><button type="button" onClick={() => getData('DATABASE DETECTIVES')} className="border-spacing-y-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">DATABASE DETECTIVES</button></span> 
        <span><button type="button" onClick={() => getData('ALGO-RHYTHM')} className="border-spacing-y-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">ALGO-RHYTHM</button></span> 
        <span><button type="button" onClick={() => getData('TECH QUEST')} className="border-spacing-y-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">TECH QUEST</button></span> 
        <span><button type="button" onClick={() => getData('VOXRECK')} className="border-spacing-y-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">VOXRECK</button></span> 
        <span><button type="button" onClick={() => getData('IGNITE THE STAGE')} className="border-spacing-y-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">IGNITE THE STAGE</button></span> 
        <span><button type="button" onClick={() => getData('ADRENALINE RUSH')} className="border-spacing-y-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">ADRENALINE RUSH</button></span> 
        <span><button type="button" onClick={() => getData('IPL AUCTION')} className="border-spacing-y-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">IPL AUCTION</button></span>
        
        </div>
        <div className="flex items-center sm:justify-center ml-3 mr-3 border-spacing-y-2 text-2xl font-bold bg-red-800 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-red-500">{header ? header : ""}</div> 
        <div className="flex items-center sm:justify-center ml-3 mr-3 sm:ml-3">
            <table className="text-sm border-separate border-spacing-y-1">
              {data && data.length > 0 && <thead className="sr-only text-left font-medium text-lg sm:not-sr-only">
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  {(teamEvents.includes(header.split(" Total")[0]) || alldata) &&<th>Members</th>}
                  <th>Email</th>                
                  <th>Phone</th>
                  <th>College</th>
                  <th>Dept</th>
                  <th>Year</th>                
                  {alldata && <th>Event</th>}
                  <th>Date</th>
                  <th>Payment</th>
                </tr>
              </thead>}
              <tbody>
              {data && data.map((event, index) => (              
                <tr key={index} className="tr-class">
                  <td className="td-class">{index + 1}</td>
                  <td className="td-class">{event.fullname}</td>
                  {(teamEvents.includes(header.split(" Total")[0]) || alldata) && <td className="td-class">{event.teammembers}</td>}
                  <td className="td-class">{event.email}</td>
                  <td className="td-class">{event.phonenumber}</td>
                  <td className="td-class">{event.collegename}</td>
                  <td className="td-class">{event.department}</td>
                  <td className="td-class">{event.year}</td>
                  {alldata && <td className="td-class">{event.eventname}</td>}
                  <td className="td-class">{date(event.date)}</td>
                  <td className="sr-only sm:not-sr-only td-class"><button type="button" onClick={() => setSource(event.paymentfile)} className="border-spacing-y-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Show</button></td>
                  <td className="not-sr-only sm:sr-only td-class"><img src={event.paymentfile} alt="" /></td>
                  {
                  event.verified 
                  ?<td className="td-class">✅ Verified</td> 
                  :<td className="td-class"><button type="button" onClick={() => verify(event, true)} className="border-spacing-y-2 text-white bg-green-500 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-700 dark:border-green-700">Verify</button></td>
                  }
                  {/* <td className="td-class"><button type="button" onClick={() => verify(event, false)} className="border-spacing-y-2 text-white bg-yellow-500 hover:bg-yellow-900 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-500 dark:hover:bg-yellow-700 dark:focus:ring-yellow-700 dark:border-yellow-700">Unverify</button></td>
                  <td className="td-class"><button type="button" onClick={() => deleteData(event)} className="border-spacing-y-2 text-white bg-red-500 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-700 dark:border-red-700">Delete</button></td> */}
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
          {source && 
          <Modal source={source} onclose={handleclose}/>
          }
      </>
    );
  }else{
    return(
      <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-800">
      <div><p className="text-white">You are not authorized to view this page</p><br/></div>
        <button onClick={() => signIn()} className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
            <span>Sign in</span>
        </button>
      </div>
    )  
  }
}