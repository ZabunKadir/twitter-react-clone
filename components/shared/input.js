const Input = ({ name, type, focus, handle, setFocus, data }) => {
  return (
    <label
      className={`relative bg-black block border items-center ${
        focus ? "border-primary" : "border-gray"
      } rounded-md w-full px-4 pb-2 pt-6 `}
    >
      <input
        name={name.toLowerCase()}
        id={name.toLowerCase()}
        type={type}
        className="w-full bg-black outline-none peer"
        onChange={handle}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <div
        className={`absolute w-full h-full flex ${
          !data ? "items-center text-base" : " text-sm pt-1"
        }  left-4 top-0  peer-focus:items-start peer-focus:text-sm peer-focus:pt-1`}
      >
        <div className="text-gray peer-focus:text-primary ">{name}</div>
        {focus && name == "Name" && (
          <div className="flex w-full pr-6 text-gray justify-end text-sm tracking-widest">
            {data?.length}/50
          </div>
        )}
      </div>
    </label>
  );
};
export default Input;
