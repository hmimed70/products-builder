import { useState, ChangeEvent } from "react"
import { formInputsList, productList } from "./assets/data"
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal"
import Button from "./components/ui/Button"
import Input from "./components/ui/Input"
import { IProduct } from "./interfaces"

function App() {
  const [product, setProduct] = useState <IProduct>({
    title: "",
    price: "",
    description: "",
    category: {
      name: "",
      imageURL: "",
    },
    colors: [],
    imageURL: "",
  })
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setProduct((prev) => ({ ...prev, [name]: value }));
    setProduct({ ...product, [name]: value });
  }

  const renderProductsList = productList.map((product) =>
    {
      return(
        <ProductCard key={product.id} product={product} />) 
     });
  const renderformInputList = formInputsList.map((input) => 
     {
      return(
        <div className="my-4 flex flex-col">
        <label className="block mb-2 text-md font-normal  text-gray-900" 
        htmlFor={input.name}>{input.label}</label> 
        <Input onChange={handleChange} 
         key={input.id}  
         id={input.id} 
         name={input.name} 
         type="text"
         value={product[input.name]}
         />
        </div>
      )
     })
  return (
    <main className="container">
      <Button styles=" bg-indigo-600  px-3 py-2 text-right mx-auto mt-4" width="w-fit" onClick={openModal}>ADD</Button>
      <div className="grid grid-cols-1   p-2 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4  rounded-md m-5">
        {renderProductsList}
      </div>
        <Modal closeModal={closeModal} isOpen={isOpen} title="ADD NEW PRODUCT" >
          <form>
          {renderformInputList}
          <div className="flex justify-between space-x-2 items-center mt-3">
            <Button styles=" bg-indigo-400 hover:bg-indigo-700  px-3 py-2 ">Submit</Button> 
            <Button onClick={closeModal} styles="bg-red-400  px-3 py-2 hover:bg-red-700">Cancel</Button> 
          </div>  
          </form>
        </Modal>
    </main>

  )
}

export default App
