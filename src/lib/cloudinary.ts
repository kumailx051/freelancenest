import { Cloudinary } from '@cloudinary/url-gen';

export const cld = new Cloudinary({ 
  cloud: { 
    cloudName: 'donluyg6g' 
  } 
});

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default'); // Using default unsigned preset
  formData.append('cloud_name', 'donluyg6g');

  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/donluyg6g/auto/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    }
    throw new Error('Upload failed');
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};
