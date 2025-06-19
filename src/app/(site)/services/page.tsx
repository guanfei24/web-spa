"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X } from "lucide-react";

// --- TypeScript 类型定义 ---
type Service = {
  id: number;
  title: string;
  price: number;
  duration: number;
  slug: string;
  image_url: string;
  description: string;
};

type Category = {
  id: number;
  name: string;
  services: Service[];
};

// --- 展开后的服务详情视图 ---
const ExpandedServiceCard = ({
  service,
  setSelectedService,
}: {
  service: Service;
  setSelectedService: (service: Service | null) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={() => setSelectedService(null)}
    >
      <motion.div
        layoutId={`service-card-${service.id}`}
        className="relative w-full max-w-2xl bg-black border-2 border-[#b8860b] rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-64 md:h-80 relative">
          <motion.div
            layoutId={`service-image-${service.id}`}
            className="w-full h-full"
          >
            <Image
              src={service.image_url}
              alt={service.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
        <div className="p-6">
          <motion.h2
            layoutId={`service-title-${service.id}`}
            className="text-3xl font-bold text-[#b8860b] mb-2 font-serif"
          >
            {service.title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="text-gray-300"
          >
            <p className="text-lg text-gray-300 mb-4">{service.description}</p>
            <p className="text-lg text-gray-200 font-semibold mb-6">
              时长: {service.duration} 分钟 • ${service.price}
            </p>
            <a
              href={`/services/${service.slug}`}
              className="inline-block bg-[#b8860b] text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              了解详情并预订
            </a>
          </motion.div>
        </div>
        <motion.button
          onClick={() => setSelectedService(null)}
          className="absolute top-4 right-4 bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors"
          aria-label="Close"
        >
          <X className="h-6 w-6 text-white" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// --- 主页面组件 ---
export default function ServicesPage() {
  const [serviceCategories, setServiceCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // --- 新增：多种滚动动画方案供您选择 ---

  // 方案 1 (当前): 从下方淡入 (默认)
  const scrollFadeIn: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // 方案 2: 从侧方微移淡入
  const subtleSlideIn: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // 方案 3: 放大出现
  const scaleUp: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // 方案 4: 交错动画 (父容器)
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // 每个子元素的动画延迟 0.15 秒
      },
    },
  };

  useEffect(() => {
    // ... 您的数据获取逻辑保持不变 ...
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query {
                serviceCategories { id name services { id title price duration slug image_url description } }
              }
            `,
          }),
        });
        const json = await res.json();
        if (json.data) {
          setServiceCategories(json.data.serviceCategories);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="p-8 text-center text-xl text-gray-400">
          Loading services...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans bg-black overflow-hidden">
      <motion.h1
        className="text-4xl md:text-5xl font-serif font-bold text-center text-[#b8860b] mb-16"
        initial="hidden"
        animate="visible"
        variants={scrollFadeIn} // 您可以替换成其他方案, 例如: variants={scaleUp}
        transition={{ duration: 0.8 }}
      >
        Our Services
      </motion.h1>

      {serviceCategories?.map((cat) => (
        <div key={cat.id} className="mb-16">
          <motion.h2
            className="text-3xl font-serif font-semibold text-gray-200 mb-6 border-b-2 border-[#b8860b] pb-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={scrollFadeIn} // 这里也可以替换
          >
            {cat.name}
          </motion.h2>
          {/*
            要使用交错动画 (方案4), 请取消下面这行 motion.div 的注释,
            并为里面的卡片 motion.div 指定一个简单的 fade-in 动画。
          */}
          {/* <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          > */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cat.services.map((srv) => (
              <motion.div
                key={srv.id}
                layoutId={`service-card-${srv.id}`}
                onClick={() => setSelectedService(srv)}
                className="bg-gray-900/50 border border-[#b8860b]/30 rounded-xl p-4 shadow-lg hover:shadow-[#b8860b]/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                // --- 在这里切换您想测试的动画方案 ---
                variants={scrollFadeIn} // 默认
                // variants={subtleSlideIn} // 方案2
                // variants={scaleUp} // 方案3
              >
                <div className="w-full h-48 mb-4 rounded-lg overflow-hidden relative">
                  <motion.div
                    layoutId={`service-image-${srv.id}`}
                    className="w-full h-full"
                  >
                    {srv.image_url ? (
                      <Image
                        src={srv.image_url}
                        alt={srv.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </motion.div>
                </div>
                <div className="flex flex-col flex-grow">
                  <motion.h3
                    layoutId={`service-title-${srv.id}`}
                    className="text-xl font-bold font-serif text-[#b8860b] mb-2"
                  >
                    {srv.title}
                  </motion.h3>
                  <p className="text-sm text-gray-400 mb-3 flex-grow">
                    {srv.description}
                  </p>
                  <p className="text-sm text-gray-300 font-medium">
                    {srv.duration} min • ${srv.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* </motion.div> */}
        </div>
      ))}

      <AnimatePresence>
        {selectedService && (
          <ExpandedServiceCard
            service={selectedService}
            setSelectedService={setSelectedService}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
