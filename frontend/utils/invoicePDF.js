import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateInvoicePDF = (invoice) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('INVOICE', 105, 20, { align: 'center' });
  
  // Invoice details
  doc.setFontSize(12);
  doc.text(`Invoice ID: ${invoice.invoiceId}`, 20, 40);
  doc.text(`Issue Date: ${new Date(invoice.issueDate).toLocaleDateString()}`, 20, 50);
  doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, 20, 60);
  
  // Client details
  doc.text(`Client: ${invoice.client.name}`, 120, 40);
  if (invoice.client.company) {
    doc.text(`Company: ${invoice.client.company}`, 120, 50);
  }
  doc.text(`Email: ${invoice.client.email}`, 120, 60);
  
  // Project details
  doc.text(`Project: ${invoice.project.title}`, 20, 80);
  
  // Table
  doc.autoTable({
    startY: 100,
    head: [['Description', 'Amount']],
    body: [
      ['Project Payment', `$${invoice.amount.toFixed(2)}`],
    ],
    theme: 'striped',
  });
  
  // Total
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.text(`Total: $${invoice.amount.toFixed(2)}`, 150, finalY);
  
  // Status
  doc.setFontSize(12);
  doc.setTextColor(invoice.status === 'paid' ? 0, 150, 0 : 200, 0, 0);
  doc.text(`Status: ${invoice.status.toUpperCase()}`, 20, finalY + 10);
  
  // Save
  doc.save(`invoice-${invoice.invoiceId}.pdf`);
};

