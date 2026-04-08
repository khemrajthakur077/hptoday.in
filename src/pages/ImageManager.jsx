import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase Client Initialization
const supabase = createClient('https://vpyjwoprsncmgxkdiqij.supabase.co', 'sb_publishable_KcC3MV5XJpEzCk9wdP0KLQ_CRMiUWQM');

export default function ImageDashboard() {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);

  // 1. Fetch Images from Bucket
  const fetchImages = async () => {
    const { data, error } = await supabase.storage.from('images').list();
    if (data) setImages(data);
    if (error) console.log('Error fetching:', error);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // 2. Upload Image
  const uploadImage = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      alert('Photo upload ho gayi!');
      fetchImages(); // List refresh karne ke liye
    } catch (error) {
      alert('Upload fail: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // 3. Delete Image
  const deleteImage = async (fileName) => {
    const { error } = await supabase.storage
      .from('images')
      .remove([fileName]);

    if (error) {
      alert('Delete error: ' + error.message);
    } else {
      setImages(images.filter((img) => img.name !== fileName));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Media Dashboard</h2>
      
      {/* Upload Section */}
      <div className="mb-8 p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <input 
          type="file" 
          onChange={uploadImage} 
          disabled={uploading}
          accept="image/*"
        />
        <p className="mt-2 text-sm">{uploading ? 'Uploading...' : 'Koi bhi photo select karein'}</p>
      </div>

      {/* Image List Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((img) => {
          const publicUrl = supabase.storage.from('images').getPublicUrl(img.name).data.publicUrl;
          return (
            <div key={img.id} className="border p-2 rounded relative">
              <img src={publicUrl} alt="uploaded" className="w-full h-40 object-cover rounded" />
              <div className="mt-2 text-xs truncate">{publicUrl}</div>
              
              <button 
                onClick={() => deleteImage(img.name)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete Photo
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}