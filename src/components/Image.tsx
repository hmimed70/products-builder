
interface IProps {
   imageUrl: string | undefined;
   alt: string;
   className?: string;
}

const Image = ({ imageUrl, alt, className}: IProps) => {
  return (
    <img src={imageUrl} alt={alt} className={className} />
  );
};

export default Image;