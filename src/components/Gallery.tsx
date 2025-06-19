import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 为了更好的管理和扩展，我们创建一个数据数组
const galleryItems = [
  {
    id: 1,
    // 为了效果更明显，这里使用了不同尺寸和主题的占位图
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
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1740&auto=format&fit=crop",
    alt: "Spa photo 3",
  },
];

export default function Gallery() {
  // 使用 useState 来追踪被选中的图片的 ID，null 表示没有选中任何图片
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 根据 selectedId 找到对应的 item 对象
  const selectedItem = galleryItems.find((item) => item.id === selectedId);

  return (
    <motion.div
      className="mt-20 text-center px-4" // 增加一些水平内边距
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }} // amount 调整可见性阈值
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-8">Our Space</h2>

      {/* 图片网格 */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {galleryItems.map((item) => (
          <motion.div
            key={item.id}
            // 核心：为每个卡片设置唯一的 layoutId
            layoutId={`card-container-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            className="overflow-hidden rounded-lg shadow-lg cursor-pointer bg-gray-100"
          >
            <motion.img
              // layoutId 也需要，但通常附加到容器上效果更好
              // 这里我们让图片充满容器
              src={item.imgSrc}
              alt={item.alt}
              className="object-cover w-full h-64 hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        ))}
      </div>

      {/* 模态框动画容器 */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <motion.div
            // 点击背景遮罩时关闭模态框
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* 模态框内容区域 */}
            <motion.div
              // 核心：使用与卡片相同的 layoutId 来实现动画
              layoutId={`card-container-${selectedId}`}
              // 阻止事件冒泡，防止点击内容区域关闭模态框
              onClick={(e) => e.stopPropagation()}
              className="overflow-hidden rounded-xl w-full max-w-2xl bg-gray-100" // 模态框样式
            >
              <motion.img
                src={selectedItem.imgSrc}
                alt={selectedItem.alt}
                className="object-contain w-full h-auto max-h-[80vh]" // 调整图片在模态框中的显示
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
