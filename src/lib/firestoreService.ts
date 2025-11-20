import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  type DocumentData,
  type QueryConstraint
} from 'firebase/firestore';
import { db } from './firebase';

export class FirestoreService {
  // Create a new document
  static async create(collectionName: string, data: DocumentData): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }

  // Get a single document by ID
  static async get(collectionName: string, docId: string): Promise<DocumentData | null> {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  }

  // Get multiple documents with optional queries
  static async getMany(
    collectionName: string,
    queries: QueryConstraint[] = []
  ): Promise<DocumentData[]> {
    try {
      const collectionRef = collection(db, collectionName);
      const q = queries.length > 0 ? query(collectionRef, ...queries) : collectionRef;
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
    }
  }

  // Update a document
  static async update(collectionName: string, docId: string, data: Partial<DocumentData>): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  // Delete a document
  static async delete(collectionName: string, docId: string): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }

  // Get documents where field equals value
  static async getWhere(
    collectionName: string,
    field: string,
    operator: '<' | '<=' | '==' | '!=' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in',
    value: any
  ): Promise<DocumentData[]> {
    return this.getMany(collectionName, [where(field, operator, value)]);
  }

  // Get documents with pagination
  static async getPaginated(
    collectionName: string,
    limitCount: number,
    orderByField?: string,
    orderDirection: 'asc' | 'desc' = 'asc'
  ): Promise<DocumentData[]> {
    const queries: QueryConstraint[] = [];
    
    if (orderByField) {
      queries.push(orderBy(orderByField, orderDirection));
    }
    
    queries.push(limit(limitCount));
    
    return this.getMany(collectionName, queries);
  }

  // Check if document exists
  static async exists(collectionName: string, docId: string): Promise<boolean> {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    } catch (error) {
      console.error('Error checking document existence:', error);
      throw error;
    }
  }
}

// Example usage functions for your freelance platform
export class FreelanceFirestoreService extends FirestoreService {
  // User profile operations
  static async createUserProfile(userId: string, profileData: any) {
    return this.create('users', { uid: userId, ...profileData });
  }

  static async getUserProfile(userId: string) {
    return this.getWhere('users', 'uid', '==', userId);
  }

  static async updateUserProfile(userId: string, updates: any) {
    const userDocs = await this.getUserProfile(userId);
    if (userDocs.length > 0) {
      return this.update('users', userDocs[0].id, updates);
    }
    throw new Error('User profile not found');
  }

  // Job operations
  static async createJob(jobData: any) {
    return this.create('jobs', jobData);
  }

  static async getActiveJobs() {
    return this.getWhere('jobs', 'status', '==', 'active');
  }

  static async getJobsByCategory(category: string) {
    return this.getWhere('jobs', 'category', '==', category);
  }

  // Proposal operations
  static async createProposal(proposalData: any) {
    return this.create('proposals', proposalData);
  }

  static async getProposalsByFreelancer(freelancerId: string) {
    return this.getWhere('proposals', 'freelancerId', '==', freelancerId);
  }

  static async getProposalsByJob(jobId: string) {
    return this.getWhere('proposals', 'jobId', '==', jobId);
  }

  // Portfolio operations
  static async updateUserPortfolio(userId: string, portfolioData: any[]) {
    const portfolioUpdate = {
      portfolio: portfolioData,
      portfolioItemsCount: portfolioData.length,
      lastPortfolioUpdate: new Date()
    };
    return this.updateUserProfile(userId, portfolioUpdate);
  }

  static async getUserPortfolio(userId: string) {
    const userProfiles = await this.getUserProfile(userId);
    if (userProfiles.length > 0 && userProfiles[0].portfolio) {
      return userProfiles[0].portfolio;
    }
    return [];
  }
}
