
import { useState, useEffect } from "react";
import { RecruitmentCard } from "@/components/RecruitmentCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, ArrowLeft } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/config/api";


type RecruitmentApiType = {
  id: number;
  program_name: string;
  company_name: string;
  position: string;
  location: string;
  job_type: 'FT' | 'PT' | 'IN';
  description: string;
  requirements: string;
  salary?: string | null;
  deadline: string;
  apply_link: string;
  posted_on: string;
  program: number;
};


const classifyBranch = (programName: string): 'bsc-nursing' | 'bsc-physiotherapy' => {
  if (programName.toLowerCase().includes('nursing')) return 'bsc-nursing';
  return 'bsc-physiotherapy';
};


const Recruitment = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'bsc-nursing' | 'bsc-physiotherapy'>('all');
  const [recruitmentData, setRecruitmentData] = useState<(RecruitmentApiType & { branch: 'bsc-nursing' | 'bsc-physiotherapy' })[]>([]);
  const [activeJobsCount, setActiveJobsCount] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE_URL}/recruitments/`)
      .then(res => res.json())
      .then(data => {
        // If API returns { results: [...] }
        const jobs = (data.results ?? data).map((job: RecruitmentApiType) => ({
          ...job,
          branch: classifyBranch(job.program_name)
        }));
        setRecruitmentData(jobs);
        setActiveJobsCount(jobs.length);
      });
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  const filteredJobs = recruitmentData
    .filter(job => job.branch === 'bsc-nursing' || job.branch === 'bsc-physiotherapy')
    .filter(job => {
      if (filter === 'all') return true;
      return job.branch === filter;
    });

  return (
    <div className="min-h-screen bg-gradient-hero">
      <AppHeader />
      <div className="container mx-auto px-4 pb-8">
        <Breadcrumbs items={[{ label: "Recruitment" }]} />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="mt-3 px-3 py-1 text-black text-sm font-semibold mb-5 border-[0.7px] border-black/20 shadow-nav rounded-"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Button>
        <div className="text-center mb-8 animate-fade-in pt-0">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Recruitment Portal
          </h1>
          <p className="text-muted-foreground">
            Find placements and internship opportunities
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-lg">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm font-medium text-success">{activeJobsCount} Active Opportunities</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="gap-2"
          >
            <Users className="w-4 h-4" />
            All Branches
          </Button>
          <Button
            variant={filter === 'bsc-nursing' ? 'default' : 'outline'}
            onClick={() => setFilter('bsc-nursing')}
            className="gap-2"
          >
            <GraduationCap className="w-4 h-4" />
            BSc Nursing
          </Button>
          <Button
            variant={filter === 'bsc-physiotherapy' ? 'default' : 'outline'}
            onClick={() => setFilter('bsc-physiotherapy')}
            className="gap-2"
          >
            <GraduationCap className="w-4 h-4" />
            BSc Physiotherapy
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredJobs.map(job => (
            <RecruitmentCard
              key={job.id}
              companyName={job.company_name}
              position={job.position}
              location={job.location}
              jobType={job.job_type}
              description={job.description}
              requirements={job.requirements}
              salary={job.salary ?? ''}
              deadline={job.deadline}
              applyLink={job.apply_link}
              postedOn={job.posted_on}
              branch={job.branch}
            />
          ))}
        </div>
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No opportunities found for the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recruitment;