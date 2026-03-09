import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const PageSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-muted rounded w-1/3"></div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/4"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};