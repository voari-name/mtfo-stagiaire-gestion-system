
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ProjectData } from "@/hooks/useProjectsData";

interface ProjectCardProps {
  project: ProjectData;
  progress: number;
  onViewDetails: (project: ProjectData) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  progress, 
  onViewDetails 
}) => {
  // Safety check for interns array
  const firstIntern = project.interns && project.interns.length > 0 ? project.interns[0] : null;
  const hasCompletedInterns = project.interns && project.interns.some(intern => intern.status === "fin");
  const hasActiveInterns = project.interns && project.interns.some(intern => intern.status === "en cours");
  
  const getProjectStatus = () => {
    if (!project.interns || project.interns.length === 0) return "Aucun stagiaire";
    if (hasCompletedInterns && !hasActiveInterns) return "Terminé";
    return "En cours";
  };

  return (
    <Card key={project.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <Badge variant={hasCompletedInterns && !hasActiveInterns ? "outline" : "default"}>
            {getProjectStatus()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Période</p>
            <p className="font-medium">
              {new Date(project.startDate).toLocaleDateString('fr-FR')} au {new Date(project.endDate).toLocaleDateString('fr-FR')}
            </p>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-muted-foreground">Progression</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Stagiaires assignés</p>
            <div className="space-y-2">
              {project.interns && project.interns.length > 0 ? (
                project.interns.map(intern => (
                  <div key={intern.id} className="flex items-center justify-between">
                    <span className="text-sm">{intern.name}</span>
                    <Badge variant="outline" className={
                      intern.status === 'fin' ? 'border-green-500 text-green-700 bg-green-50' : 
                      intern.status === 'en cours' ? 'border-blue-500 text-blue-700 bg-blue-50' : 
                      'border-amber-500 text-amber-700 bg-amber-50'
                    }>
                      {intern.status === 'fin' ? 'Terminé' : 
                       intern.status === 'en cours' ? 'En cours' : 'À commencer'}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Aucun stagiaire assigné</p>
              )}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => onViewDetails(project)}
          >
            Voir les détails
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
