import logo from './assets/logo.svg';
import { nanoid } from 'nanoid';
import { useRef, useState } from 'react';
import Item from './components/Item';


export interface Item {
  id: string;
  name: string;
  quantity: string;
  completed: boolean;
}

function App() {

  const [items, setItems] = useState<Item[]>([
    {
      id: nanoid(),
      name: 'Leite em Pó',
      quantity: '3 Caixas',
      completed: false
    },
    {
      id: nanoid(),
      name: 'Arroz',
      quantity: '2 Kg',
      completed: false
    },
    {
      id: nanoid(),
      name: 'Maça',
      quantity: '5 Unidades',
      completed: true
    },
    {
      id: nanoid(),
      name: 'Banana',
      quantity: '1 Dúzia',
      completed: true
    }
  ])

  const inputRef = useRef<HTMLInputElement>(null)
  // filtra o objeto que tem a propriedade completed como true
  const completedList = items.filter(item => item.completed);
  // filtra o objeto que tem a propriedade completed como false  
  const notCompletedList = items.filter(item => !item.completed);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formEl = event.currentTarget
    const formData = new FormData(formEl)

    // uma maneira de pegar dados de um formulário é atravéz de umj formData
    // esse comando formData.get() pega o valor de um input pelo name mas ele pode retorna o arquivo por isso é necessário o as string
    const name = formData.get('name') as string
    const quantity = formData.get('quantity') as string
    const item: Item = {
      id: nanoid(),
      name,
      quantity,
      completed: false
    }

    const newItems = [item, ...items]

    setItems(newItems)

    formEl.reset()
    
    // focar no primeiro campo do formulário
    inputRef.current && inputRef.current.focus()
  }
  // função que muda o estado do item.completed para o contrário do que ele é
  function handleClickComplete(id:string){

   const newItems = items.map((item) => {
        if(id === item.id){
          item.completed = !item.completed
        }
        return item;
      });
    setItems(newItems)
  }
  // funçao que filtra os itens que tem o id diferente do id passado e seta o estado com os itens filtrados
  function handleClickDelete(id:string){
    
    const newItems = items.filter( (item) => id !== item.id)

    setItems(newItems)
  }

  return (
    <main className="max-w-2xl px-6 py-12 pb-20 mx-auto my-10 bg-white md:my-20 md:px-32 md:rounded-3xl">
      <header className="text-center">
        <img src={logo} alt="logotipo" className="mx-auto" />
        <h1 className="mt-4 text-3xl font-medium font-display">
          Lista de Compras
        </h1>
        <p className="text-sm text-slate-500">
          Facilite sua ida ao supermercado!
        </p>
        <hr className="w-1/3 mx-auto mt-6 mb-8" />
      </header>
      <form className="flex gap-2 " onSubmit={handleSubmit} >
        <div className="flex-shrink">
          <label htmlFor="name" className="block text-xs text-slate-400">
            Item
          </label>
        <input
            type="text"
            id="name"
            name="name"
            ref={inputRef}
            className="block w-full px-3 py-2 border rounded-lg border-slate-300 text-slate-700"
          />
        </div>
        <div className="flex-shrink">
          <label htmlFor="quantity" className="block text-xs text-slate-400">
            Quantidade
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            className="block w-full px-3 py-2 border rounded-lg border-slate-300 text-slate-700"
          />
        </div>
        <button className="self-end flex-shrink h-10 px-4 font-extrabold text-white rounded-lg bg-fuchsia-300">
          +
        </button>
      </form>
      <section className="mt-10 space-y-3 ">
        {notCompletedList.map(item => (
          <Item 
          handleClick={handleClickComplete}
          handleClickDel={handleClickDelete}
          key={item.id}
            item={item}
          />
        ))}

      </section>
      <section className="mt-16 space-y-3 ">
        <h2 className="mb-10 text-3xl text-center font-display">
          Itens já comprados
        </h2>
        {completedList.map(item => (
          <Item 
          handleClick={handleClickComplete} 
          handleClickDel={handleClickDelete}
          key={item.id}
            item={item}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
