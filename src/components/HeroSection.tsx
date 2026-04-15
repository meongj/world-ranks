import {Link} from "@tanstack/react-router";

export function HeroSection() {
  return (
    <Link to="/" aria-label="홈으로">
      <section className="relative flex flex-col items-center">
        <picture>
          {/* 모바일 */}
          <source media="(max-width: 767px)" srcSet="/hero-image-sm.jpg" />
          <img src="/hero-image.jpg" alt="배너 이미지" className="w-full h-[300px] object-cover md:h-[340px]" />
        </picture>
        <img src="/Logo.svg" alt="World Ranks" className="absolute top-1/3  " />
      </section>
    </Link>
  );
}
