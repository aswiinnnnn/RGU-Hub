import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Heart, Users, Share2, MessageCircle, Sparkles } from "lucide-react";

const ComingSoonNursing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <AppHeader />
      <div className="container mx-auto px-4 pt-0 pb-6">
        <Breadcrumbs 
          items={[
            { label: "Select Course", path: "/course" },
            { label: "BSC Nursing - Coming Soon" }
          ]} 
        />
        
        <div className="mt-3 mb-6 animate-fade-in">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/course')}
            className="px-3 py-1 text-black text-sm font-semibold mb-5 border-[0.7px] border-black/20 shadow-nav"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Course Selection
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-6 md:mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-success/10 border border-success/20 rounded-full mb-4 md:mb-6">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-success" />
              <span className="text-success font-medium text-xs md:text-sm">
                COMING SOON
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 md:mb-4 px-2">
              BSC Nursing Study Materials
            </h1>
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
              We're working to bring you study materials for BSC Nursing students
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-gradient-card rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border border-border shadow-medium mb-6 md:mb-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2 md:p-3 lg:p-4 bg-primary/10 rounded-lg md:rounded-xl flex-shrink-0">
                <BookOpen className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-1 md:mb-2">
                  Help Us Build Together!
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Free platform by students, for students
                </p>
              </div>
            </div>


            {/* Contact Section */}
            <div className="bg-success/5 rounded-lg md:rounded-xl p-4 md:p-6 lg:p-8 border border-success/20 shadow-medium">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-success/20 rounded-full mb-3 md:mb-4">
                    <MessageCircle className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-success" />
                  </div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-2 md:mb-3">
                    Have Study Materials to Share?
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 max-w-xl mx-auto">
                    Contact us via WhatsApp to contribute. Your help makes this platform better for everyone!
                  </p>
                  <Button
                    size="lg"
                    className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-sm md:text-base lg:text-lg rounded-lg md:rounded-xl shadow-medium w-full"
                    onClick={() => {
                      window.open('https://wa.me/919605982147?text=Hi%20admin%2C%0AI%20have%20study%20material%20(notes%20%2B%20PYQs).%20Want%20to%20share%20with%20the%20community.%0AHow%20can%20I%20upload%2Fsend%20it%3F', '_blank');
                    }}
                  >
                    <Share2 className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" />
                    <span className="whitespace-nowrap">Contact Admin on WhatsApp</span>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3 md:mt-4 px-2">
                    Click to open WhatsApp and start a conversation
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="bg-primary/5 rounded-lg md:rounded-xl p-4 md:p-6 border border-primary/20">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-primary/20 rounded-lg flex-shrink-0">
                    <Heart className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-foreground mb-2">
                      Your Contribution Matters
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-2 md:mb-3">
                      RGU Hub is a free platform helping students access quality study materials. 
                      We believe in community collaboration.
                    </p>
                    <p className="text-sm md:text-base text-foreground font-medium leading-relaxed">
                      Share your notes, PYQs, or resources to help fellow students build a stronger learning community.
                    </p>
                  </div>
                </div>
              </div>

              
          </div>

          {/* Additional Info */}
          <div className="text-center text-xs md:text-sm text-muted-foreground animate-fade-in px-2">
            <p>
              We're working to add more resources. Check back soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonNursing;

