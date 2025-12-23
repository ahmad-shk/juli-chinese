"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Star } from "lucide-react"

export function Menu() {
  const [activeCategory, setActiveCategory] = useState("all")
  const { lang } = useLanguage()

  const t = translations[lang].menu

  const filteredItems = activeCategory === "all" 
    ? t.items 
    : t.items.filter((item: any) => item.category.toLowerCase() === activeCategory.toLowerCase())

  return (
    <section id="menu" className="py-16 md:py-24 bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar based on image */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 bg-gray-50 dark:bg-[#111] p-4 md:p-6 rounded-[2rem] border border-gray-200 dark:border-white/5">
          <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white font-serif">
            {t.title}
          </h2>

          {/* Categories in Center */}
          <div className="flex flex-wrap gap-6 justify-center">
            {t.categories.map((category: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(category.toLowerCase())}
                className={`text-sm font-medium transition-colors uppercase tracking-widest ${
                  activeCategory === category.toLowerCase()
                    ? "text-amber-600 border-b-2 border-amber-600"
                    : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* View Menu Button */}
          <Button className="bg-black dark:bg-white text-white dark:text-black rounded-full px-8 hover:opacity-80 transition-opacity">
            {t.viewFull}
          </Button>
        </div>

        {/* Menu Grid based on image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item: any, idx: number) => (
            <Card 
              key={idx} 
              className="group bg-gray-50 dark:bg-[#111] border-none rounded-[2rem] overflow-hidden hover:translate-y-[-5px] transition-all duration-300 shadow-md"
            >
              {/* Image Container */}
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={item.image || "/mask-group.jpg"} // Default fallback image
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content Box */}
              <div className="p-5 flex flex-col gap-2">
                <h3 className="text-sm md:text-base font-semibold text-black dark:text-white line-clamp-2 min-h-[40px]">
                  {item.name}
                </h3>
                
                <div className="flex items-center justify-between mt-auto">
                  {/* Stars UI from image */}
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  
                  {/* Price */}
                  <p className="text-lg font-bold text-black dark:text-white">
                    €{item.price}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}