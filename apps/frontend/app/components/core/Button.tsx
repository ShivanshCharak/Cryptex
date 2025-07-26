import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "Green" | "Red" | "Blue"|"Login";

  onClick: () => void;
};

export const Button = ({ children, variant = "Login", onClick }: ButtonProps) => {
  const variantClass = {
    Green: { bg: "bg-green-500", text: "text-green-700",width:"w-[80px]", height:'h-[35px]' },
    Red: { bg: "bg-red-500", text: "text-red-700",width:"w-[80px]", height:'h-[35px]' },
    Blue: { bg: "bg-blue-500", text: "text-blue-700",width:"w-[80px]", height:'h-[35px]' },
    Login:{width:"w-[80px]", height:'h-[35px]',bg: "bg-blue-500", text: "text-blue-700"  }
    
  };

  const applied = variantClass[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${variantClass[variant].width} relative overflow-hidden text-sm px-3 py-1.5 mr-4 h-[32px] font-semibold rounded-lg focus:outline-none hover:opacity-90 disabled:opacity-80 disabled:hover:opacity-80 ${applied.bg}`}
    >
      <div className={`relative z-10 flex items-center justify-center gap-4 `}>
        {children}
      </div>
    </button>
  );
};
