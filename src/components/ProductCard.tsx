import { memo } from "react";
import { IProduct } from "../interfaces";
import { formatNumber, txtSlice } from "../utils/functions";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
   product: IProduct;
   setProductToEdit: (product: IProduct) => void,
   openEditModal: (value: boolean) => void,
   setProductEditIndex: (value: number) => void,
   openModalDelete: (value: boolean) => void,
   idx: number
}

const ProductCard = ({product, setProductToEdit, openModalDelete, idx, setProductEditIndex , openEditModal }: IProps) => {
  const { title, price, description, colors, category, imageURL } = product
   const renderProductColors =  colors.map((color) => {
      return <CircleColor  key={color} color={color} />
    })
    const editProductHandler = () => {
      setProductToEdit(product)
      openEditModal(true);
      setProductEditIndex(idx)
    }
    const deleteProductHandler = () => {
      setProductToEdit(product)
      openModalDelete(true);
    }
  return (
    <div className=" max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
        <Image imageUrl={imageURL} alt="product name" className="w-full h-52 lg:object-cover rounded-md mb-2" />
        <h3>{title}</h3>  
        <p>
          {txtSlice(description)}
        </p>
        <div className="flex space-x-1 items-center my-3 ">
            {renderProductColors.length > 0 ? renderProductColors: (<div className="text-gray-500 font-medium">No available colors</div>)} 
        </div>
        <div className="flex justify-between items-center">
             <span className="font-bold text-indigo-600">${formatNumber(price)}</span>
             <div className="flex items-center justify-end space-x-3">
             <span className="font-semibold">{category.name}</span>

             <Image imageUrl={category.imageURL} alt={category.name} className="w-10 h-10 rounded-full object-center" />
             </div>
        </div>
        <div className="flex justify-between space-x-2 items-center mt-3">
            <Button onClick={editProductHandler} styles=" bg-indigo-600 font-medium px-3 py-2 ">EDIT</Button>
            <Button  styles=" bg-red-600  px-3 font-medium  py-2 " onClick={deleteProductHandler}>DELETE</Button>
         </div>   
    </div>
  );
};

export default memo(ProductCard);