import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { PosterCarousel } from "@/components/PosterCarousel";
import AppHeader from "@/components/AppHeader";
import { HighlightCard } from "@/components/HighlightCard";
import { API_BASE_URL } from "@/config/api";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  ClipboardList, 
  Stethoscope,
  ArrowRight,
  BookMarked,
  Briefcase
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Local typing animation component for the hero subtitle
const TypingText: React.FC<{
  words: string[];
  typingSpeed?: number; // ms per character while typing
  deletingSpeed?: number; // ms per character while deleting
  pauseTime?: number; // ms to pause when a word completes
  prefix?: string; // constant text before animated word
  prefixColor?: string; // hex/rgb/hsl color code for the prefix
  blinkCursor?: boolean; // whether to show blinking cursor
  showCursor?: boolean; // alias to control cursor visibility (non-blinking supported)
}> = ({
  words,
  typingSpeed = 50,
  deletingSpeed = 40,
  pauseTime = 3800,
  prefix = "Explore",
  prefixColor= "#033301",
  blinkCursor = true,
  showCursor,
}) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;

    const current = words[index % words.length];
    const atWordEnd = subIndex === current.length;
    const atWordStart = subIndex === 0 && deleting;

    const timeout = setTimeout(() => {
      if (deleting) {
        if (atWordStart) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        } else {
          setSubIndex((prev) => Math.max(prev - 1, 0));
        }
      } else {
        if (atWordEnd) {
          setDeleting(true);
        } else {
          setSubIndex((prev) => Math.min(prev + 1, current.length));
        }
      }
    }, deleting ? deletingSpeed : (atWordEnd ? pauseTime : typingSpeed));

    return () => clearTimeout(timeout);
  }, [words, index, subIndex, deleting, typingSpeed, deletingSpeed, pauseTime]);

  const text = words[index % words.length].slice(0, subIndex);

  const showCaret = showCursor ?? blinkCursor;

  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap text-3lg sm:text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-full overflow-hidden min-w-0">
      <span
        className="shrink-0 mr-2"
        style={prefixColor ? { color: prefixColor } : undefined}
      >
        {prefix}
      </span>
      <span className="text-primary font-bold truncate">{text}</span>
      {showCaret && (
        <span className="ml-0.5 self-center h-[0.9em] w-[2px] bg-current animate-pulse motion-reduce:animate-none" aria-hidden="true" />
      )}
    </span>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const heroPrefixColor = "#363636";

  const highlights = [
    {
      icon: BookOpen,
      title: "Notes",
      description: "Subject-wise organized handouts",
      color: "primary"
    },
    {
      icon: FileText,
      title: "PYQ",
      description: "Previous Year University Question Papers",
      color: "accent"
    },
    {
      icon: HelpCircle,
      title: "Question Bank",
      description: "Unit-wise and chapter-wise",
      color: "success"
    },
    {
      icon: Stethoscope,
      title: "Practical Resources",
      description: "Clinical logbook, skill checklists, lab guides",
      color: "destructive"
    },
    {
      icon: ClipboardList,
      title: "Syllabus",
      description: "Year-wise syllabus (RGU/INC curriculum)",
      color: "secondary"
    },
    {
      icon: BookMarked,
      title: "Study Guides",
      description: "Comprehensive revision materials",
      color: "primary"
    }
  ];


  type LatestUpdate = {
    type: "Recruitment" | "Material";
    title: string;
    created_at: string;
  };

  const [latestUpdates, setLatestUpdates] = useState<LatestUpdate[]>([]);
  useEffect(() => {
    fetch(`${API_BASE_URL}/latest-updates/`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load latest updates: ${res.status}`);
        return res.json();
      })
      .then(data => setLatestUpdates(data.results ?? data))
      .catch(() => {});
  }, []);



  return (
    <div className="min-h-screen bg-gradient-hero bg-[length:200%]">
      {/* Header */}
      <AppHeader />
      
      {/* Poster Carousel */}
      <section className="container mx-auto px-4 pb-0" aria-label="Featured announcements and updates">
        <PosterCarousel />
      </section>
      
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-8 md:py-5">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          
          
          <h1 className="text-3xl md:text-6xl font-bold -mt-4 md:-mt-2 mb-1 leading-tight" style={{ color: heroPrefixColor }}>
            RGU HUB
            <span className="block mt-2">
              <TypingText words={[ "PYQs", "Question Bank", "Notes", "Syllabus", "Practical Resources"]} prefixColor={heroPrefixColor} showCursor={false} />
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Notes, PYQs & Question Banks etc for students at one place
          </p>
          
          <div className="inline-block w-auto sm:w-auto scale-110 md:scale-125 ">
            <RainbowButton
              variant="default"
              size="lg"
              className="z-10 group opacity-90 w-full sm:w-auto"
              onClick={() => navigate('/course')}
              aria-label="Access study materials"
            >
              Access Materials Now
              <ArrowRight className="w-5 h-5" />
            </RainbowButton>
          </div>
        </div>
      </main>

      {/* Highlights Section */}
      <section className="container mt-0 mx-auto px-4 " aria-label="Available study resources">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Available Resources
          </h2>
          <p className="text-muted-foreground">
            Everything you need for your nursing education journey
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 animate-fade-in">
          {highlights.map((item, index) => (
            <HighlightCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              color={item.color}
              onClick={() => navigate('/course')}
            />
          ))}
        </div>
      </section>    

        {/* Recruitment Section */}
      <section className="container mx-auto px-4 pb-6 pt-12" aria-label="Recruitment opportunities">
        <div className="max-w-4xl mx-auto">
          <article 
            onClick={() => navigate('/recruitment')}
            className="group bg-gradient-primary rounded-2xl p-8 md:p-12 shadow-medium hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="p-4 bg-white/20 rounded-2xl shadow-medium group-hover:scale-110 transition-transform">
                  <Briefcase className="w-12 h-12 text-primary-foreground" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                  Recruitment Portal
                </h3>
                <p className="text-primary-foreground/90 mb-4">
                  Discover placement opportunities and internships for BSc Nursing & Physiotherapy students
                </p>
                <div className="inline-flex items-center gap-2 text-primary-foreground font-medium">
                  Browse Opportunities
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>


      {/* Latest Updates Section (API-driven) */}
      <section className="container mx-auto px-4 py-12" aria-label="Latest updates and new materials">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Latest Updates
          </h2>
          <p className="text-muted-foreground">
            Recently added and updated study materials & recruitments
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto animate-fade-in">
          {latestUpdates.map((item, idx) => {
            const isRecruitment = item.type === "Recruitment";
            const icon = isRecruitment ? <Briefcase className="w-6 h-6 text-success mr-2" /> : <BookOpen className="w-6 h-6 text-primary mr-2" />;
            const formattedDate = new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
            const trimmedTitle = item.title.length > 26 ? item.title.slice(0, 26) + "..." : item.title;
            return (
              <article
                key={idx}
                className="flex items-center bg-gradient-card rounded-xl p-4 border border-border shadow-sm cursor-pointer hover:shadow-md transition-all"
                onClick={() => {
                  if (isRecruitment) {
                    navigate('/recruitment');
                  } else {
                    // Without deep-link hints from backend, send user to the semester flow
                    navigate('/course');
                  }
                }}
              >
                {icon}
                <div className="flex-1">
                  <div className="font-semibold text-foreground text-lg mb-1">{trimmedTitle}</div>
                  <div className="text-xs text-muted-foreground">{isRecruitment ? "Recruitment" : "Material"} • {formattedDate}</div>
                </div>
              </article>
            );
          })}
        </div>
      </section>


       {/* FAQ Section */}
       <section className="container mx-auto px-4 py-5 " aria-label="Frequently asked questions">
        <div className="max-w-4xl mx-auto bg-gradient-card rounded-2xl p-4 md:p-6 border border-border shadow-medium animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">FAQ</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What is RGU Hub?</AccordionTrigger>
              <AccordionContent>
                RGU Hub is a student-focused platform for Rajiv Gandhi University of Health Sciences providing organized notes, PYQs, question banks, syllabus and practical resources.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do i access study materials?</AccordionTrigger>
              <AccordionContent>
                Start from the home page, choose your course, select semester and subject, then pick the material type to access downloads directly—no login required.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Available resources and courses</AccordionTrigger>
              <AccordionContent>
                Currently focused on Nursing and Physiotherapy. Resources include Notes, PYQs, Question Banks, Syllabus and Practical guides, with more to come.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className=" border-t border-border mt-5">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center mb-4">
              <img src="/logo.png" alt="RGU Hub Logo - RGUHS Study Materials Platform" className="h-6 w-auto" />
            </div>
            <div className="max-w-2xl mx-auto p-1 bg-mute rounded-lg">
              <p className="text-xs text-muted-foreground italic">
                <strong>Disclaimer:</strong> This is a platform made for students to access study materials easily. 
                Official syllabus and results are available only on the official RGUHS website.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
