import React, { useState } from 'react';
import './Todo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare
,faTrash} from '@fortawesome/free-solid-svg-icons';
let id=0;
let EditIndex = 0;
function Todo() {
    let [arrayMain, setArray] = useState([]);
    let [text, setText] = useState("");
    let [text2, setText2] = useState("");
    let [check, setCheck] = useState(true);
    let [edit, setEdit] = useState(false);
    
    function handlerChange(even){
        let {value} = even.target;
        setText(value);
    }
    function handlerAdd(){
        if(text.length != 0){
            id++;
            let arrrayAdd = [...arrayMain,{text,id}];
            setArray(arrrayAdd);
            setText("");
        }
    }
    function handlerCheck(indexC,text,id){
        let style = {textDecoration:"line-through"};
        let arrayCheck = [...arrayMain];
        setCheck(!check);
        check ? (arrayCheck.splice(indexC,1,{text,id,style})) : 
        (arrayCheck.splice(indexC,1,{text,id})); 
        setArray(arrayCheck);
    }
    function handlerDelete(index){
        let arrayDelete = [...arrayMain];
        arrayDelete.splice(index,1);
        setArray(arrayDelete);
    }    
    function handlerChange2(even){
        let {value} = even.target;
        setText2(value);
    }
    function handlerEdit1(indexE,textE){
        EditIndex = indexE;
        setText2(textE);
        setEdit(true);
    }
    function handlerEdit2(){
        let id = EditIndex+1;
        let arrayEdit = [...arrayMain];
        setText(text2);
        arrayEdit.splice(EditIndex,1,{text:text2,id});
        setArray(arrayEdit);
        setText('');
        setEdit(false);
    }
  return (
    <div className='Todo'>
        <div className='Todo-con'>
            <h1 className='h1-1'>Todo List</h1>
            <input className='inputAdd' type="text" value={text} onChange={handlerChange}/>
            <button className='btnAdd' onClick={handlerAdd}>add</button>
            <div className='Todo-con2'>
                {
                    arrayMain.map((elem,index)=>{
                        return (
                            <div className='list' key={elem.id}>
                                <h1>{elem.id}</h1>
                                <h1 style={elem.style} >{elem.text}</h1>
                                <div className='actions'>
                                    <input className='btnCheckBox backRed' type="checkBox" onClick={()=>handlerCheck(index,elem.text,elem.id)}/>
<                                button className='btnEdit' onClick={()=>handlerEdit1(index,elem.text)}>
                                <FontAwesomeIcon icon={faPenToSquare}/>
                                </button>
                                <button className='btnDelete' onClick={()=>handlerDelete(index)}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
        {
            edit ? (
                <div id="displayGrid" className='modelBody'>
                    <div className='modelCon'>
                        <h1 className='h1Edit'>Edit this text</h1>
                        <input className='inputEdit' type="text" onChange={handlerChange2} value={text2}/>
                        <button className='btnEditModel'onClick={()=>handlerEdit2()}>
                            <FontAwesomeIcon icon={faPenToSquare}/>
                        </button>
                    </div>
                </div>
            ) : null
        }
    </div>
  )
}
export default Todo