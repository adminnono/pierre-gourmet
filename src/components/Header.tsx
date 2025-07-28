import React from 'react';
import { Instagram, Video, Mail } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Pierre Gourmet</h1>
          <p className="text-2xl text-slate-300 mb-8 italic">« On passe à table ensemble »</p>
          
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-lg text-slate-200 leading-relaxed">
              Passionné de cuisine gastronomique basé à Paris, je parcours les tables d'exception 
              pour partager avec vous mes découvertes culinaires. Entre tradition et innovation, 
              je vous invite à découvrir l'art de la haute gastronomie française et internationale.
            </p>
          </div>
          
          <div className="flex justify-center space-x-8">
            <a 
              href="https://instagram.com/pierre_le_gourmet" 
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-full transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={20} />
              <span>@pierre_le_gourmet</span>
            </a>
            
            <a 
              href="https://tiktok.com/@pierre_le_gourmet" 
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-full transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Video size={20} />
              <span>@pierre_le_gourmet</span>
            </a>
            
            <a 
              href="mailto:pierre.brth@icloud.com" 
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-full transition-colors duration-300"
            >
              <Mail size={20} />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;