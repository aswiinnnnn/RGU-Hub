import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface Poster {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
}

export const PosterCarousel = () => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  // Sample posters - replace with actual images
  const posters: Poster[] = [
    {
      id: "1",
      imageUrl: "https://hl-prod-ca-oc-download.s3.amazonaws.com/CNA/UploadedImages/Q0stobXBTBmK9AlBi2r3_CN-article-image-Korver-2.png",
      title: "Welcome to RGU Study Hub",
      description: "Access all study materials for B.Sc Nursing"
    },
    {
      id: "2",
      imageUrl: "https://www.aacnnursing.org/Portals/0/Images/Student/Education-Pathways-image.jpg?ver=nXuCRQjzzmG4z1mbX356PA==",
      title: "Latest Updates",
      description: "July 2024 PYQ papers now available"
    },
    {
      id: "3",
      imageUrl: "https://pointclickcare.com/wp-content/uploads/2020/05/Student_Nursing_Blog_Image_0515.jpg",
      title: "Semester-wise Resources",
      description: "Complete notes for all 8 semesters"
    },
    {
      id: "4",
      imageUrl: "https://nursefocus.org/wp-content/uploads/2020/08/Students-Main-Image-Career-Path-1100px-1024x512.jpg",
      title: "Clinical Resources",
      description: "Lab manuals and skill checklists available"
    }
  ];

  return (
    <div className="w-full bg-gradient-hero">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: true
        }}
      >
        <CarouselContent>
          {posters.map((poster) => (
            <CarouselItem key={poster.id}>
              <div className="relative w-full h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-xl border border-border shadow-medium">
                <img
                  src={poster.imageUrl}
                  alt={poster.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/0 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                      {poster.title}
                    </h3>
                    {poster.description && (
                      <p className="text-sm md:text-base lg:text-lg opacity-100">
                        {poster.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};