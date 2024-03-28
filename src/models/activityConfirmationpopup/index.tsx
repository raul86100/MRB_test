import Acceptbutton from "../../component/buttons/confirmationButton";
import Rejectbutton from "../../component/buttons/confirmationButton";
import "./index.scss";
type Props = {
  message: string,
  okay: string,
  reject: string,
  callback: any,
};
const Popcard = (props: Props) => {
  const { message, callback, okay, reject } = props;
  return (
    <div className="Popup-layout">
      <section className="popup-inner">
        <span>{message}</span>
        <footer>
          <Acceptbutton
            btnname={okay}
            callback={() => {
              callback(okay);
            }}
            positive={true}
          />
          <Rejectbutton
            btnname={reject}
            callback={() => {
              callback(reject);
            }}
            positive={false}
          />
        </footer>
      </section>
    </div>
  );
};
export default Popcard;


