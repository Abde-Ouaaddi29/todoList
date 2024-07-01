import React, { useEffect, useRef, useState } from "react";
import { GrAdd } from "react-icons/gr";
import "./todo.module.css";

export default function TodoList() {

  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem('items');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const [newuser, setNewuser] = useState(() => {
    const storeUser = localStorage.getItem('user');
    return storeUser ? JSON.parse(storeUser) : '';
  });

  const [currentDate, setCurrentDate] = useState(() => {
    const storedDates = localStorage.getItem('currentDate');
    return storedDates ? JSON.parse(storedDates) : [];
  });

  const [isCompleted, setIsCompleted] = useState(() => {
    const storedCompleted = localStorage.getItem('isCompleted');
    return storedCompleted ? JSON.parse(storedCompleted) : [];
  });

  const [isUpdating , setIsUpdating] = useState(false)

  const [updateIndex, setUpdateIndex] = useState(null);
  const [isToglle, setIsToglle] = useState(false);
  const text = useRef();
  const userName = useRef();

  useEffect(() => {
    console.log('Saving to localStorage:', items, currentDate, isCompleted,newuser);
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('currentDate', JSON.stringify(currentDate));
    localStorage.setItem('isCompleted', JSON.stringify(isCompleted));
    localStorage.setItem('user', JSON.stringify(newuser));
  }, [items, currentDate, isCompleted,newuser]);


const handleRemoveUser = () => {
  setNewuser('')
}

  const displaylist = () => {
    
    return items.map((item, k) => {
      return (

        <li className={isCompleted[k]? "  mb-2 bg-gray-200 border-1 flex justify-between p-3 ":"mb-2 bg-gray-100 border-1 flex justify-between p-3 "} key={k}>

          <div className={isCompleted[k] ? " lg:w-7/12 xl:w-7/12 md:w-7/12 w-8/12  text-black font-bold overflow-auto line-through opacity-25	":" lg:w-7/12 xl:w-7/12 md:w-7/12 w-8/12  text-black font-bold overflow-auto	"}> {item} </div>

          <div className="flex justify-end lg:w-5/12 xl:w-5/12 md:w-5/12 w-3/12  ">
                <span className={isCompleted[k] ? "text-gray-400 font-lighter p-2 mr-4 border-b lg:flex xl:flex md:flex hidden opacity-30	 ":"text-gray-400 font-lighter p-2 mr-4 border-b lg:flex xl:flex md:flex hidden "}> {currentDate[k]} </span>

                {isCompleted[k] ? 
                  <button className="border-b p-2 text-white font-bold" onClick={() => handleremove(k)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-500 hover:text-red-400 hover:translate-y-0.5 transform transition-all duration-300">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                 </button>
                :
                <button className="border-b lg:ml-4 xl:ml-4 md:ml-4 ml-0 p-2 text-white font-bold" onClick={() => handleUpdate(k)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-green-500 hover:text-green-400 hover:translate-y-0.5 transform transition-all duration-300" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              </button>
                }

               

                <button className="border-b lg:ml-4 xl:ml-4 md:ml-4 ml-0 p-2 text-white font-bold">
                    <input onChange={() => handleCompleted(k)} type="checkbox" className="h-5 w-5" checked={isCompleted[k]} />
                </button>
          </div>
        </li>
      );
    });
  };


  const handleCompleted = (index) => {
    setIsCompleted((prev) => {
      const updatedItems = [...prev];
      updatedItems[index] = !updatedItems[index];
      return updatedItems;
    });
  };

////--------------- the add function 
  const handleADD = () => {
    setIsUpdating(false)
    const TextValue = text.current.value;
    const date = ((new Date()).toISOString().substring( 11,16))  + " / " + ((new Date()).toISOString().substring(0,10 ))
    
    if (TextValue.trim() !== "") {
      if (updateIndex !== null) {
        ////////----------- If updateIndex is not null, update the existing item
        
        setItems((prevState) => {
          const updatedItems = [...prevState];
          updatedItems[updateIndex] = TextValue;
          return updatedItems;
        });
        setUpdateIndex(null); // Reset updateIndex after updating
      } else {
        ////------------- If updateIndex is null, add a new item
        setItems((prevState) => [...prevState, TextValue]);
        setCurrentDate((prevState)=> [...prevState, date]);
      }
      text.current.value = "";
    }
  };

  
 //// ---------- the removing function 
 const handleremove = (index) => {
  setItems((prevState) => prevState.filter((_, i) => i !== index));
  setCurrentDate((prevState) => prevState.filter((_, i) => i !== index));
  setIsCompleted((prevState) => prevState.filter((_, i) => i !== index));
  console.log("remove");
};



  //// the updating function 
  const handleUpdate = (index) => {
    setUpdateIndex(index); 
    text.current.value = items[index]; 
    console.log("update");
    setIsUpdating(true)
    
    console.log(isUpdating)
  };

  const toggleNotifucation = () => {
    setIsToglle((prevState) => !prevState)
    console.log(isToglle)
  }

  const AddUser = () => {
    const userNameValue = userName.current.value

    if(userNameValue.trim() !== '') {
      setNewuser(userNameValue)
      console.log(newuser)
      // isUserAdded = true
    }
    userName.current.value = ''
    // console.log(isUserAdded)
  }

  if (newuser === '') {
      return <>

      <div className="absolute  left-3 top-3">
        <button onClick={toggleNotifucation} className="  bg-yellow-400 p-2 font-bold rounded-md hover:bg-yellow-500 hover:translate-y-0.5 transform transition-all duration-300"> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
        </button>
      </div> 
    
      {isToglle ? 
          <div className=" bg-white p-4 text-center xl:w-full lg:w-full flex items-center justify-center"> 
            <input className=" border-2 p-2 mr-2 xl:w-4/12 lg:w-4/12 outline-yellow-300 md:w-4/12 rounded-md w-5/12 -tracking-tight" type="text" ref={userName} placeholder="username..." />
            <button className="py-2 px-4 bg-yellow-400 rounded font-bold tracking-widest text-yellow-700 hover:bg-yellow-500 hover:translate-y-0.5 transform transition-all duration-300 hover:text-yellow-700" onClick={AddUser} type="submit"> <GrAdd size={25} /> </button>
          </div>
        : 
        ''
      }
      
      <section className=" bg-white flex flex-col items-center w-full">

      <div className="  flex justify-center lg:w-5/12 md:w-10/12 sm:w-10/12 p-5 text-3xl text-center lg:mt-2 xl:mt-2 md:mt mt-16 mb-5 ">
              <h1 className=" font-bold text-black "> Daily notes </h1>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-black mt-2 ml-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
            </svg>
          </div>
      <div className="lg:w-10/12 xl:w-10/12 md:w-10/12 w-10/12 bg-gray-300 p-5">
        <div className="w-9/12 flex justify-evenly m-auto">
          <input placeholder="Typing..." className="border outline-blue-200 rounded p-2 lg:w-9/12 xl:9/12 md:9/12 w-8/12 " ref={text} type="text"/>
          <button className={isUpdating ? 'bg-green-300 text-green-600 rounded p-2 lg:w-2/12 xl:2/12 md:2/12 w-3/12 font-bold hover:bg-green-400 hover:translate-y-0.5 transform transition-all duration-300' : 'bg-yellow-300 text-yellow-600 rounded p-2 lg:w-2/12 xl:2/12 md:2/12 w-3/12 font-bold hover:bg-yellow-400 hover:translate-y-0.5 transform transition-all duration-300'} onClick={handleADD}>
            {isUpdating ? 'UPDATE' : 'ADD'}
          </button>
        </div>

        <div className=" mt-4 xl:w-10/12 lg:w-10/12 md:w-10/12 w-full  m-auto p-4 ">
          <ul>{items.length > 0 ? displaylist() : <li className="text-gray-600 border-2 p-4">No Items</li>}</ul>
        </div>
      </div>
    </section>
    </>

  }  else {

    return <>
        <section className="flex bg-slate-100 flex-col items-center w-full">

          <div className="  flex items-center  p-2 text-2xl text-yellow-200 absolute left-3 top-3  px-6 bg-gray-100 hover:translate-y-0.5 transform transition-all duration-300 ">
              <h2 className="font-lighter text-yellow-600" > welcome <span className="font-bold">{newuser}</span> </h2>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-yellow-600  lg:mt-1 ml-2 ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>

          <svg onClick={handleRemoveUser}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7 border-l cursor-pointer border-gray-500  ml-4 px-1 text-red-500 hover:text-red-400 hover:translate-y-0.5 transform transition-all duration-300">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
            {/* <span onClick={handleRemoveUser} className="text-red-400 ml-4">remove</span> */}
          </div>

            <div className="  flex justify-center lg:w-5/12 md:w-10/12 sm:w-10/12 p-5 text-3xl text-center lg:mt-2 xl:mt-2 md:mt mt-16 mb-5 ">
              <h1 className=" font-bold text-black "> Daily notes </h1>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-black mt-2 ml-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
            </svg>
          </div>
          <div className="lg:w-10/12 xl:w-10/12 md:w-10/12 w-10/12 bg-gray-300 p-5">
        <div className="w-9/12 flex justify-evenly m-auto">
          <input placeholder="Typing..." className="border outline-yellow-200 rounded p-2 lg:w-9/12 xl:9/12 md:9/12 w-8/12 " ref={text} type="text"/>
          <button className={isUpdating ? 'bg-green-300 text-green-600 rounded p-2 lg:w-2/12 xl:2/12 md:2/12 w-3/12 font-bold hover:bg-green-400 hover:translate-y-0.5 transform transition-all duration-300' : 'bg-yellow-300 text-yellow-600 rounded p-2 lg:w-2/12 xl:2/12 md:2/12 w-3/12 font-bold hover:bg-yellow-400 hover:translate-y-0.5 transform transition-all duration-300'} onClick={handleADD}>
            {isUpdating ? 'UPDATE' : 'ADD'}
          </button>
        </div>

        <div className=" mt-4 xl:w-10/12 lg:w-10/12 md:w-10/12 w-full  m-auto p-4 ">
          <ul>{items.length > 0 ? displaylist() : <li className="text-gray-600 border-2 p-4">No items</li>}</ul>
        </div>
      </div>
        </section>
      </>
  }

  }

//   return (
//     <>
//       <section className="flex flex-col items-center w-full">

//       {/* <div className="absolute left-3 top-3">
//         <button onClick={toggleNotifucation} className="  bg-green-700 p-2 font-bold rounded-md"> 
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//             <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
//           </svg>
//         </button>
//       </div> 
    
//       {isToglle ? 
//           <div className="mt-4" > 
//           <input className="p-2 mr-2 rounded-md" type="text" ref={userName} placeholder="username" />
//           <button className="p-2 bg-green-700 rounded-md" onClick={AddUser} type="submit"> submit </button>
//         </div>
//         : 
//         ''
//       }

//     { isUserAdded  ?
//       <p>hello {newuser} </p>
//     :
//     <div className="absolute left-3 top-3">
//     <button onClick={toggleNotifucation} className="  bg-green-700 p-2 font-bold rounded-md"> 
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//         <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
//       </svg>
//     </button>
//     </div> 

//   } */}


  
//         <h1 className="text-white font-bold w-5/12 p-5 text-3xl text-center ">deily nots </h1>
//         <div className="w-10/12 bg-gray-300  p-5">
//           <div className="w-10/12 flex justify-evenly m-auto">
//             <input className="border p-2 w-9/12 " ref={text} type="text" />
//             <button className="bg-blue-300 text-white p-2 w-2/12 font-bold" onClick={handleADD}>
//               ADD
//             </button>
//           </div>

//           <div className=" mt-4 w-10/12 m-auto p-4 ">
//             <ul>{items.length > 0 ? displaylist() : <li className="text-gray-600 border-2 p-4">No items</li>}</ul>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }









// export default function TodoList() {
//  const [itemsRed, dispatch] = useReducer(itemsReducer, []);
//   //const [items , setItems] = useState([])
//   const text = useRef();

//   const displaylist = () => {
//     return items.map((item, k) => {
//       return (
//         <li className="mb-2 bg-gray-500 border-1 flex justify-between p-3 text-white font-bold" key={item.key}>
//           {item.text}
//           <div className=" ">
//               <button className="bg-red-300 p-2 " onClick={() => handleremove(k)}> remove </button>
//               <button className="bg-green-300 ml-4 p-2" > update </button>
//           </div>

//         </li>
//       );
//     });
//   };

//   //// parctice the reducer

//   const handleADD = () => {
//     const TextValue = text.current.value;

//     if (TextValue.trim() !== "") {
//       dispatch({ type: "ADD_ITEM", payload: TextValue });
 //     // setItems(prevState => [...prevState, TextValue])
//       text.current.value = "";
//     }
//   };

//   const handleremove = () => {
//     dispatch({ type: "REMOVE_ITEM", payload: key});
//     //setItems((prevState) => prevState.filter(( _ , i) => i !== index));
//     console.log("remove");
//   };

//   return (
//     <>
//     <h1 className="text-white font-bold w-2/12 p-5 text-center m-auto">deily nots </h1>
//       <div  className="w-10/12 bg-gray-300 m-auto p-5">
//         <div className="w-10/12 flex justify-evenly m-auto">
//           <input className="border p-2 w-9/12" ref={text} type="text" />
//           <button className="bg-blue-300 text-white p-2 w-2/12 font-bold" onClick={handleADD}>
//             ADD
//           </button>
//         </div>

//         <div className=" mt-4 w-10/12 m-auto p-4  ">
//           <ul>{displaylist()}</ul>
//         </div>
//       </div>
//     </>
//   );
// }
