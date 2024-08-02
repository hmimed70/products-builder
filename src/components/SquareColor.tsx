interface IProps {
    color: string
    }
    
    const SquareColor = ({color}: IProps) => {
      return (
        <div className="w-18 p-1 text-white font-semibold text-sm h-10 rounded-md flex justify-center items-center" style={{backgroundColor: color}} > {color} </div>
      );
    };
    
    export default SquareColor;