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
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-success" />
              <span className="text-success font-medium text-sm">
                COMING SOON
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              BSC Nursing Study Materials
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're working hard to bring you comprehensive study materials for BSC Nursing students
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-gradient-card rounded-2xl p-8 md:p-12 border border-border shadow-medium mb-8 animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-primary/10 rounded-xl">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Help Us Build This Platform Together!
                </h2>
                <p className="text-muted-foreground">
                  This is a free platform created by students, for students
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Your Contribution Makes a Difference
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      RGU Hub is a completely free platform built to help nursing and physiotherapy students 
                      access quality study materials without any barriers. We believe in the power of community 
                      and collaboration.
                    </p>
                    <p className="text-foreground font-medium leading-relaxed">
                      If you have study materials, notes, PYQs, or any resources that could help your fellow 
                      students, we'd love to have your contribution! Every shared resource helps build a stronger 
                      learning community.
                    </p>
                  </div>
                </div>
              </div>

              

              {/* Contact Section */}
              <div className="bg-success/5 rounded-xl p-8 border border-success/20 shadow-medium">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-success/20 rounded-full mb-4">
                    <MessageCircle className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Have Study Materials to Share?
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    Contact our admin team via WhatsApp to contribute your study materials. 
                    Your help will make this platform even better for everyone!
                  </p>
                  <Button
                    size="lg"
                    className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-4 md:px-8 py-6 text-base md:text-lg rounded-xl shadow-medium w-full sm:w-auto"
                    onClick={() => {
                      window.open('https://wa.me/919605982147?text=Hi%20admin%2C%0AI%20have%20study%20material%20(notes%20%2B%20PYQs).%20Want%20to%20share%20with%20the%20community.%0AHow%20can%20I%20upload%2Fsend%20it%3F', '_blank');
                    }}
                  >
                    <Share2 className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span className="whitespace-nowrap">Contact Admin on WhatsApp</span>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Click the button above to open WhatsApp and start a conversation with our admin team
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center text-sm text-muted-foreground animate-fade-in">
            <p>
              We're constantly working to add more resources. Check back soon for updates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonNursing;

