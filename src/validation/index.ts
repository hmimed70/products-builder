
export const productValidation = (product: { title: string, price: string, description: string, imageURL: string }) =>  {
    const error: {title: string, price: string, description: string, imageURL: string } = {
        title: "",
        price: "",
        description: "",
        imageURL:"",
    };

    if (!product.title.trim() || product.title.length < 5 || product.title.length > 50) {
        error.title = "Product title must be between 5 and 50 characters";
    }
    if (!product.description.trim() || product.description.length < 10 || product.description.length > 1000) {
        error.description = "Product description must be between 10 and 500 characters";
    }

    const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

    if(!validUrl || !product.imageURL.trim()) {
        error.imageURL = "Product Image URL is not valid";
    }
   if(!product.price.trim() || isNaN(Number(product.price)) || Number(product.price) < 0 || Number(product.price) > 800000) {
        error.price = "Product price must be a number between 1 and 1000";
    }

    return error;
}
  