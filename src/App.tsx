import { useState } from "react"
import { productList } from "./assets/data"
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal"
import Button from "./components/ui/Button"

function App() {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
 
  const renderProducts = () => {
    return productList.map((product) => <ProductCard key={product.id} product={product} />)
  }

  return (
    <main className="container">
      <Button styles=" bg-indigo-600  px-3 py-2 text-right mx-auto mt-4" width="w-fit" onClick={openModal}>ADD</Button>
      <div className="grid grid-cols-1   p-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4  rounded-md m-5">
        {renderProducts()}
      </div>
        <Modal closeModal={closeModal} isOpen={isOpen} title="ADD NEW PRODUCT" >
          <div className="flex justify-between space-x-2 items-center mt-3">
            <Button styles=" bg-indigo-400 hover:bg-indigo-700  px-3 py-2 ">Submit</Button> 
            <Button onClick={closeModal} styles="bg-red-400  px-3 py-2 hover:bg-red-700">Cancel</Button> 
          </div>  
        </Modal>
    </main>

  )
}

export default App
