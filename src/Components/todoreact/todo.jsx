import React , {useState , useEffect} from 'react'
import "./style.css"

const getLocalData = () => {
  const list = localStorage.getItem("myTodolist") ;

  if (list){
    return JSON.parse(list) ;
  }
  else{
    return [] ;
  }
}

const Todo = () => {
  const [inputData,setInputData] = useState("") ;
  const [items,setItems] = useState(getLocalData) ;
  const [isEditItem,setIsEditItem] = useState("") ;
  const [toggleButton , setToggleButton] = useState(false) ;

  const addItem = ()=> {
    if (!inputData){
      alert("Please fill data") ;
    }
    else{
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData
      }
      setItems([...items,myNewInputData]) ; // keep previous data and insert this new data
      setInputData("") ;
    }
  }

  // adding LocalStorage
  useEffect(() => {
    localStorage.setItem("myTodolist",JSON.stringify(items)) ;
  }, [items])
  

  // How to delete items
  const deleteItem = (index) => {
    const updatedItem = items.filter((currElem)=>{
      return currElem.id !== index;
    })
    setItems(updatedItem) ;
  }

  const editItem = (id) => {
    const editedItem = items.find((elem)=>{
      return elem.id === id;
    })
    setInputData(editedItem.name) ;
    deleteItem(editedItem.id) ;
    setIsEditItem(id) ;
    setToggleButton(true) ;
  }

  return (
    <>
        <div className="main-div">
          <div className="child-div">
    
            <figure>
                <img src="./images/todo.svg" alt="todologo" />
                <figCaption>Add Your List Here</figCaption>
            </figure>

            <div className="addItems">
                <input type="text" 
                placeholder='✍🏻 Here' 
                className='form-control'
                value={inputData} onChange={(event)=>{ setInputData(event.target.value) }}
                 />
                {toggleButton? <i className="far fa-edit add-btn" onClick={addItem}></i>
                : <i className="fa fa-plus add-btn" onClick={addItem}></i>
                }
            </div>
            {/* Show items */}
            <div className="showItems">
              {
                items.map((currElem)=>{
                  return (
                    <div className="eachItem" key={currElem.id}>
                      <h3>{currElem.name}</h3>
                      <div className="todo-btn">
                        <i className="far fa-edit add-btn" onClick={() => {editItem(currElem.id)} }></i>
                        <i className="far fa-trash-alt add-btn" 
                        onClick={()=> deleteItem(currElem.id)}>
                        </i>
                      </div>
                    </div>
                  );
                })
              }
              
            </div>

            {/* Remove all items */}
            <div className="showItems">
              <button className="btn effect04" data-sm-link-text="Remove All" onClick={() => setItems([])} >
                <span>
                  CHECK LIST
                </span>
                </button>
            </div>

          </div>
        </div>
    </>
  )
}

export default Todo