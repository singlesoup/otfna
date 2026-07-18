import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Star } from "lucide-react";
import { Restaurant } from "@/lib/types";

export const RestaurantCard = ({ restaurant, index }: { restaurant: Restaurant; index: number }) => (
  <Link href={`/restaurant/${restaurant.id}`} className="group block animate-rise overflow-hidden rounded-[1.35rem] border border-black/[.06] bg-white shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift" style={{ animationDelay: `${Math.min(index * 55, 280)}ms` }} data-testid={`restaurant-card-${restaurant.id}`}>
    <div className="relative aspect-[1.72/1] overflow-hidden bg-neutral-100">
      <Image src={restaurant.image} alt={`${restaurant.name} food selection`} fill sizes="(max-width: 480px) 100vw, 480px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" priority={index < 2} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-white">
        <p className="text-sm font-extrabold" data-testid={`restaurant-offer-${restaurant.id}`}>{restaurant.offer}</p>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur-md"><ArrowUpRight size={17} /></span>
      </div>
    </div>
    <div className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-[17px] font-extrabold" data-testid={`restaurant-name-${restaurant.id}`}>{restaurant.name}</h3>
          <p className="mt-1 truncate text-sm text-neutral-500" data-testid={`restaurant-cuisines-${restaurant.id}`}>{restaurant.cuisines.join(" · ")}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-savings px-2 py-1 text-xs font-bold text-white" data-testid={`restaurant-rating-${restaurant.id}`}><Star size={11} fill="currentColor" /> {restaurant.rating}</span>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs font-semibold text-neutral-500">
        <span data-testid={`restaurant-eta-${restaurant.id}`}>{restaurant.eta}</span>
        <span className="flex items-center gap-1 text-neutral-700"><BadgeCheck size={14} className="text-mango" /> {restaurant.badge}</span>
      </div>
    </div>
  </Link>
);
