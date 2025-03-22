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
        <h2 className="text-2xl font-bold text-[var(--main-0)]">Upload Your Instagram Data</h2>
        <p className="text-[var(--main-2)]">We analyze your data privately in your browser - nothing is stored on our servers</p>
      </div>

      {/* Initial upload area */}
      {fileUploadState === "idle" && (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed ${
            isDragActive ? "border-[var(--main-5)] bg-[var(--main-1)]/10" : "border-[var(--main-1)]"
          } rounded-xl bg-white p-8 text-center transition-all hover:border-[var(--main-5)] cursor-pointer`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-[var(--main-1)] rounded-full flex items-center justify-center">
              <Upload className="h-6 w-6 text-[var(--main-3)]" />
            </div>
            <div>
              <p className="font-medium text-[var(--main-0)]">Drag and drop your Instagram data file here</p>
              <p className="text-[var(--main-2)] text-sm mt-1">or click to browse files</p>
            </div>
            <div className="text-xs text-[var(--main-2)] pt-4 border-t border-[var(--main-1)] max-w-md mx-auto">
              <p>Supported files: followers_and_following.json or followers.json and following.json</p>
            </div>
            <div>
              <Button 
                className="mt-4 bg-[var(--main-5)] text-[var(--main-1)] hover:bg-[var(--main-3)] border-0" 
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
        <div className="border-2 border-[var(--main-1)] rounded-xl bg-white p-8 text-center">
          <div className="space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[var(--main-1)] rounded-full border-t-[var(--main-5)] animate-spin"></div>
            </div>
            <div>
              <p className="font-medium text-[var(--main-0)]">Uploading file...</p>
              <div className="w-full max-w-md mx-auto mt-4">
                <Progress value={50} className="h-2.5 bg-[var(--main-1)]" />
              </div>
              <p className="text-[var(--main-2)] text-sm mt-2">50% complete</p>
            </div>
            <div>
              <Button 
                variant="ghost" 
                className="text-[var(--main-2)] hover:text-[var(--main-0)]"
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
        <div className="border-2 border-[var(--main-1)] rounded-xl bg-white p-8 text-center">
          <div className="space-y-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[var(--main-3)] via-[var(--main-5)] to-[var(--main-6)] rounded-full flex items-center justify-center">
              <Cog className="h-6 w-6 text-[var(--main-1)] animate-spin" />
            </div>
            <div>
              <p className="font-medium text-[var(--main-0)]">Processing your data...</p>
              <p className="text-[var(--main-2)] text-sm mt-1">We're analyzing your followers and following lists</p>
              <div className="w-full max-w-md mx-auto mt-4">
                <Progress value={75} className="h-2.5 bg-[var(--main-1)]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error state */}
      {fileUploadState === "error" && (
        <div className="border-2 border-[var(--main-7)]/30 rounded-xl bg-[var(--main-7)]/10 p-8 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-[var(--main-7)]/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-[var(--main-7)]" />
            </div>
            <div>
              <p className="font-medium text-[var(--main-7)]">There was an error processing your file</p>
              <p className="text-[var(--main-7)]/80 text-sm mt-1">{error || "The file format isn't supported. Please upload the correct Instagram data file."}</p>
            </div>
            <div>
              <Button 
                variant="outline"
                className="mt-4 bg-white border border-[var(--main-1)] text-[var(--main-0)] hover:bg-[var(--main-1)]/10"
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
