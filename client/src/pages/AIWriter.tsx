import { useState } from "react";
import ContentGenerator from "@/components/ContentGenerator";

export default function AIWriter() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">AI Writer</h1>
        <p className="text-muted-foreground">Generate content for your social media platforms</p>
      </div>
      
      <ContentGenerator />
    </div>
  );
}
