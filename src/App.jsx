import React from 'react'
import { useState } from 'react'
import { Card } from './components/Card';
import './App.css';

const App = () => {

  const [todoName, setTodoName] = useState('');
  const [todoDescription, setTododescription] = useState('');
  const [todoButton, setTodoButton] = useState('Add Todo');
  const [todoCard, setTodoCard] = useState([]);
  const [filter, setFilter] = useState('All');
  const [editcardId, setEditCardId] = useState(null);

  
  const addTodo = (todoTitle, todoMessage) => {
    if(todoButton === 'Add Todo') { // add new todo card
      let newTodo = {
        name: todoTitle,
        message: todoMessage,
        id: Date.now(),
        status: 'Not Completed'
      }
      setTodoCard([...todoCard, newTodo]);
    } else if (todoButton === 'Update Todo') { //update todo card
      const updateCard = todoCard.map((card) => card.id === editcardId ? {...card, name: todoTitle, message: todoMessage} : card);

      setTodoCard(updateCard);
      setTodoButton('Add Todo');
      setEditCardId(null);
    }

    setTodoName('');
    setTododescription('');

  }


  // changing card status
  const todoStatus = (cardStatus, id) => {
    const statusUpdate = todoCard.map((card) =>
      card.id === id ? {...card, status: cardStatus} : card
    );
    setTodoCard(statusUpdate);
  }

  //edit card details
  const editCard = (name, message, id) => {
    setTodoButton('Update Todo');
    setTodoName(name);
    setTododescription(message);
    setEditCardId(id);
  }

  // delete card
  const delTodo = (id) => {
    const delCard = todoCard.filter((ele) => ele.id !== id)
    setTodoCard([...delCard]);
  }

  // filter cards
  const cardsFilter = todoCard.filter((card) => {
    if(filter === 'All') {
      return card;
    } else {
      return card.status === filter;
    }
  })
  



  return (
    <>
    <div className='text-center p-4 h1 shadow mb-5'>
      My Todo
    </div>
    <div className='container my-5 p-3'>
    <form className='form text-center row d-flex justify-content-center g-4'>
        <div className='col d-flex justify-content-center col-12 col-md-6 md-lg-4'>
          <label htmlFor='title' className='visually-hidden form-label'></label>
          <input type='text' name='title' id='title' className='form-control w-100' placeholder='Todo Title' value={todoName} onChange={(e) => setTodoName(e.target.value)} required />
        </div>
        <div className='col d-flex justify-content-center col-12 col-md-6 md-lg-4'>
          <label htmlFor='title' className='visually-hidden form-label'></label>
          <input type="text" name='description' id='description' className='form-control w-100' placeholder='Todo Description' value={todoDescription} onChange={(e) => setTododescription(e.target.value)} required/>
        </div>
        <div className='col d-flex justify-content-center col-12 col-md-6 md-lg-4'>
          <button type='button' disabled={todoName === '' || todoDescription === ''} className={`p-2 w-75 ${todoButton === 'Add Todo' ? 'btn btn-success' : 'btn btn-primary'}`} onClick={() => addTodo(todoName, todoDescription)}>{todoButton}</button>
        </div>
    </form>
    <div className='p-1 d-flex row mt-4 rounded'>
      <div className='col d-flex justify-content-start h5'>
        My Todos
      </div>
      <div className="dropdown col text-end h6"> Status Filter : &nbsp;
        <button className={`btn btn-secondary dropdown-toggle ${filter === 'All' ? 'btn-primary' : filter === 'Completed' ? 'btn btn-success' : 'btn btn-danger'}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {filter}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropDown">
          <li>
            <button className='dropdown-item btn-primary' onClick={() => setFilter('All')}>
              All
            </button>
          </li>
          <li>
            <button className='dropdown-item' onClick={() => setFilter('Completed')}> 
              Completed
            </button>
          </li>
          <li>
            <button className='dropdown-item' onClick={() => setFilter('Not Completed')}>
              Not Completed
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div className='row mt-4'> 
      {/* to show filtered cards */}
      {
        cardsFilter.length === 0 ? <h3 className='text-center'>No Todos Added</h3> :
        cardsFilter.map((card) => {
          return <Card key={card.id} card={card} todoStatus={todoStatus} editCard={editCard} delTodo={delTodo} />
        })
      }
    </div>
    </div>
    </>
  )
}

export default App