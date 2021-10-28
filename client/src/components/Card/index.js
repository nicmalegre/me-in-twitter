export const Card = props => {
  const { children } = props;
  return (
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white shadow-md rounded px-6 pt-4 pb-2 mb-2">
          {children}
        </div>
      </div>
    </div>
  );
};
