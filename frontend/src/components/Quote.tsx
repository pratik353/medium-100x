import React from "react";

const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex justify-center items-center ">
      <div>
        <div className="max-w-md text center text-2xl font-bold">
          "The customer support I received was exceptional. The support team
          went above and beyond to my concerns."
        </div>
        <div className="max-w-md text center text-xl font-semibold mt-4">
          Julies Winfield
        </div>
        <div className="max-w-md text center text-sm text-slate-500">
          CEO, Acme Inc.
        </div>
      </div>
    </div>
  );
};

export default Quote;
