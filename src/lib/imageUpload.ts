/**
 * Image Upload Utilities
 * Handles image uploads to ImageBB API with validation and error handling
 */

export interface ImageUploadOptions {
  maxSizeInMB?: number;
  allowedTypes?: string[];
  quality?: number;
}

export interface ImageUploadResult {
  url: string;
  deleteUrl?: string;
  thumbnailUrl?: string;
}

export class ImageUploadError extends Error {
  public code?: string;
  
  constructor(message: string, code?: string) {
    super(message);
    this.name = 'ImageUploadError';
    this.code = code;
  }
}

export class ImageUploadService {
  private static readonly DEFAULT_OPTIONS: Required<ImageUploadOptions> = {
    maxSizeInMB: 5,
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    quality: 100
  };

  private static readonly API_KEY = import.meta.env.VITE_IMGBB_API_KEY || 'af89815a37ad8b0ac30f6e34839d6735';

  /**
   * Validates an image file before upload
   */
  static validateImageFile(file: File, options: ImageUploadOptions = {}): void {
    const opts = { ...this.DEFAULT_OPTIONS, ...options };

    // Check file type
    if (!opts.allowedTypes.includes(file.type)) {
      throw new ImageUploadError(
        `Invalid file type. Allowed types: ${opts.allowedTypes.join(', ')}`,
        'INVALID_FILE_TYPE'
      );
    }

    // Check file size
    const maxSizeInBytes = opts.maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      throw new ImageUploadError(
        `File size too large. Maximum size: ${opts.maxSizeInMB}MB`,
        'FILE_TOO_LARGE'
      );
    }
  }

  /**
   * Uploads an image to ImageBB
   */
  static async uploadToImageBB(
    file: File, 
    options: ImageUploadOptions = {}
  ): Promise<ImageUploadResult> {
    // Validate the file first
    this.validateImageFile(file, options);

    if (!this.API_KEY) {
      throw new ImageUploadError(
        'ImageBB API key not configured. Please add VITE_IMGBB_API_KEY to your environment variables.',
        'MISSING_API_KEY'
      );
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${this.API_KEY}`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ImageUploadError(
          errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`,
          'UPLOAD_FAILED'
        );
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new ImageUploadError(
          data.error?.message || 'Upload failed',
          'UPLOAD_FAILED'
        );
      }

      return {
        url: data.data.url,
        deleteUrl: data.data.delete_url,
        thumbnailUrl: data.data.thumb?.url
      };
    } catch (error) {
      if (error instanceof ImageUploadError) {
        throw error;
      }
      
      // Network or other errors
      throw new ImageUploadError(
        'Failed to upload image. Please check your internet connection and try again.',
        'NETWORK_ERROR'
      );
    }
  }

  /**
   * Creates a preview URL for a file
   */
  static createPreviewUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  /**
   * Revokes a preview URL to free up memory
   */
  static revokePreviewUrl(url: string): void {
    URL.revokeObjectURL(url);
  }

  /**
   * Compresses an image file (basic implementation)
   */
  static async compressImage(file: File, quality: number = 0.8): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions (you can add more sophisticated resizing logic here)
        const maxWidth = 1200;
        const maxHeight = 1200;
        
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          file.type,
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }
}

// Export convenient helper functions
export const uploadImage = ImageUploadService.uploadToImageBB.bind(ImageUploadService);
export const validateImage = ImageUploadService.validateImageFile.bind(ImageUploadService);
export const createPreview = ImageUploadService.createPreviewUrl.bind(ImageUploadService);
export const revokePreview = ImageUploadService.revokePreviewUrl.bind(ImageUploadService);
export const compressImage = ImageUploadService.compressImage.bind(ImageUploadService);