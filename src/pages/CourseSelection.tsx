import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, HeartPulse, ArrowRight, ArrowLeft } from "lucide-react";

type Course = {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	icon: typeof BookOpen;
	path: string;
	comingSoon?: boolean;
};

const courses: Course[] = [
	{
		id: "bsc-nursing",
		title: "BSC Nursing",
		subtitle: "Semester-wise scheme",
		description:
			"Navigate by semester. The curriculum is consolidated to a single semester-wise scheme.",
		icon: BookOpen,
		path: "/coming-soon-nursing",
		comingSoon: true,
	},
	{
		id: "bsc-physiotherapy",
		title: "Bachelor of Physiotherapy",
		subtitle: "RS5 Scheme",
		description:
			"Curriculum follows RS5 scheme. Proceed to select semester to continue.",
		icon: HeartPulse,
		path: "/year",
	},
];

const CourseSelection = () => {
	const navigate = useNavigate();

	// Production: avoid noisy console logs

	// Log back navigation
	const handleBack = () => {
		navigate('/');
	};

	// Log course selection and navigation
	const handleCourseSelect = (course: Course) => {
		const courseCode = course.id === 'bsc-nursing' ? 'BN' : 'BPT';
		navigate(course.path, { state: { course: courseCode } });
	};

	return (
		<div className="min-h-screen bg-gradient-hero">
			<AppHeader />
			<main className="container mx-auto px-4 pt-0 pb-6">
				<Breadcrumbs
					items={[
						{ label: "Select Course" },
					]}
				/>

				<div className="mt-3 mb-6 animate-fade-in">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="px-3 py-1  text-black text-sm font-semibold mb-5 border-[0.7px] border-black/20 shadow-nav  rounded-"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Button>
					<h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
						Select Your Course
					</h1>
					<p className="text-muted-foreground">
						Choose your course to access the relevant curriculum and study
						materials.
					</p>
				</div>

				<section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto animate-fade-in" aria-label="Available courses">
					{courses.map((course) => (
						<Card
							key={course.id}
							className={`p-6 hover:shadow-lg transition-all cursor-pointer group ${
								course.comingSoon 
									? 'bg-gradient-card border border-success/30 hover:border-success/40' 
									: 'bg-gradient-card border-border hover:border-primary'
							}`}
							onClick={() => handleCourseSelect(course)}
						>
							<div className="flex items-start space-x-4">
								<div className={`p-3 rounded-xl transition-colors ${
									course.comingSoon 
										? 'bg-success/10 group-hover:bg-success/15' 
										: 'bg-primary/10 group-hover:bg-primary/20'
								}`}>
									<course.icon className={`w-8 h-8 ${
										course.comingSoon ? 'text-success' : 'text-primary'
									}`} />
								</div>
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-1">
										<h3 className="text-xl font-bold mb-1 text-foreground">
											{course.title}
										</h3>
									</div>
									<p className={`text-sm font-medium mb-2 ${
										course.comingSoon ? 'text-success' : 'text-primary'
									}`}>
										{course.subtitle}
									</p>
									<p className="text-sm text-muted-foreground">
										{course.description}
									</p>
								</div>
								<ArrowRight className={`w-5 h-5 transition-colors mt-1 ${
									course.comingSoon 
										? 'text-success/70 group-hover:text-success' 
										: 'text-muted-foreground group-hover:text-primary'
								}`} />
							</div>
						</Card>
					))}
				</section>

				<aside className="mt-12 max-w-2xl mx-auto text-center animate-fade-in">
					<div className="p-6 rounded-xl">
						<h3 className="font-semibold text-foreground mb-2">
							Not sure which course to select?
						</h3>
						<p className="text-sm text-muted-foreground">
							Select BSC Nursing if you are a nursing student under Rajeev Gandhi University of Health Science with semester wise scheme. Year wise scheme study materials are not currently available.
							<br />
							Select Physiotherapy if you are a physiotherapy student under Rajeev Gandhi University of Health Science with RS5 scheme. Schemes older than RS5 are not currently available.
							<br />
							
						</p>
					</div>
				</aside>
			</main>
		</div>
	);
};

export default CourseSelection;