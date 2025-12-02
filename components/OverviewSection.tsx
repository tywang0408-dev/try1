
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OVERVIEW_DATA } from '../constants';
import { ArrowRight } from 'lucide-react';
import { useImage } from '../contexts/ImageContext';
import ImageUploader from './ImageUploader';
import EditableText from './EditableText';

// Helper component to handle individual item logic with hooks
const OverviewItem: React.FC<{ item: typeof OVERVIEW_DATA[0]; isHovered: boolean; onHover: () => void; onLeave: () => void; isOtherHovered: boolean }> = ({ item, isHovered, onHover, onLeave, isOtherHovered }) => {
  const currentImage = useImage(`overview_${item.id}`, item.image);

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer group bg-gray-900"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onHover} // Support tap on mobile
      animate={{
        flex: isHovered ? 2 : 1,
        opacity: isOtherHovered && !isHovered ? 0.5 : 1
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={currentImage} 
          alt={item.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 pointer-events-none select-none"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
      
      <ImageUploader imageKey={`overview_${item.id}`} />

      <div className="absolute bottom-0 left-0 p-8 w-full z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className={`h-8 w-1 bg-yellow-500 transition-all duration-300 ${isHovered ? 'h-12' : 'h-8'}`}></div>
          <h3 className="text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors">
            <EditableText id={`overview_title_${item.id}`} defaultText={item.title} />
          </h3>
        </div>
        <motion.div 
          className="text-gray-300 text-lg mt-2 overflow-hidden"
          animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
        >
          <EditableText id={`overview_desc_${item.id}`} defaultText={item.description} as="p" />
        </motion.div>
        <motion.div
           animate={{ opacity: isHovered ? 1 : 0 }}
           className="mt-4 flex items-center text-yellow-500 font-medium"
        >
          了解更多 <ArrowRight className="ml-2 w-4 h-4" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const OverviewSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative py-24 bg-gradient-to-b from-black to-gray-900 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <EditableText 
            id="overview_main_title" 
            as="h2" 
            defaultText="全新体系架构" 
            className="text-4xl md:text-5xl font-bold text-white mb-4 block"
          />
          <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          {OVERVIEW_DATA.map((item) => (
            <OverviewItem 
              key={item.id} 
              item={item} 
              isHovered={hoveredId === item.id}
              isOtherHovered={hoveredId !== null}
              onHover={() => setHoveredId(item.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
