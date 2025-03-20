import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { FileUploadState } from "@/lib/types";
import { Upload, X, AlertTriangle, Cog } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FileUploadSectionProps {
  fileUploadState: FileUploadState;
  onFileUpload: (files: File[]) => void;
  onReset: () => void;
  error: string | null;
}

export default function FileUploadSection({
  fileUploadState,
  onFileUpload,
  onReset,
  error
}: FileUploadSectionProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileUpload(acceptedFiles);
  }, [onFileUpload]);

  const { 
    getRootProps, 
    getInputProps, 
    isDragActive 
  } = useDropzone({ 
    onDrop,
    accept: {
      'application/json': ['.json']
    },
    disabled: fileUploadState !== "idle",
    maxFiles: 1
  });

  return (
    <section id="upload-section" className="py-10 mb-20">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Upload Your Instagram Data</h2>
        <p className="text-[#8E8E8E]">We analyze your data privately in your browser - nothing is stored on our servers</p>
      </div>

      {/* Initial upload area */}
      {fileUploadState === "idle" && (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed ${
            isDragActive ? "border-[#833AB4] bg-gray-50" : "border-gray-300"
          } rounded-xl bg-white p-8 text-center transition-all hover:border-[#833AB4] cursor-pointer`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-[#EFEFEF] rounded-full flex items-center justify-center">
              <Upload className="h-6 w-6 text-[#8E8E8E]" />
            </div>
            <div>
              <p className="font-medium">Drag and drop your Instagram data file here</p>
              <p className="text-[#8E8E8E] text-sm mt-1">or click to browse files</p>
            </div>
            <div className="text-xs text-[#8E8E8E] pt-4 border-t border-gray-200 max-w-md mx-auto">
              <p>Supported files: followers_and_following.json or followers.json and following.json</p>
            </div>
            <div>
              <Button 
                className="mt-4 bg-[#EFEFEF] text-[#262626] hover:bg-gray-200 border-0" 
                type="button"
              >
                Select File
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Uploading state */}
      {fileUploadState === "uploading" && (
        <div className="border-2 border-gray-300 rounded-xl bg-white p-8 text-center">
          <div className="space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-gray-200 rounded-full border-t-[#833AB4] animate-spin"></div>
            </div>
            <div>
              <p className="font-medium">Uploading file...</p>
              <div className="w-full max-w-md mx-auto mt-4">
                <Progress value={50} className="h-2.5 bg-gray-200" />
              </div>
              <p className="text-[#8E8E8E] text-sm mt-2">50% complete</p>
            </div>
            <div>
              <Button 
                variant="ghost" 
                className="text-[#8E8E8E] hover:text-[#262626]"
                onClick={onReset}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Processing state */}
      {fileUploadState === "processing" && (
        <div className="border-2 border-gray-300 rounded-xl bg-white p-8 text-center">
          <div className="space-y-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] rounded-full flex items-center justify-center">
              <Cog className="h-6 w-6 text-white animate-spin" />
            </div>
            <div>
              <p className="font-medium">Processing your data...</p>
              <p className="text-[#8E8E8E] text-sm mt-1">We're analyzing your followers and following lists</p>
              <div className="w-full max-w-md mx-auto mt-4">
                <Progress value={75} className="h-2.5 bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error state */}
      {fileUploadState === "error" && (
        <div className="border-2 border-red-200 rounded-xl bg-red-50 p-8 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="font-medium text-red-700">There was an error processing your file</p>
              <p className="text-red-600 text-sm mt-1">{error || "The file format isn't supported. Please upload the correct Instagram data file."}</p>
            </div>
            <div>
              <Button 
                variant="outline"
                className="mt-4 bg-white border border-gray-300 text-[#262626] hover:bg-gray-100"
                onClick={onReset}
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
