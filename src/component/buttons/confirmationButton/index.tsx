import "./index.scss";
type Props = {
  btnname: string;
  callback: any;
  positive:boolean;
};
const Acceptbutton = (props: Props) => {
  const { btnname, callback,positive } = props;
  return (
    <>
      <button
        className={positive?"accept-btn":"reject-btn"}
        onClick={() => {
          callback();
        }}
      >
        {btnname}
      </button>
    </>
  );
};
export default Acceptbutton;
