export const Card = props => {
  const { children } = props;
  return (
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-xl">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {children}
        </div>
      </div>
    </div>
  );
};
