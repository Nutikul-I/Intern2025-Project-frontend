import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faTiktok,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

/**
 * Responsive SiteFooter
 * ---------------------
 * sm   ≤  640 px  : compact padding, smaller icons, map 40 px
 * md   ≥  768 px  : 2‑column grid, map 48 px
 * lg   ≥ 1024 px  : wider gaps & padding, map 56 px
 * xl   ≥ 1280 px  : text-xl heading, map 64 px
 * 2xl  ≥ 1536 px  : generous spacing, map 72 px
 */
export default function SiteFooter() {
  return (
    <footer className="bg-black text-white text-[13px] sm:text-sm mt-16">
      <div
        className="mx-auto max-w-6xl sm:max-w-7xl px-4 sm:px-6 lg:px-8
                   py-6 sm:py-8 lg:py-12 xl:py-14 2xl:py-16
                   grid gap-6 sm:gap-8 lg:gap-10 xl:gap-12
                   md:grid-cols-[1fr_auto] items-center"
      >
        {/* --- Left column --- */}
        <div className="flex flex-col justify-center">
          <h2 className="text-base sm:text-lg xl:text-xl font-semibold mb-3 sm:mb-4 xl:mb-5">
            PWZ
          </h2>

          <p className="max-w-xs leading-relaxed mb-4 sm:mb-6 xl:mb-8 text-gray-100/90">
            We are a residential interior design firm located in Portland.
            Our boutique studio offers more than
          </p>

          <div className="flex items-center space-x-4 sm:space-x-5 xl:space-x-6">
            {[
              [faTwitter, "Twitter"],
              [faFacebookF, "Facebook"],
              [faTiktok, "TikTok"],
              [faInstagram, "Instagram"],
            ].map(([ico, label]) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="hover:opacity-80 transition-opacity"
              >
                <FontAwesomeIcon
                  icon={ico}
                  className="h-4 w-4 sm:h-5 sm:w-5 xl:h-6 xl:w-6"
                />
              </a>
            ))}
          </div>
        </div>

        {/* --- Right column : Map --- */}
        <div
          className="w-36 aspect-square sm:w-48 lg:w-56 xl:w-64 2xl:w-72
                     bg-white/10 rounded-lg
                     flex items-center justify-center text-xs"
        >
          Map
        </div>
      </div>
    </footer>
  );
}
