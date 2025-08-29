import { useState } from "react";
import { University } from "lucide-react";
import ApiTester from "@/components/api-tester";
import Documentation from "@/components/documentation";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"test" | "docs">("test");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <University className="text-primary-foreground text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">VIT Full Stack API</h1>
                <p className="text-sm text-muted-foreground">REST API Testing Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span>API Status: Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            <button 
              data-testid="tab-testing"
              onClick={() => setActiveTab("test")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center space-x-2 ${
                activeTab === "test" 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>🧪</span>
              <span>API Testing</span>
            </button>
            <button 
              data-testid="tab-documentation"
              onClick={() => setActiveTab("docs")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center space-x-2 ${
                activeTab === "docs" 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>📚</span>
              <span>Documentation</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "test" && <ApiTester />}
        {activeTab === "docs" && <Documentation />}
      </main>
    </div>
  );
}
