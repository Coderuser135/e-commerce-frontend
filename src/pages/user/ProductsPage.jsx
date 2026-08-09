import React, { useState } from 'react';

const ProductsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-fit flex font-sans text-base leading-relaxed text-black">
      {/* Menu Item Container */}
      <div className="relative group">
        
        {/* Main Dropdown Button/Link */}
        <a
          href="#"
          className="relative flex items-center justify-center gap-3 px-9 py-3 rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-10 group-hover:text-white group-hover:rounded-b-none group-hover:rounded-t-2xl"
        >
          {/* Animated Background Fill */}
          <span className="absolute inset-0 bg-[#0a3cff] -z-10 scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100 group-hover:origin-right" />

          <span className="relative z-10">Our Services</span>

          {/* Arrow Icon */}
          <svg
            viewBox="0 0 360 360"
            className="w-[14px] h-[14px] fill-black transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:fill-white group-hover:-rotate-180"
          >
            <path
              id="XMLID_225_"
              d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
            />
          </svg>
        </a>

        {/* Submenu Dropdown */}
        <div className="absolute top-full left-0 w-full flex flex-col items-center rounded-b-2xl overflow-hidden border border-[#cccccc] opacity-0 invisible -translate-y-3 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-10 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-hover:border-t-transparent group-hover:border-[#0a3cff]">
          
          {['Development', 'Design', 'Marketing', 'SEO'].map((service, index) => (
            <div key={index} className="w-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
              <a
                href="#"
                className="relative block w-full px-6 py-3 text-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-white group/item"
              >
                {/* Submenu Hover Background Animation */}
                <span className="absolute inset-0 bg-[#0a3cff] -z-10 scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/item:scale-x-100 group-hover/item:origin-right" />
                <span className="relative z-10">{service}</span>
              </a>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
