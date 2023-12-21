// import React from "react"; //Referente a parte VISUAL
import React, { useState, useEffect } from 'react' //Referente à parte LÓGICA
import './TodoList.css'
import Icone from './assets/icon.png' //Referente à parte LÓGICA 

function TodoList() {

    const listaStorage = localStorage.getItem('Lista');

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []); //Referente à parte LÓGICA 
    const [novoItem, setNovoItem] = useState("") //Referente à parte LÓGICA 

    useEffect(()=>{
        localStorage.setItem('Lista', JSON.stringify(lista));

    },[lista])

    //Referente à parte LÓGICA  (11 ao 20)
    function adicionaItem(form) {
        form.preventDefault();
        if (!novoItem) {
            return;
        }
        setLista([...lista, { text: novoItem, isCompleted: false }])
        setNovoItem("")
        document.getElementById('input-entrada').focus();
    }

    function clicou(index) {
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index) {
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletaTudo() {
        setLista([]);
    }


    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input
                    id="input-entrada" //Referente à parte LÓGICA
                    type="text"
                    value={novoItem} //Referente à parte LÓGICA 
                    onChange={(e) => { setNovoItem(e.target.value) }} //Referente à parte LÓGICA 
                    placeholder="Adicione uma tarefa"
                />
                <button className="add" type="submit">Add</button>
            </form>

            <div className="listaTarefas">
                <div style={{ textAlign: 'center' }}>
                    {
                        lista.length < 1
                            ?
                            <img className='icone-central' src={Icone} />
                            :
                            lista.map((item, index) => (
                                <div
                                    key={index}
                                    className={item.isCompleted ? "item-completo" : "item"}
                                >
                                    <span onClick={() => {clicou(index)}}>{item.text}</span>
                                    <button onClick={() => {deleta(index)}} className="del">Deletar</button>
                                </div>
                            ))
                    }
                    {
                        lista.length > 0 && 
                        <button onClick={() => {deletaTudo()}} className="deletAll">Deletar Todos</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default TodoList