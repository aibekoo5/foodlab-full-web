"use client"

import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"

const drinks = [
  {
    id: 1,
    name: "Tropical Boost",
    nameRu: "Тропический смузи",
    nameKz: "Тропикалық смузи",
    description: {
      ru: "0.5 л (500 г) рецепт: Манго – 100 г Ананас – 120 г Банан – 80 г Апельсиновый сок – 150 г, Вода – 50 г",
      kz: "0.5 л (500 г) рецепт: Манго – 100 г Ананас – 120 г Банан – 80 г, Апельсин шырыны – 150 г, Су – 50 г",
    },
    price: 1500,
    priceDisplay: "1 400 KZT",
    calories: 120,
    category: { ru: "Смузи", kz: "Смузи" },
    image: "/drinks/tropical-boost.png",
    bgColor: "bg-amber-100",
  },
  {
    id: 2,
    name: "Green Start",
    nameRu: "Яблочный сок",
    nameKz: "Алма шырыны",
    description: {
      ru: "Құрамы (бір бөтелке 0.5 л): Шпинат – 40 г Зеленый яблока – 150 г Банан – 120 г Огурец – 140 г Вода – 50 г",
      kz: "Құрамы (бір бөтелке 0.5 л): Шпинат – 40 г Жасыл алма – 150 г Банан – 120 г Қияр – 140 г Су – 50 г",
    },
    price: 1200,
    priceDisplay: "1 200 KZT",
    calories: 5,
    category: { ru: "Соки", kz: "Шырындар" },
    image: "/drinks/green-start.png",
    bgColor: "bg-green-100",
  },
  {
    id: 3,
    name: "Berry Mood",
    nameRu: "Ягодный смузи",
    nameKz: "Жидек смузиі",
    description: {
      ru: "1 порция = 0.5 л (шамамен 500 г) Ұсынылатын рецепт: Құлпынай – 60 г Малина – 40 г Қарақат (blackcurrant) – 50 г...",
      kz: "1 порция = 0.5 л (шамамен 500 г) Ұсынылатын рецепт: Құлпынай – 60 г Малина – 40 г Қарақат (blackcurrant) – 50 г...",
    },
    price: 1300,
    priceDisplay: "1 300 KZT",
    calories: 150,
    category: { ru: "Смузи", kz: "Смузи" },
    image: "/drinks/berry-mood.png",
    bgColor: "bg-pink-100",
  },
  {
    id: 4,
    name: "Apple Solo",
    nameRu: "Яблочный сок",
    nameKz: "Алма шырыны",
    description: {
      ru: "1 порция = 0.5 л (шамамен 500 г) Ұсынылатын рецепт: Алма – 300 г Қант – 50 г Су (blackcurrant) – 50 г...",
      kz: "1 порция = 0.5 л (шамамен 500 г) Ұсынылатын рецепт: Құлпынай – 60 г Малина – 40 г Қарақат (blackcurrant) – 50 г...",
    },
    price: 900,
    priceDisplay: "1 200 KZT",
    calories: 150,
    category: { ru: "Смузи", kz: "Смузи" },
    image: "/drinks/apple-solo.png",
    bgColor: "bg-pink-100",
  },
  {
    id: 5,
    name: "Orange Solo",
    nameRu: "Апельсиновый сок",
    nameKz: "Апельсин шырыны",
    description: {
      ru: "1 порция = 0.5 л (шамамен 500 г) Ұсынылатын рецепт: Алма – 300 г Қант – 50 г Су (blackcurrant) – 50 г...",
      kz: "1 порция = 0.5 л (шамамен 500 г) Ұсынылатын рецепт: Құлпынай – 60 г Малина – 40 г Қарақат (blackcurrant) – 50 г...",
    },
    price: 600,
    priceDisplay: "600 KZT",
    calories: 150,
    category: { ru: "Смузи", kz: "Смузи" },
    image: "/drinks/orange-solo.png",
    bgColor: "bg-pink-100",
  },
  {
    id: 6,
    name: "Pineapple Solo",
    nameRu: "Ананасовый сок",
    nameKz: "Ананас шырыны",
    description: {
      ru: "1 порция = 0.5 л (шамамен 500 г) Ұсынылатын рецепт: Алма – 300 г Қант – 50 г Су (blackcurrant) – 50 г...",
      kz: "1 порция = 0.5 л (шамамен 500 г) Ұсынылатын рецепт: Құлпынай – 60 г Малина – 40 г Қарақат (blackcurrant) – 50 г...",
    },
    price: 600,
    priceDisplay: "600 KZT",
    calories: 150,
    category: { ru: "Смузи", kz: "Смузи" },
    image: "/drinks/pineapple-solo.png",
    bgColor: "bg-pink-100",
  },
]

export default function DrinksPage() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero banner with café image */}
        <div className="relative h-64 md:h-100 overflow-hidden rounded-b-3xl mx-4 mt-4">
          <img src="/drinks/drinks.jpg" alt="FoodLab кафе" className="w-full h-full object-cover" />
        </div>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.drinksTitle}</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.drinksSubtitle}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {drinks.map((drink) => (
                <Card key={drink.id} className="overflow-hidden border-0 shadow-sm">
                  <div className={`${drink.bgColor} relative aspect-square p-4`}>
                    
                    <img
                      src={drink.image || "/placeholder.svg"}
                      alt={drink.name}
                      className="absolute bottom-0 right-0 object-contain"
                    />
                    <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                      {drink.priceDisplay}
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-lg">{language === "ru" ? drink.nameRu : drink.nameKz}</h4>
                      <Badge variant="outline" className="shrink-0 text-xs">
                        {drink.category[language]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{drink.description[language]}</p>
                    <p className="text-xl font-bold text-primary">{drink.price}₸</p>
                    <p className="text-sm text-muted-foreground">{drink.calories} kcal</p>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">{t.order}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
