import {
  collection,
  doc,
  addDoc,
  setDoc,
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

  // Create a document with a specific ID
  static async createWithId(collectionName: string, docId: string, data: DocumentData): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error creating document with ID:', error);
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

  // User-specific methods
  static async getUser(userId: string): Promise<DocumentData | null> {
    try {
      // First try to get by document ID (which should be the user ID)
      const userDoc = await this.get('users', userId);
      if (userDoc) {
        return userDoc;
      }
      
      // Fallback to querying by uid field for existing users
      const userDocs = await this.getWhere('users', 'uid', '==', userId);
      if (userDocs.length > 0) {
        return userDocs[0];
      }
      
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  static async updateUser(userId: string, data: Partial<DocumentData>): Promise<void> {
    try {
      // Try to update using userId as document ID first
      const userExists = await this.exists('users', userId);
      if (userExists) {
        await this.update('users', userId, data);
        return;
      }
      
      // Fallback to the old method for existing users with random document IDs
      const userDocs = await this.getWhere('users', 'uid', '==', userId);
      if (userDocs.length > 0) {
        await this.update('users', userDocs[0].id, data);
        return;
      }
      
      throw new Error('User not found');
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Client Jobs specific methods
  static async createClientJob(jobData: any): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'clientJobs'), {
        ...jobData,
        status: 'draft', // Start as draft
        applicants: [],
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating client job:', error);
      throw error;
    }
  }

  static async updateClientJob(jobId: string, jobData: Partial<any>): Promise<void> {
    try {
      const docRef = doc(db, 'clientJobs', jobId);
      await updateDoc(docRef, {
        ...jobData,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating client job:', error);
      throw error;
    }
  }

  static async getClientJob(jobId: string): Promise<DocumentData | null> {
    return this.get('clientJobs', jobId);
  }

  static async getClientJobs(clientId: string): Promise<DocumentData[]> {
    try {
      // First try with orderBy
      return await this.getMany('clientJobs', [
        where('clientId', '==', clientId),
        orderBy('createdAt', 'desc')
      ]);
    } catch (error) {
      console.warn('Failed to query with orderBy, trying without:', error);
      // If orderBy fails (likely due to missing index), try without ordering
      try {
        const jobs = await this.getMany('clientJobs', [
          where('clientId', '==', clientId)
        ]);
        // Sort manually by createdAt if the field exists
        return jobs.sort((a, b) => {
          const aDate = a.createdAt?.toDate?.() || new Date(0);
          const bDate = b.createdAt?.toDate?.() || new Date(0);
          return bDate.getTime() - aDate.getTime();
        });
      } catch (innerError) {
        console.error('Failed to query clientJobs:', innerError);
        throw innerError;
      }
    }
  }

  static async publishClientJob(jobId: string): Promise<void> {
    try {
      const docRef = doc(db, 'clientJobs', jobId);
      await updateDoc(docRef, {
        status: 'active',
        publishedAt: new Date(),
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error publishing client job:', error);
      throw error;
    }
  }

  // Client Settings operations
  static async getClientSettings(clientId: string) {
    try {
      const settings = await this.get('clientSettings', clientId);
      return settings;
    } catch (error) {
      console.error('Error getting client settings:', error);
      return null;
    }
  }

  static async saveClientSettings(clientId: string, settings: any) {
    try {
      const settingsData = {
        ...settings,
        clientId,
        updatedAt: new Date()
      };
      
      // Check if settings document exists
      const exists = await this.exists('clientSettings', clientId);
      
      if (exists) {
        await this.update('clientSettings', clientId, settingsData);
      } else {
        await this.createWithId('clientSettings', clientId, settingsData);
      }
    } catch (error) {
      console.error('Error saving client settings:', error);
      throw error;
    }
  }
}

// Example usage functions for your freelance platform
export class FreelanceFirestoreService extends FirestoreService {
  // User profile operations
  static async createUserProfile(userId: string, profileData: any) {
    // Use the user's UID as the document ID in the users collection
    console.log('Creating user profile with document ID:', userId);
    await this.createWithId('users', userId, { uid: userId, ...profileData });
    console.log('User profile created successfully in Firestore with document ID:', userId);
    return userId; // Return the document ID (which is the user ID)
  }

  static async getUserProfile(userId: string) {
    // First try to get by document ID (which should be the user ID)
    console.log('Looking for user profile with document ID:', userId);
    const userDoc = await this.get('users', userId);
    if (userDoc) {
      console.log('Found user profile by document ID:', userId);
      return [userDoc]; // Return as array to maintain compatibility
    }
    
    // Fallback to querying by uid field for existing users
    console.log('User not found by document ID, searching by uid field:', userId);
    const userProfiles = await this.getWhere('users', 'uid', '==', userId);
    console.log('Found user profiles by uid query:', userProfiles.length);
    return userProfiles;
  }

  static async updateUserProfile(userId: string, updates: any) {
    // Try to update using userId as document ID first
    const userExists = await this.exists('users', userId);
    if (userExists) {
      return this.update('users', userId, updates);
    }
    
    // Fallback to the old method for existing users with random document IDs
    const userDocs = await this.getWhere('users', 'uid', '==', userId);
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

  // Helper method to get user profile directly by document ID
  static async getUserProfileById(userId: string) {
    return this.get('users', userId);
  }
}
