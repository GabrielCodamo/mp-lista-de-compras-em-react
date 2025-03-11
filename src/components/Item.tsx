
import todo from '../assets/todo.svg';
import done from '../assets/done.svg';
import trash from '../assets/trash.svg';
import type { Item } from '../App';

interface ItemProp {
    item: Item;
    handleClick: (id: string) => void;
    handleClickDel: (id: string) => void
}

const quantityVerifiqued = 'test-sm text-slate-400'
const nameVerifiqued = 'line-through text-slate-400'

export default function Item({ item, handleClick, handleClickDel }: ItemProp) {
    return (
        <>
            <article className='flex w-full gap-4'>
                {/* // evento que permite trocar de true para false o item que estiver completado */}
                <button onClick={() => handleClick(item.id)}>
                    <img src={!item.completed ? todo : done} alt="#" />
                </button>
                <div className='flex-1'>
                    <p className={`${item.completed ? nameVerifiqued : ''}`}>{item.name}</p>
                    <p className={!item.completed ? quantityVerifiqued : ' test-sm text-slate-400/80 line-through'} >{item.quantity}</p>
                </div>
                <button onClick={() => handleClickDel(item.id)}>
                    <img
                        src={trash}
                        alt="icone lixeira"
                        className='justify-self-end' />
                </button>
            </article>
            <hr />
        </>
    )
}