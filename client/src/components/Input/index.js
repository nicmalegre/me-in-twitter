export const Input = ({
  label = "",
  placeholder = "",
  type = "text",
  value = "",
  onChange,
  ...props
}) => (
  <div className="mb-4 min-w-max">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={label}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  </div>
);
