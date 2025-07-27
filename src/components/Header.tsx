import React from "react";
import { Instagram, Music, Mail, MapPin } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="bg-orange-500 text-white p-2 rounded-full mr-3">
              <span className="text-xl font-bold">PG</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Pierre Gourmet
              </h1>
              <p className="text-orange-500 text-sm font-medium">
                On passe à table ensemble
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              Paris
            </div>

            <div className="flex space-x-3">
              <a
                href="https://instagram.com/pierre_le_gourmet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://l.instagram.com/?u=https%3A%2F%2Fwww.tiktok.com%2F%40pierre.gourmet%3F_t%3DZN-8xwnuNdOEdS%26_r%3D1%26fbclid%3DPAZXh0bgNhZW0CMTEAAafzAgfl0v0aE_5F-w7ALiAPdt9Nukhm9AmZrUPs4Cm4m0Oub6yubcGqIsyjkg_aem_D24LAbIHwaUa_gzlyvkVgQ&e=AT15tbLVjkELe3QAlrZZUBo_XnAoSbBqK5N_l7pAGmsUkuPuatoJlXRVB2D0jk0Gvi9A2OGzaDLDX3jhugFLnc8RFFZ8q5C937pw408mt8olpOSQhy1FLKQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Music className="w-5 h-5" />
              </a>
              <a
                href="mailto:pierre.brth@icloud.com"
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
