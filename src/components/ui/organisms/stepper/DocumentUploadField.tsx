import Image from 'next/image';
import { FaFileUpload } from 'react-icons/fa';

type DocumentUploadFieldProps = {
  file: File | null;
  label: string;
  onChange: (file: File | null) => void;
  className?: string;
};

export default function DocumentUploadField({
  file,
  label,
  onChange,
  className = ''
}: DocumentUploadFieldProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      onChange(event.target.files[0]);
    }
  };

  return (
    <div
      className={`relative flex h-44 w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white text-center text-gray-800 md:h-32 md:bg-blue-50 md:text-gray-500 ${className}`}
    >
      {file ? (
        <Image
          src={URL.createObjectURL(file)}
          alt={`Uploaded ${label}`}
          className="size-full rounded-lg object-cover"
          width={100}
          height={100}
        />
      ) : (
        <>
          <FaFileUpload className="mb-2 size-5" />
          <p className="text-base">Upload {label}</p>
          <p className="text-xs">JPEG, PNG, or PDF only</p>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 size-full cursor-pointer opacity-0"
        onChange={handleFileChange}
      />
    </div>
  );
}
