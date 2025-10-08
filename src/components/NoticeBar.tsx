import { Bell, AlertCircle, BookOpen } from "lucide-react";

const notices = [
  { icon: BookOpen, text: "New: July 2024 PYQ for 2nd Year added" },
  { icon: AlertCircle, text: "Nursing Research notes updated on Aug 20, 2025" },
  { icon: Bell, text: "4th Year Clinical Logbook format available now" },
  { icon: BookOpen, text: "Community Health Nursing practical guide uploaded" },
];

export const NoticeBar = () => {
  return (
    <div className="bg-primary/70 text-black/70 py-2 overflow-hidden shadow-nav">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...notices, ...notices].map((notice, index) => (
          <div key={index} className="inline-flex items-center mx-8">
            <notice.icon className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{notice.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};