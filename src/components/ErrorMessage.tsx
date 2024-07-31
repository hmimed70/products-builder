interface IProps {
  msg: string
}

const ErrorMessage = ({msg}: IProps) => {
  return msg ? <span className="text-red-600 font-semibold text-sm block">{msg}</span> : null;
};

export default ErrorMessage;