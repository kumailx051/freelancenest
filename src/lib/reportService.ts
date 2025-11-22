import { FirestoreService } from './firestoreService';

export interface ReportData {
  category: string;
  categoryLabel: string;
  userName: string;
  userEmail: string;
  reportSubject: string;
  reportDescription: string;
  urlLink?: string | null;
  attachments: string[];
  referenceNumber: string;
  status: 'submitted' | 'under_review' | 'resolved' | 'closed';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  assignedTo?: string | null;
  resolution?: string | null;
  submittedAt: Date;
  updatedAt: Date;
}

export class ReportService {
  private static readonly COLLECTION_NAME = 'reports';

  /**
   * Generate a unique reference number for a report
   */
  static generateReferenceNumber(): string {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `REP-${randomNum}-${year}`;
  }

  /**
   * Submit a new report
   */
  static async submitReport(reportData: Omit<ReportData, 'referenceNumber' | 'status' | 'priority' | 'submittedAt' | 'updatedAt'>): Promise<{ id: string; referenceNumber: string }> {
    try {
      const referenceNumber = this.generateReferenceNumber();
      
      const fullReportData: ReportData = {
        ...reportData,
        referenceNumber,
        status: 'submitted',
        priority: 'normal',
        assignedTo: null,
        resolution: null,
        submittedAt: new Date(),
        updatedAt: new Date()
      };

      const docId = await FirestoreService.create(this.COLLECTION_NAME, fullReportData);
      
      return { id: docId, referenceNumber };
    } catch (error) {
      console.error('Error submitting report:', error);
      throw new Error('Failed to submit report. Please try again.');
    }
  }

  /**
   * Get a report by reference number
   */
  static async getReportByReference(referenceNumber: string): Promise<ReportData | null> {
    try {
      const reports = await FirestoreService.getWhere(
        this.COLLECTION_NAME,
        'referenceNumber',
        '==',
        referenceNumber
      );
      
      return reports.length > 0 ? reports[0] as ReportData : null;
    } catch (error) {
      console.error('Error getting report by reference:', error);
      throw new Error('Failed to retrieve report.');
    }
  }

  /**
   * Get reports by email
   */
  static async getReportsByEmail(email: string): Promise<ReportData[]> {
    try {
      const reports = await FirestoreService.getWhere(
        this.COLLECTION_NAME,
        'userEmail',
        '==',
        email
      );
      
      return reports as ReportData[];
    } catch (error) {
      console.error('Error getting reports by email:', error);
      throw new Error('Failed to retrieve reports.');
    }
  }

  /**
   * Update report status (admin function)
   */
  static async updateReportStatus(
    reportId: string, 
    status: ReportData['status'], 
    assignedTo?: string,
    resolution?: string
  ): Promise<void> {
    try {
      const updateData: Partial<ReportData> = {
        status,
        updatedAt: new Date()
      };

      if (assignedTo !== undefined) {
        updateData.assignedTo = assignedTo;
      }

      if (resolution !== undefined) {
        updateData.resolution = resolution;
      }

      await FirestoreService.update(this.COLLECTION_NAME, reportId, updateData);
    } catch (error) {
      console.error('Error updating report status:', error);
      throw new Error('Failed to update report status.');
    }
  }

  /**
   * Get all reports (admin function)
   */
  static async getAllReports(): Promise<ReportData[]> {
    try {
      const reports = await FirestoreService.getMany(this.COLLECTION_NAME);
      return reports as ReportData[];
    } catch (error) {
      console.error('Error getting all reports:', error);
      throw new Error('Failed to retrieve reports.');
    }
  }

  /**
   * Get reports by status (admin function)
   */
  static async getReportsByStatus(status: ReportData['status']): Promise<ReportData[]> {
    try {
      const reports = await FirestoreService.getWhere(
        this.COLLECTION_NAME,
        'status',
        '==',
        status
      );
      
      return reports as ReportData[];
    } catch (error) {
      console.error('Error getting reports by status:', error);
      throw new Error('Failed to retrieve reports.');
    }
  }

  /**
   * Get reports by category
   */
  static async getReportsByCategory(category: string): Promise<ReportData[]> {
    try {
      const reports = await FirestoreService.getWhere(
        this.COLLECTION_NAME,
        'category',
        '==',
        category
      );
      
      return reports as ReportData[];
    } catch (error) {
      console.error('Error getting reports by category:', error);
      throw new Error('Failed to retrieve reports.');
    }
  }

  /**
   * Delete a report (admin function)
   */
  static async deleteReport(reportId: string): Promise<void> {
    try {
      await FirestoreService.delete(this.COLLECTION_NAME, reportId);
    } catch (error) {
      console.error('Error deleting report:', error);
      throw new Error('Failed to delete report.');
    }
  }
}