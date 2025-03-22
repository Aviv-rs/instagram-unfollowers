import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FileUploadSection from "@/components/FileUploadSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { InstagramData, Unfollower, FileUploadState } from "@/lib/types";
import ResultsSection from "@/components/ResultsSection";
import { parseInstagramData } from "@/lib/instagram-parser";

export default function Home() {
  const [fileUploadState, setFileUploadState] = useState<FileUploadState>("idle");
  const [instagramData, setInstagramData] = useState<InstagramData | null>(null);
  const [unfollowers, setUnfollowers] = useState<Unfollower[]>([]);
  const [notFollowingBack, setNotFollowingBack] = useState<Unfollower[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"unfollowers" | "notFollowingBack" | "newFollowers">("unfollowers");

  const handleFileUpload = async (files: File[]) => {
    if (files.length === 0) return;
    
    try {
      setFileUploadState("uploading");
      
      // Simulate upload progress
      setTimeout(() => {
        setFileUploadState("processing");
        
        // Process the file
        const file = files[0];
        const reader = new FileReader();
        
        reader.onload = async (e) => {
          try {
            const fileContent = e.target?.result as string;
            
            // Parse the JSON data
            const parsedData = await parseInstagramData(fileContent);
            setInstagramData(parsedData.data);
            setUnfollowers(parsedData.unfollowers);
            setNotFollowingBack(parsedData.notFollowingBack);
            
            setFileUploadState("complete");
          } catch (err) {
            console.error("Error processing file:", err);
            setError("Could not process the file. Make sure it's a valid Instagram data file.");
            setFileUploadState("error");
          }
        };
        
        reader.onerror = () => {
          setError("Error reading the file. Please try again.");
          setFileUploadState("error");
        };
        
        reader.readAsText(file);
      }, 1500);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("An error occurred while uploading the file. Please try again.");
      setFileUploadState("error");
    }
  };

  const resetUpload = () => {
    setFileUploadState("idle");
    setError(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl flex-grow">
        <HeroSection />
        <FileUploadSection 
          fileUploadState={fileUploadState}
          onFileUpload={handleFileUpload}
          onReset={resetUpload}
          error={error}
        />
        {fileUploadState === "complete" && instagramData && (
          <ResultsSection 
            instagramData={instagramData}
            unfollowers={unfollowers}
            notFollowingBack={notFollowingBack}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
        
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
