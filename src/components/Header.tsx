import React from "react";
import { Instagram, Mail } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header
      className="bg-slate-900 text-white py-16"
      style={{ backgroundColor: "rgb(239, 124, 34)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img
              src="./images/logo.jpeg"
              alt="Logo Pierre Gourmet"
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            Pierre Gourmet
          </h1>
          <p className="text-2xl text-slate-300 mb-8 italic">
            « On passe à table ensemble »
          </p>

          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-lg text-slate-200 leading-relaxed">
              Passionné de cuisine gastronomique, je parcours les tables
              d'exception pour partager avec vous mes découvertes culinaires.
              Entre tradition et innovation, je vous invite à découvrir l'art de
              la haute gastronomie française et internationale.
            </p>
          </div>

          {/* Boutons Sociaux Responsive */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://instagram.com/pierre_le_gourmet"
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-full transition-colors duration-300 text-sm sm:text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={20} />
              <span>@pierre_le_gourmet</span>
            </a>

            <a
              href="https://www.tiktok.com/@pierre.gourmet?_t=ZN-8xwnuNdOEdS&_r=1"
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-full transition-colors duration-300 text-sm sm:text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <path d="M232 64.1c-23.4 0-42.5-19.1-42.5-42.5h-36.6v136.7c0 14.6-11.8 26.5-26.5 26.5s-26.5-11.8-26.5-26.5 11.8-26.5 26.5-26.5c3.3 0 6.4.6 9.3 1.8V96c-3.1-.4-6.2-.6-9.3-.6-33 0-59.8 26.8-59.8 59.8S96.6 215 129.6 215s59.8-26.8 59.8-59.8v-79.5c11.6 9.6 26.4 15.4 42.5 15.4v-27z" />
              </svg>
              <span>@pierre_le_gourmet</span>
            </a>

            <a
              href="mailto:pierre.brth@icloud.com"
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-full transition-colors duration-300 text-sm sm:text-base"
            >
              <Mail size={20} />
              <span>pierre.brth@icloud.com</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
