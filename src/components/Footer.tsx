import React from "react";
import { Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Pierre Gourmet</h3>
          <p className="text-slate-300 mb-6">
            « La gastronomie est l'art d'utiliser la nourriture pour créer le
            bonheur. »
          </p>

          <div className="flex items-center justify-center space-x-2 text-slate-400">
            <span>Fait avec</span>
            <Heart size={18} className="fill-red-500 text-red-500" />
            <span>pour la gastronomie française</span>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-sm text-slate-500">
              © 2025 Pierre Gourmet. Tous droits réservés.
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Site réalisé par{" "}
              <a
                href="https://artisanpro.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-slate-400"
              >
                artisanpro.fr
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
