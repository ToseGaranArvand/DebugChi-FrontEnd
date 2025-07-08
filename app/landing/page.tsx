import Footer from "@/components/Layout/Footer";
import { ServiceFeatures } from "@/components/version_1_1/Landing/cta-section";
import Header from "@/components/version_1_1/Landing/header";
import Hero from "@/components/version_1_1/Landing/hero";
import Roadmap from "@/components/version_1_1/Landing/Roadmap";
import Testimonials from "@/components/version_1_1/Landing/testimonials";
import Video from "@/components/version_1_1/Landing/Video";
import WhyWorkingWithUs from "@/components/version_1_1/Landing/why-working";
import { Suspense } from "react";
export default function LandingPage() {
  return (
    <main
      className="min-h-screen font-x bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100"
      dir="rtl"
    >
      <Header />
      <Hero />
      <WhyWorkingWithUs />
      <Roadmap />
      <Video />
      <ServiceFeatures />
      <Testimonials
        comments={[
          {
            id: 1,
            commented_user: {
              first_name: "علیرضا",
              last_name: "یوسف نژادیان",
              id: 1,
              image_profile: "/user.jpg",
              username: "alireza_0631",
              uuid: "uuuid",
            },
            description: "خیلی عالی خدماتوشن من لذت بردم",
            rate: 5,
            tags: "عالی,خیلی خوب",
            user: {
              first_name: "debugchi",
              last_name: "",
              image_profile: "/user.jpg",
              id: 0,
              username: "debug_chi",
              uuid: "debug_chi",
            },
          },
          {
            id: 2,
            commented_user: {
              first_name: "علیرضا",
              last_name: "یوسف نژادیان",
              id: 1,
              image_profile: "/user.jpg",
              username: "alireza_0631",
              uuid: "uuuid",
            },
            description: "خیلی عالی خدماتوشن من لذت بردم",
            rate: 5,
            tags: "عالی,خیلی خوب",
            user: {
              first_name: "debugchi",
              last_name: "",
              image_profile: "/user.jpg",
              id: 0,
              username: "debug_chi",
              uuid: "debug_chi",
            },
          },
        ]}
      />
      <Footer />
    </main>
 

  );
}
