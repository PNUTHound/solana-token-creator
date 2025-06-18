import { FC } from "react";

interface BrandingProps {
  image: string;
  title: string;
  message: string;
}

const Branding: FC<BrandingProps> = ({ image, title, message }) => {
  return (
    <div className="hidden lg:block p-8">
      <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-2xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <img
          src={`assets/images/ai/${image}.jpg`}
          alt="MGF DEV Branding"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="p-8 text-white">
            <div className="mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <span className="text-2xl font-bold">M</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 leading-tight">
              MGF DEV Token Creator
              <br />
              <span className="text-purple-200">{title}</span>
            </h3>
            <p className="text-purple-100 leading-relaxed max-w-md mb-6">
              {message}
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-8 right-8 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-12 w-12 h-12 bg-purple-300/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/3 left-8 w-16 h-16 bg-blue-300/20 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Branding;