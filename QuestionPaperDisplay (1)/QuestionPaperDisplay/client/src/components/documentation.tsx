import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Documentation() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">API Documentation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Overview */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-3">Overview</h3>
            <p className="text-muted-foreground mb-4">
              The VIT Full Stack API processes arrays of mixed data and categorizes elements into different types while performing various calculations and transformations.
            </p>
            <div className="bg-muted/30 rounded-md p-4">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">POST</Badge>
                <code className="text-sm font-mono">/bfhl</code>
              </div>
            </div>
          </section>

          <Separator />

          {/* Request Format */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-3">Request Format</h3>
            <div className="bg-background rounded-md p-4 border">
              <pre className="text-sm font-mono">
{`{
  "data": ["array of mixed values"]
}`}
              </pre>
            </div>
          </section>

          <Separator />

          {/* Response Fields */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-3">Response Fields</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-muted/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li><code>is_success</code> - Operation status</li>
                      <li><code>user_id</code> - User identifier</li>
                      <li><code>email</code> - Email address</li>
                      <li><code>roll_number</code> - College roll number</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-muted/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Data Processing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li><code>even_numbers</code> - Array of even numbers</li>
                      <li><code>odd_numbers</code> - Array of odd numbers</li>
                      <li><code>alphabets</code> - Uppercased letters</li>
                      <li><code>special_characters</code> - Non-alphanumeric chars</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <Card className="bg-muted/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Calculations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li><code>sum</code> - Sum of all numbers (as string)</li>
                    <li><code>concat_string</code> - Alphabets in reverse order with alternating caps</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* User ID Format */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-3">User ID Format</h3>
            <p className="text-muted-foreground mb-3">
              The user_id follows the format: <code className="bg-muted px-2 py-1 rounded text-sm">{"{full_name_ddmmyyyy}"}</code>
            </p>
            <div className="bg-background rounded-md p-4 border">
              <p className="text-sm font-mono">Example: <span className="text-blue-600">"john_doe_17091999"</span></p>
            </div>
          </section>

          <Separator />

          {/* Examples */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-3">Examples</h3>
            <div className="space-y-6">
              {/* Example A */}
              <Card className="border">
                <CardHeader className="bg-muted/30 border-b">
                  <CardTitle className="text-base">Example A - Mixed Data</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Request:</p>
                    <div className="bg-background rounded-md p-3 border">
                      <pre className="text-sm font-mono">{`{"data": ["a","1","334","4","R","$"]}`}</pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Response:</p>
                    <div className="bg-background rounded-md p-3 border">
                      <pre className="text-sm font-mono text-muted-foreground">
{`{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com", 
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Error Handling */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-3">Error Handling</h3>
            <Card className="bg-destructive/10 border-destructive/20">
              <CardContent className="pt-6">
                <p className="text-sm text-destructive/80">
                  All errors return appropriate HTTP status codes with descriptive messages. 
                  Successful requests return status code 200 with <code>is_success: true</code>.
                </p>
              </CardContent>
            </Card>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
