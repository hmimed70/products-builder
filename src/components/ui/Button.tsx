interface IProps {
 children: React.ReactNode;
 onClick?: () => void;
 styles: string;
 width?: 'w-full' | 'w-fit';
 height?: 'h-10' | 'h-20'
}

const Button = ({ children, styles, width='w-full', ...rest }: IProps) => {
  return (
    <button {...rest} className={` ${width} text-white rounded-md ${styles}`}>
      {children}
    </button>
  );
};

export default Button;