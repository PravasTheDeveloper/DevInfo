import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

const ImageCrop = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [editor, setEditor] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  const handleCrop = async () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const resizedDataURL = canvas.toDataURL();
      const blob = await fetch(resizedDataURL).then((r) => r.blob());

      const formData = new FormData();
      formData.append('image', blob);

      await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('Image uploaded');
    }
  };

  return (
    <div>
      <div
        className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {selectedFile && (
          <div>
            <AvatarEditor
              ref={(ref) => setEditor(ref)}
              image={selectedFile}
              width={200}
              height={200}
              border={50}
              color={[255, 255, 255, 0.6]}
              scale={1.2}
            />
            <button onClick={handleCrop}>Crop and Save Avatar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCrop;