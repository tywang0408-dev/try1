
import React from 'react';
import HeroSection from './components/HeroSection';
import OverviewSection from './components/OverviewSection';
import GrowthSystem from './components/GrowthSystem';
import BenefitsOverview from './components/BenefitsOverview';
import InteractiveFeatureSection from './components/InteractiveFeatureSection';
import AllocationSection from './components/AllocationSection';
import Footer from './components/Footer';
import { ImageProvider, useImageContext } from './contexts/ImageContext';
import { Settings, X, RotateCcw, Type, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TRAFFIC_BENEFITS, 
  MONETIZATION_BENEFITS, 
  SOCIAL_BENEFITS, 
  HONOR_BENEFITS
} from './constants';

const EditControls: React.FC = () => {
  const { isEditing, toggleEditing, resetAll, resetTexts, getAllConfig } = useImageContext();

  const handleExport = () => {
      const config = getAllConfig();
      const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'honor-kings-config.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert("配置已下载！\n请将下载的 json 文件内容复制并发给开发者，以便更新代码默认值。\n\nConfig downloaded!\nPlease copy the content of the json file and send it to the developer to update the code defaults.");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isEditing && (
          <>
             <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={handleExport}
                className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-full shadow-xl transition-all flex items-center gap-2"
                title="Export Configuration"
             >
                <Download size={20} />
             </motion.button>

             <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={() => {
                  if (window.confirm('确定要重置所有文案为默认吗？')) {
                    resetTexts();
                    window.location.reload(); 
                  }
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-xl transition-all flex items-center gap-2"
                title="Reset Texts"
             >
                <Type size={20} />
             </motion.button>

             <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={() => {
                  if (window.confirm('确定要重置所有图片和文案为默认吗？')) {
                    resetAll();
                    window.location.reload();
                  }
                }}
                className="bg-red-600 hover:bg-red-500 text-white p-3 rounded-full shadow-xl transition-all"
                title="Reset All"
              >
                <RotateCcw size={20} />
              </motion.button>
          </>
        )}
      </AnimatePresence>
      
      <button
        onClick={toggleEditing}
        className={`p-4 rounded-full shadow-2xl transition-all duration-300 ${
          isEditing 
            ? 'bg-white text-black rotate-90' 
            : 'bg-yellow-500 text-black hover:scale-110'
        }`}
        title={isEditing ? "Exit Edit Mode" : "Edit Mode"}
      >
        {isEditing ? <X size={24} /> : <Settings size={24} />}
      </button>
    </div>
  );
};

const AppContent: React.FC = () => {
  return (
    <div className="bg-black text-white w-full">
      <HeroSection />
      
      {/* P1 */}
      <OverviewSection />
      
      {/* P2 */}
      <GrowthSystem />
      
      {/* P3 - Overview */}
      <BenefitsOverview />
      
      {/* P4 - Traffic */}
      <InteractiveFeatureSection 
        sectionId="traffic"
        data={TRAFFIC_BENEFITS} 
        bgGradient="from-blue-900/30 to-cyan-900/30"
      />
      
      {/* P5 - Monetization */}
      <InteractiveFeatureSection 
        sectionId="monetization"
        data={MONETIZATION_BENEFITS} 
        align="right"
        bgGradient="from-yellow-900/20 to-orange-900/20"
      />
      
      {/* P6 - Social */}
      <InteractiveFeatureSection 
        sectionId="social"
        data={SOCIAL_BENEFITS} 
        bgGradient="from-pink-900/20 to-purple-900/20"
      />

      {/* P7 - Honor */}
      <InteractiveFeatureSection 
        sectionId="honor"
        data={HONOR_BENEFITS} 
        align="right"
        bgGradient="from-gray-800 to-gray-900"
      />
      
      {/* P8 - Allocation Overview */}
      <AllocationSection />
      
      {/* Footer */}
      <Footer />

      {/* Global Edit Toggle */}
      <EditControls />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ImageProvider>
      <AppContent />
    </ImageProvider>
  );
};

export default App;
