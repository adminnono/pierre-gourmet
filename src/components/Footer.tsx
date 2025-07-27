import React from "react";
import { Instagram, Music, Mail, Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-orange-500 text-white p-2 rounded-full mr-3">
              <span className="text-lg font-bold">PG</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Pierre Gourmet</h3>
              <p className="text-orange-500 text-sm">
                On passe à table ensemble
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/pierre_le_gourmet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://l.instagram.com/?u=https%3A%2F%2Fwww.tiktok.com%2F%40pierre.gourmet%3F_t%3DZN-8xwnuNdOEdS%26_r%3D1%26fbclid%3DPAZXh0bgNhZW0CMTEAAafzAgfl0v0aE_5F-w7ALiAPdt9Nukhm9AmZrUPs4Cm4m0Oub6yubcGqIsyjkg_aem_D24LAbIHwaUa_gzlyvkVgQ&e=AT15tbLVjkELe3QAlrZZUBo_XnAoSbBqK5N_l7pAGmsUkuPuatoJlXRVB2D0jk0Gvi9A2OGzaDLDX3jhugFLnc8RFFZ8q5C937pw408mt8olpOSQhy1FLKQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Music className="w-6 h-6" />
              </a>
              <a
                href="mailto:pierre.brth@icloud.com"
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-gray-600 flex items-center justify-center">
            Fait avec <Heart className="w-4 h-4 text-red-500 mx-1" /> pour la
            gastronomie parisienne
          </p>
          <p className="text-sm text-gray-500 mt-2">
            © 2024 Pierre Gourmet. Toutes les critiques sont personnelles et
            reflètent mon expérience.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
