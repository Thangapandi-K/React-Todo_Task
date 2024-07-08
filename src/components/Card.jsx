

export const Card = ({card, editCard, todoStatus, delTodo}) => {
    return(
        <>
            <div className="col col-12 col-md-6 col-lg-4 mb-2">
                <div className='card h-100 rounded m-2' key={card.id}>
                    <div className='card-title p-1'>
                        <h6 className="p-1">Name : {card.name}</h6>
                    </div>
                    <div className='card-body p-1'>
                        <div className="p-1">
                            <p>Description : {card.message}</p>
                        </div>
                        <div className="dropdown p-1"> Status : &nbsp;
                            <button className={`btn btn-secondary btn-sm dropdown-toggle ${card.status === 'Completed' ? 'btn btn-success' : 'btn btn-danger'}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {card.status}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropDown">
                                <li>
                                    <button className='dropdown-item' type="button" onClick={() => todoStatus('Completed', card.id)}> 
                                        Completed
                                    </button>
                                </li>
                                <li>
                                    <button className='dropdown-item' type="button" onClick={() => todoStatus('Not Completed', card.id)}>
                                        Not Completed
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className='text-end'>
                            <button className='btn btn-warning m-3 px-3' onClick={() => editCard(card.name, card.message, card.id)}>Edit</button>
                            <button className='btn btn-danger m-3 px-3' onClick={() => delTodo(card.id)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}