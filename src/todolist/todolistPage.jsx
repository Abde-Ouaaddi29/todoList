import React, { useRef, useState } from "react";
import "./todo.module.css";

export default function TodoList() {
  const [items, setItems] = useState([]);
  const [newuser, setNewuser] = useState('') ;
  const [currentDate, setCurrentDate] = useState([])
  const [updateIndex, setUpdateIndex] = useState(null); // New state to track the item to be updated
  const [isToglle, setIsToglle] = useState(false)
  const text = useRef();
  const userName = useRef();
  // let isUserAdded = false

  const displaylist = () => {
    
    return items.map((item, k) => {
      return (

        <li className="mb-2 bg-gray-100 border-1 flex justify-between p-3 " key={k}>

          <div className=" lg:w-7/12 xl:w-7/12 md:w-7/12 w-8/12  text-black font-bold overflow-auto	"> {item} </div>

          <div className="flex justify-end lg:w-5/12 xl:w-5/12 md:w-5/12 w-3/12  ">
                <span className="text-gray-400 font-lighter p-2 mr-4 border-b lg:flex xl:flex md:flex hidden "> {currentDate[k]} </span>

                <button className="border-b p-2 text-white font-bold" onClick={() => handleremove(k)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-500 hover:text-red-400 hover:translate-y-0.5 transform transition-all duration-300">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>

                <button className="border-b lg:ml-4 xl:ml-4 md:ml-4 ml-0 p-2 text-white font-bold" onClick={() => handleUpdate(k)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-green-500 hover:text-green-400 hover:translate-y-0.5 transform transition-all duration-300" >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                </button>
          </div>
        </li>
      );
    });
  };


//// the add function 
  const handleADD = () => {
    const TextValue = text.current.value;
    const date = ((new Date()).toISOString().substring( 11,16))  + " / " + ((new Date()).toISOString().substring(0,10 ))
    
    if (TextValue.trim() !== "") {
      if (updateIndex !== null) {
        // If updateIndex is not null, update the existing item
        
        setItems((prevState) => {
          const updatedItems = [...prevState];
          updatedItems[updateIndex] = TextValue;
          return updatedItems;
        });
        setUpdateIndex(null); // Reset updateIndex after updating
      } else {
        // If updateIndex is null, add a new item
        setItems((prevState) => [...prevState, TextValue]);
        setCurrentDate((prevState)=> [...prevState, date]);
      }
      text.current.value = "";
    }
  };

  
 //// the removing function 
  const handleremove = (index) => {
    setItems((prevState) => prevState.filter((_, i) => i !== index));
    setCurrentDate((prevState)=> prevState.filter((_,i) => i !== index));
    console.log("remove");
  };


  //// the updating function 
  const handleUpdate = (index) => {
    setUpdateIndex(index); // Set updateIndex to the index of the item to be updated
    text.current.value = items[index]; // Set the input value to the text of the item to be updated
    console.log("update");
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

      <div className="absolute left-3 top-3">
        <button onClick={toggleNotifucation} className="  bg-yellow-400 p-2 font-bold rounded-md hover:bg-yellow-500 hover:translate-y-0.5 transform transition-all duration-300"> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
        </button>
      </div> 
    
      {isToglle ? 
          <div className="mt-4 text-center xl:w-full lg:w-full "> 
            <input className="p-2 mr-2 xl:w-4/12 lg:w-4/12 md:w-4/12 rounded-md w-5/12" type="text" ref={userName} placeholder="username" />
            <button className="p-2 bg-yellow-400 rounded-md hover:bg-yellow-500 hover:translate-y-0.5 transform transition-all duration-300" onClick={AddUser} type="submit"> submit </button>
          </div>
        : 
        ''
      }
      
      <section className="flex flex-col items-center w-full">

      <div className=" flex justify-center lg:w-5/12 md:w-10/12 w-10/12 p-5 text-3xl text-center lg:mt-2 lg:mb-5 xl:mt-2 xl:mb-5 md:mt-2 md:mb-5 mt-10 mb-5 ">
              <h1 className="text-white font-bold "> Daily notes </h1>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white mt-2 ml-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
            </svg>
        </div>
      <div className="lg:w-10/12 xl:w-10/12 md:w-10/12 w-10/12 bg-gray-300 p-5">
        <div className="w-9/12 flex justify-evenly m-auto">
          <input className="border p-2 lg:w-9/12 xl:9/12 md:9/12 w-8/12 " ref={text} type="text"/>
          <button className="bg-blue-300 text-white p-2 lg:w-2/12 xl:2/12 md:2/12 w-3/12 font-bold hover:bg-blue-400 hover:translate-y-0.5 transform transition-all duration-300" onClick={handleADD}>
            ADD
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
        <section className="flex flex-col items-center w-full">

          <div className="  flex  p-2 text-2xl text-yellow-200 absolute left-3 top-3  ">
              <h2 className="font-lighter" > Hello <span className="font-bold">{newuser}</span> </h2>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-yellow-200  lg:mt-1 ml-2 ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
          </div>

            <div className="  flex justify-center lg:w-5/12 md:w-10/12 sm:w-10/12 p-5 text-3xl text-center lg:mt-2 xl:mt-2 md:mt mt-16 mb-5 ">
              <h1 className="text-white font-bold "> Daily notes </h1>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white mt-2 ml-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
            </svg>
          </div>
          <div className="lg:w-10/12 xl:w-10/12 md:w-10/12 w-10/12 bg-gray-300 p-5">
        <div className="w-9/12 flex justify-evenly m-auto">
          <input className="border p-2 lg:w-9/12 xl:9/12 md:9/12 w-8/12 " ref={text} type="text"/>
          <button className="bg-blue-300 text-white p-2 lg:w-2/12 xl:2/12 md:2/12 w-3/12 font-bold hover:bg-blue-400 hover:translate-y-0.5 transform transition-all duration-300" onClick={handleADD}>
            ADD
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
