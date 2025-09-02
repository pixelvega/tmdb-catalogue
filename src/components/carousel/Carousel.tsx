import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide, type SwiperProps } from "swiper/react"

import "./Carousel.scss"

interface Identifiable {
  id: string | number
}

interface CarouselProps<T extends Identifiable> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  swiperProps?: SwiperProps
  getKey?: (item: T) => string | number
}

const Carousel = <Item extends Identifiable>({
  items,
  renderItem,
  swiperProps,
  getKey,
}: CarouselProps<Item>) => {
  return (
    <div className="carousel-container">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          480: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
        }}
        {...swiperProps}
      >
        {items.map((item, index) => (
          <SwiperSlide key={getKey ? getKey(item) : item.id}>
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Carousel
