
import jsPDF from 'jspdf';

export interface AttestationData {
  firstName: string;
  lastName: string;
  email: string;
  projectTitle?: string;
  grade?: number;
}

export const generateAttestationPDF = (intern: AttestationData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = 30;

  // En-tête avec logos
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('REPOBLIKAN\'I MADAGASIKARA', pageWidth / 2, 15, { align: 'center' });
  doc.text('Fitiavana - Tanindrazana - Fandrosoana', pageWidth / 2, 25, { align: 'center' });
  
  // Logo placeholder (vous pouvez ajouter une vraie image ici)
  doc.setFontSize(8);
  doc.text('🇲🇬', pageWidth / 2 - 10, 35, { align: 'center' });
  
  yPosition = 50;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('MINISTERE DU TRAVAIL, DE L\'EMPLOI', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;
  doc.text('ET DE LA FONCTION PUBLIQUE', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 20;
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  
  yPosition += 15;
  doc.text('SECRETARIAT GENERAL', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  
  yPosition += 15;
  doc.text('DIRECTION DU SYSTEME D\'INFORMATION', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 20;
  doc.text(`N°............. ${new Date().getFullYear()}/MTeFoP/SG/DSI`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 30;
  
  // Titre principal
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ATTESTATION DE STAGE', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 30;
  
  // Corps du texte
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const introText = `Nous soussigné, la Direction du Système d'Information du Ministère du Travail de l'Emploi et de la Fonction Publique, certifie que :`;
  doc.text(introText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
  
  yPosition += 25;
  
  // Nom du stagiaire
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`${intern.firstName} ${intern.lastName}`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 25;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  
  const stageText = `a effectué avec succès un stage au sein de notre Direction, Service d'Appui à l'Informatisation de l'Administration,`;
  doc.text(stageText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
  
  yPosition += 20;
  
  if (intern.projectTitle) {
    const projectText = `dans le cadre du projet "${intern.projectTitle}".`;
    doc.text(projectText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
    yPosition += 20;
  }
  
  if (intern.grade) {
    yPosition += 10;
    const evaluationText = `Le stagiaire a obtenu la note de ${intern.grade}/20 lors de son évaluation finale.`;
    doc.text(evaluationText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
    yPosition += 15;
  }
  
  yPosition += 10;
  const validationText = `La présente attestation lui est délivrée pour servir et valoir ce que de droit.`;
  doc.text(validationText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
  
  // Signature et date
  yPosition = pageHeight - 80;
  doc.text('Le Directeur du Système d\'Information', margin + 50, yPosition);
  doc.text(`Antananarivo, le ${new Date().toLocaleDateString('fr-FR')}`, pageWidth - margin - 80, yPosition);
  
  // Télécharger le PDF
  const fileName = `attestation_stage_${intern.firstName}_${intern.lastName}_${new Date().getFullYear()}.pdf`;
  doc.save(fileName);
};
