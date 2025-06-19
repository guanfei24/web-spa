import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- 数据部分保持不变 ---
const galleryItems = [
  {
    id: 1,
    imgSrc:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1740&auto=format&fit=crop",
    alt: "Spa photo 1",
  },
  {
    id: 2,
    imgSrc:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1740&auto=format&fit=crop",
    alt: "Spa photo 2",
  },
  {
    id: 3,
    imgSrc:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1740&auto=format&fit=crop",
    alt: "Spa photo 3",
  },
  {
    id: 4,
    imgSrc:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1740&auto=format&fit=crop",
    alt: "Spa photo 3",
  },
  {
    id: 5,
    imgSrc:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1740&auto=format&fit=crop",
    alt: "Spa photo 3",
  },
  {
    id: 6,
    imgSrc:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1740&auto=format&fit=crop",
    alt: "Spa photo 3",
  },
];

// 动画变体 (Variants) 定义
// 1. 定义容器的变体，用于触发子项的交错动画
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // staggerChildren 属性是关键，它指定了子元素之间动画的延迟时间
      staggerChildren: 0.2,
      duration: 0.5,
    },
  },
} as const;

// 2. 定义每个图片卡片的变体
const itemVariants = {
  hidden: { y: 20, opacity: 0 }, // 初始状态：在下方20px，透明
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      // 可以给子项动画加上弹簧效果，更有趣
      type: "spring",
      stiffness: 90,
    },
  },
} as const;

export default function Gallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedItem = galleryItems.find((item) => item.id === selectedId);

  return (
    // 我们将外层 div 作为动画的触发器
    <div className="mt-20 text-center px-4">
      <h2 className="text-3xl font-bold mb-8">Our Space</h2>

      {/* 图片网格容器，应用 containerVariants */}
      <motion.div
        className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        // 应用动画变体
        variants={containerVariants}
        // 当进入视口时，从 'hidden' 状态过渡到 'visible' 状态
        initial="hidden"
        whileInView="visible"
        // viewport 设置可以确保动画只播放一次
        viewport={{ once: true, amount: 0.3 }}
      >
        {galleryItems.map((item) => (
          // 每个图片卡片应用 itemVariants
          <motion.div
            key={item.id}
            variants={itemVariants} // 应用子项动画变体
            layoutId={`card-container-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            className="overflow-hidden rounded-lg shadow-lg cursor-pointer bg-gray-100"
          >
            <motion.img
              src={item.imgSrc}
              alt={item.alt}
              className="object-cover w-full h-64 hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }} // 使用 motion 的 whileHover 替代 CSS hover
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* --- 模态框部分保持不变 --- */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <motion.div
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              layoutId={`card-container-${selectedId}`}
              onClick={(e) => e.stopPropagation()}
              className="overflow-hidden rounded-xl w-full max-w-2xl bg-gray-100"
            >
              <motion.img
                src={selectedItem.imgSrc}
                alt={selectedItem.alt}
                className="object-contain w-full h-auto max-h-[80vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
