import { useState, ChangeEvent, FormEvent } from "react"
import { categories, colors, formInputsList, productList } from "./assets/data"
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal"
import Button from "./components/ui/Button"
import Input from "./components/ui/Input"
import {  IProduct } from "./interfaces"
import { productValidation } from "./validation"
import ErrorMessage from "./components/ErrorMessage"
import CircleColor from "./components/CircleColor"
import { v4 as uuid } from "uuid"
import SelectCategory from "./components/ui/SelectCategory"
import { TProductName } from "./types"
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const deletePrd = () => toast("Product Delete succefully!",{ type: "error" });
  const updatePrd = () => toast("Product Updated succefully!",{ type: "success" });

  const addPrd = () => toast("Product Added succefully!", { type: "success" });

  const defaultObj = {

      title: "",
      price: "",
      description: "",
      category: {
        name: "",
        imageURL: "",
      },
      colors: [],
      imageURL: "",
  }
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [productEdit, setProductEdit] = useState<IProduct>(defaultObj);
  const [productEditIndex, setProductEditIndex] = useState<number>(0);

  const [product, setProduct] = useState <IProduct>(defaultObj)
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const [isOpen, setIsOpen] = useState(false)
  const [productData, setProductData] = useState(productList)
  const [tempColor, setTempColor] = useState<string[]>([]);
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)
  const closeModalDelete = () => setIsOpenDelete(false)
  const openModalDelete = () => setIsOpenDelete(true)

  const closeModalEdit = () =>setIsOpenEdit(false)
  const openModalEdit = () =>setIsOpenEdit(true)

  console.log("edit  prod data", productEdit);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setProduct((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }
  const removeProductHandler = () => {
    setProductData((prev) => prev.filter((product) => product.id !== productEdit.id));
    closeModalDelete();
    setProductEdit(defaultObj);
    deletePrd();
  }
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setProductEdit((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }
  const [errors, setErrors] = useState({title: "", price: "", description: "", imageURL: ""})

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
     const err = productValidation({description: product.description, price: product.price, title: product.title, imageURL: product.imageURL});
     console.log(err);
     const hasErrorsMsg = Object.values(err).some(value => value==="") &&
     Object.values(err).every((value) => value==="");
     console.log(hasErrorsMsg);
     if (!hasErrorsMsg) {
           setErrors(err);
           return;
    }
      console.log("sending data"); 
      setErrors({title: "", price: "", description: "", imageURL: ""});
      setProductData((prev) => [ {...product, colors: tempColor,category: selectedCategory, id: uuid()} , ...prev]);
      setProduct(defaultObj);
      closeModal();
      addPrd();
     }
     console.log(tempColor)
     const submitEditHandler = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
       const err = productValidation({description: productEdit.description, price: productEdit.price, title: productEdit.title, imageURL: productEdit.imageURL});
       console.log(err);
       const hasErrorsMsg = Object.values(err).some(value => value==="") &&
       Object.values(err).every((value) => value==="");
       console.log(hasErrorsMsg);
       if (!hasErrorsMsg) {
             setErrors(err);
             return;
      }
      console.log('editProduct', productEdit);
        console.log("sending data"); 
         const updatedProduct = [...productData];
         updatedProduct[productEditIndex] = {...productEdit, colors: tempColor.concat(productEdit.colors)};
        setProductData(updatedProduct);
        setTempColor([]);
        setErrors({title: "", price: "", description: "", imageURL: ""});
        setProductEdit(defaultObj);
        updatePrd();
        closeModalEdit();

       }
  const onCancel = () => {
    setProduct(defaultObj);
    closeModal();
  }

  const renderProductsList = productData.map((product, idx) =>
    {
      return(
        <ProductCard 
          setProductEditIndex={setProductEditIndex} 
          idx={idx} openEditModal={openModalEdit} 
          setProductToEdit={setProductEdit} key={product.id} 
          product={product} 
          openModalDelete={openModalDelete}
        />) 
     });

     const renderProductColors = colors.map((color,index) => (
       <CircleColor 
         onClick={()=> {
          if(tempColor.includes(color)) {
            setTempColor(prev => prev.filter(item => item !== color))
            return;          
          }
          if(productEdit.colors.includes(color)) {
            setTempColor(prev => prev.filter(item => item !== color))
            return;          
          }
               setTempColor(prev => [...prev, color]);
          }
        }
          key={index} 
          color={color} />
        ));
  const renderformInputList = formInputsList.map((input) => 
     {
      return(
        <div className="my-4 flex flex-col" key={input.id}>
        <label className="block mb-2 text-md font-normal  text-gray-900" 
        htmlFor={input.name}>{input.label}</label> 
        <Input onChange={handleChange} 
         key={input.id}  
         id={input.id} 
         name={input.name} 
         type="text"
         value={product[input.name]}
         />
         <ErrorMessage msg={errors[input.name]} />
       </div>
      )
     })
     const renderProoductEditWithErrMsg = (id: string, label: string, name: TProductName) => 
      {
       return(
         <div className="my-4 flex flex-col">
         <label className="block mb-2 text-md font-normal  text-gray-900" 
         htmlFor={id}>{label}</label> 
         <Input onChange={onChangeEditHandler} 
          id={id} 
          name={name} 
          type="text"
          value={productEdit[name]}
          />
          <ErrorMessage msg={errors[name]} />
        </div>
       )
      }
  return (
    <main className="container">
      <Button styles=" bg-indigo-600  px-3 py-2 text-right mx-auto mt-4" width="w-fit" onClick={openModal}>ADD</Button>
      <div className="grid grid-cols-1   p-2 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4  rounded-md m-5">
        {renderProductsList}
      </div>
      {/* Add Product Modal */}
        <Modal closeModal={closeModal} isOpen={isOpen} title="ADD NEW PRODUCT" >
          <form onSubmit={submitHandler}>
          {renderformInputList}
            <SelectCategory selected={selectedCategory} setSelected={setSelectedCategory} />
          <div className="flex space-x-1 items-center flex-wrap my-2">
            {tempColor.map((color,index) => (
              <span key={index} 
              className="p-1 mr-1 text-xs 
              rounded-md text-white"
              style={{backgroundColor: color}} >
                  {color}
              </span>))}
          </div>
          <div className="flex space-x-1 items-center flex-wrap my-2">
           {renderProductColors}
          </div>
          <div className="flex justify-between space-x-2 items-center mt-3">
            <Button 
              styles=" bg-indigo-400 hover:bg-indigo-700 
              px-3 py-2 ">Submit
            </Button> 
            <Button 
              styles="bg-red-400  px-3 py-2 hover:bg-red-700"
               onClick={onCancel}
            >Cancel</Button> 
          </div>  
          </form>
        </Modal>

       {/* Edit Product Modal */} 
       <Modal closeModal={closeModalEdit} isOpen={isOpenEdit} title="EDIT THIS PRODUCT" >
          <form onSubmit={submitEditHandler}>
            {renderProoductEditWithErrMsg('title', 'Product Title', 'title')}
            {renderProoductEditWithErrMsg('description', 'Product Description', 'description')}
            {renderProoductEditWithErrMsg('imageURL', 'Product Image URL', 'imageURL')}
            {renderProoductEditWithErrMsg('price', 'Product Price', 'price')}
            <SelectCategory selected={productEdit.category} setSelected={(value) =>setProductEdit({...productEdit, category: value})} />
                <div className="flex space-x-1 items-center flex-wrap my-2">
                 {renderProductColors}
                </div>
            <div className="flex space-x-1 items-center flex-wrap my-2">
              {tempColor.concat(productEdit.colors).map((color,index) => (
                <span key={index} 
                className="p-1 mr-1 text-xs 
                rounded-md text-white"
                style={{backgroundColor: color}} >
                    {color}
                </span>))}
            </div>
            
            {/*}
            <SelectCategory selected={selectedCategory} setSelected={setSelectedCategory} />
            */}
          <div className="flex justify-between space-x-2 items-center mt-3">
            <Button 
              styles=" bg-indigo-400 hover:bg-indigo-700 
              px-3 py-2 ">Submit
            </Button> 
            <Button 
              styles="bg-red-400  px-3 py-2 hover:bg-red-700"
               onClick={closeModalEdit}
            >Cancel</Button> 
          </div>  
          </form>
        </Modal>
        <Modal closeModal={closeModalDelete} isOpen={isOpenDelete} title="DELETE THIS PRODUCT" >
          <div className="my-4 flex flex-col">
            <h3 className="block mb-2 text-xl font-semibold  text-gray-900">Are you sure you want to delete this product?</h3>
            <span className="text-gray-500 text-md font-medium">if you delete this product, it will be lost forever, you can't undo it.</span>
            </div>
            <div className="flex justify-between space-x-2 items-center mt-3">
            <Button onClick={removeProductHandler} 
              styles=" bg-red-400 hover:bg-red-700 
              px-3 py-2 ">Yes Remove
            </Button> 
            <Button 
              styles="bg-slate-400  px-3 py-2 hover:bg-slate-700"
               onClick={closeModalDelete}
            >Cancel</Button> 
          </div>  
        </Modal>
        <ToastContainer position="bottom-center"   autoClose={2000}/>
    </main>

  )
}

export default App
