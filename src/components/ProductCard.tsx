import { IProduct } from "../interfaces";
import { txtSlice } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
   product: IProduct;
}

const ProductCard = ({product }: IProps) => {

  return (
    <div className=" max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
        <Image imageUrl={product.imageURL} alt="product name" className="w-full h-52 lg:object-cover rounded-md mb-2" />
        <h3>{product.title}</h3>  
        <p>
          {txtSlice(product.description)}
        </p>
        <div className="flex space-x-2 items-center my-3 ">
          {
            product.colors.map((color) => (
              <span className={`w-5 h-5 rounded-full bg-${color} cursor-pointer`} />
            ))
          }
        </div>
        <div className="flex justify-between items-center">
             <span className="font-bold">${product.price}</span>
             <Image imageUrl={product.category.imageURL} alt={product.category.name} className="w-10 h-10 rounded-full object-center" />
        </div>
        <div className="flex justify-between space-x-2 items-center mt-3">
            <Button onClick={() => alert("clicked")} styles=" bg-indigo-600  px-3 py-2 ">Edit</Button>
            <Button  styles=" bg-red-600  px-3 py-2 ">DELETE</Button>
         </div>   
    </div>
  );
};

export default ProductCard;