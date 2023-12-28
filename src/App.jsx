import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPenToSquare , faTrash} from '@fortawesome/free-solid-svg-icons'
import './App.css'

function getData(){
  let lit = localStorage.getItem('list');
 //  to get data from local storage
  if(lit){
      return JSON.parse(localStorage.getItem('list'));
  }else{
    return [];
  }
}

function App() {
  const [inputData, setInputData] = useState('');
  const [item, setItem] = useState(getData());
  const [condition, setCondition] = useState(true);
  const [editId, setEditId] = useState(null);
  // =====addData ============================
  const addData = ()=>{
        //  if input value is not insert the the alert box will arige== 
        if(!inputData){
         alert('Please fell the item');
        }else if(inputData && !condition){
          // this condition will run when we edite the text===
          console.log("EDIET ITEM ID",editId);
           setItem(
               item.map((curElm, ind)=>{
                 if(ind === editId){
                  return [inputData];
                 }
                 return curElm;
               })
           )
          //  the edite is finess the input back to its real condition===
           setInputData('');
           setCondition(true);
        }else{
          // this will add new data to a list of=====
        setItem([...item, inputData]);
        setInputData('');
        }
  }
//========Edit-item =====
  const editItem= (id)=>{
        // it will filter the data on the basic of id===
      let newItem = item.filter((curElm, ind)=>{
        return ind == id;
      });
      console.log("This item is not Delete=>", newItem);
      setCondition(false);
      // set the edite item to input tag===
      setInputData(newItem);
      //  set the id edite id to setEditeId state====
      setEditId(id);
      }
//  =======Delete Item =====
const   delateItem = (id)=>{
        console.log(id);
        // it will fulter the data which id is not matched=====
        const updateItem = item.filter((curElm, ind)=>{
        return ind != id;
   });
    //  set the data which will return===
   setItem(updateItem);
}
//=========clearAll================================
  const clearAll = ()=>{
      setItem([]);
  }

  // useEffect to store the data to storahe
  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(item));
},[item]) 

  return (
    <div className="App">
      <div className='title'>
          <h2>TODO List..</h2>
      </div>
      {/* ====this is input box =========== */}
      <div className='input_box'>
          <div className='input_in'>
              <input type="text" placeholder="Enter text" value={inputData} 
               onChange={(e)=> setInputData(e.target.value)}/>
             {condition?<FontAwesomeIcon icon={faPlus} onClick={addData} className='icon' />:<FontAwesomeIcon icon={faPenToSquare} onClick={addData} className='icon' />}
          </div>
      </div>
      {/* ===This is box where we show the item list====== */}
      <div className='item_box'>
        {
          item.map((curElm, ind)=>{
              return(
                <div key={ind} className='todo_list'>
                <div> <span>{curElm}</span></div>
                <div>
                <FontAwesomeIcon icon={faTrash}  onClick={()=> delateItem(ind)}  className='icon' />
             
                <FontAwesomeIcon icon={faPenToSquare} onClick={()=> editItem(ind)} className='icon'/>
                </div>
               </div>
              )
          })
        }
         
      </div>
      <div className='clear_box'>
           <button onClick={clearAll}>CLEAR ALL</button>
      </div>
    </div>
  )
}

export default App
