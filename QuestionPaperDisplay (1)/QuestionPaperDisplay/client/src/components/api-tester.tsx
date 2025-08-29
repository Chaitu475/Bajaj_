import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Copy, Send, Code, Trash2, Loader2 } from "lucide-react";
import { callBfhlApi } from "@/lib/api";
import type { BfhlResponse } from "@shared/schema";

const SAMPLE_REQUESTS = [
  {
    name: "Example A",
    description: "Mixed data with numbers, letters, and symbols",
    data: '{"data": ["a","1","334","4","R","$"]}'
  },
  {
    name: "Example B", 
    description: "Complex array with special characters",
    data: '{"data": ["2","a","y","4","&","-","*","5","92","b"]}'
  },
  {
    name: "Example C",
    description: "Alphabetic strings only", 
    data: '{"data": ["A","ABcD","DOE"]}'
  }
];

export default function ApiTester() {
  const [jsonInput, setJsonInput] = useState('{"data": ["a","1","334","4","R","$"]}');
  const [apiEndpoint, setApiEndpoint] = useState(`${window.location.origin}/api/bfhl`);
  const [response, setResponse] = useState<BfhlResponse | null>(null);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: callBfhlApi,
    onSuccess: (data) => {
      setResponse(data);
      toast({
        title: "Request successful",
        description: "API response received successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Request failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSendRequest = () => {
    try {
      const requestData = JSON.parse(jsonInput);
      mutation.mutate(requestData);
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON format",
        variant: "destructive",
      });
    }
  };

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Cannot format invalid JSON",
        variant: "destructive",
      });
    }
  };

  const handleClearInput = () => {
    setJsonInput('');
    setResponse(null);
  };

  const handleCopyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
      toast({
        title: "Copied to clipboard",
        description: "Response data copied successfully",
      });
    }
  };

  const handleSampleClick = (sampleData: string) => {
    const parsed = JSON.parse(sampleData);
    setJsonInput(JSON.stringify(parsed, null, 2));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>API Request</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">POST</Badge>
                <span className="text-sm text-muted-foreground font-mono">/bfhl</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* API Endpoint Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                API Endpoint
              </label>
              <div className="relative">
                <Input
                  data-testid="input-api-endpoint"
                  type="text"
                  value={apiEndpoint}
                  onChange={(e) => setApiEndpoint(e.target.value)}
                  className="font-mono pr-10"
                  placeholder="Enter your API endpoint"
                />
                <Button
                  data-testid="button-copy-endpoint"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => navigator.clipboard.writeText(apiEndpoint)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* JSON Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Request Body (JSON)
              </label>
              <Textarea
                data-testid="textarea-json-input"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={8}
                className="font-mono text-sm resize-none"
                placeholder='{"data": ["a","1","334","4","R","$"]}'
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                data-testid="button-send-request"
                onClick={handleSendRequest}
                disabled={mutation.isPending}
                className="flex-1 flex items-center space-x-2"
              >
                {mutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span>Send Request</span>
              </Button>
              <Button 
                data-testid="button-format-json"
                variant="outline"
                onClick={handleFormatJson}
                className="flex items-center space-x-2"
              >
                <Code className="h-4 w-4" />
                <span>Format JSON</span>
              </Button>
              <Button 
                data-testid="button-clear-input"
                variant="outline"
                onClick={handleClearInput}
                className="flex items-center space-x-2 text-muted-foreground"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sample Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Sample Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {SAMPLE_REQUESTS.map((sample, index) => (
              <div
                key={index}
                data-testid={`sample-${index}`}
                className="p-3 bg-muted/30 rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSampleClick(sample.data)}
              >
                <p className="text-sm font-medium text-foreground mb-1">{sample.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{sample.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Output Section */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>API Response</CardTitle>
              <div className="flex items-center space-x-2">
                {response && (
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    <div className="w-2 h-2 rounded-full bg-green-600 mr-1.5"></div>
                    200 OK
                  </Badge>
                )}
                {response && (
                  <Button
                    data-testid="button-copy-response"
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyResponse}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Loading State */}
            {mutation.isPending && (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Processing request...</p>
              </div>
            )}

            {/* Empty State */}
            {!mutation.isPending && !response && !mutation.isError && (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center">
                  <Code className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground mb-1">No response yet</p>
                  <p className="text-xs text-muted-foreground">Send a request to see the API response here</p>
                </div>
              </div>
            )}

            {/* Response Data */}
            {response && (
              <div className="space-y-4">
                {/* Response JSON */}
                <div className="bg-background rounded-md p-4 border">
                  <pre className="text-sm font-mono text-foreground overflow-x-auto">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </div>

                {/* Parsed Response Cards */}
                <div className="grid gap-4 mt-6">
                  {/* Status & Identity */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-2 text-blue-900">
                        <span>👤</span>
                        <span>Status & Identity</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-700">Success:</span>
                        <span className="font-mono text-blue-900">{response.is_success.toString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-700">User ID:</span>
                        <span className="font-mono text-blue-900 break-all">{response.user_id}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-700">Email:</span>
                        <span className="font-mono text-blue-900 break-all">{response.email}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-700">Roll Number:</span>
                        <span className="font-mono text-blue-900 break-all">{response.roll_number}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Numbers */}
                  <Card className="bg-green-50 border-green-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-2 text-green-900">
                        <span>🔢</span>
                        <span>Numbers</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-700">Even Numbers:</span>
                        <span className="font-mono text-green-900 break-all">{JSON.stringify(response.even_numbers)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-700">Odd Numbers:</span>
                        <span className="font-mono text-green-900 break-all">{JSON.stringify(response.odd_numbers)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-700">Sum:</span>
                        <span className="font-mono text-green-900">{response.sum}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Characters */}
                  <Card className="bg-purple-50 border-purple-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-2 text-purple-900">
                        <span>🔤</span>
                        <span>Characters</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-700">Alphabets:</span>
                        <span className="font-mono text-purple-900 break-all">{JSON.stringify(response.alphabets)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-700">Special Characters:</span>
                        <span className="font-mono text-purple-900 break-all">{JSON.stringify(response.special_characters)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-700">Concat String:</span>
                        <span className="font-mono text-purple-900 break-all">{response.concat_string}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Error State */}
            {mutation.isError && (
              <Card className="bg-destructive/10 border-destructive/20">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-destructive mt-0.5">⚠️</span>
                    <div>
                      <h4 className="text-sm font-medium text-destructive mb-1">Request Failed</h4>
                      <p className="text-sm text-destructive/80">{mutation.error?.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
