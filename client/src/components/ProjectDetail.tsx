import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Package, Truck, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Trip {
  id: string;
  tripNumber: string;
  destination: string;
  pieces: number;
  status: "in-transit" | "delivered" | "pending" | "delayed";
  departureDate: string;
  expectedArrival: string;
  driver?: string;
}

interface ProjectDetailProps {
  project: {
    id: string;
    name: string;
    description: string;
    status: string;
    priority: string;
    location?: string;
    createdAt: string;
    totalPieces: number;
    trips: Trip[];
  };
  onBack?: () => void;
  onEdit?: () => void;
}

const statusConfig = {
  "in-transit": {
    color: "bg-chart-2 text-white",
    icon: Truck,
    label: "In Transit"
  },
  "delivered": {
    color: "bg-chart-3 text-white",
    icon: CheckCircle2,
    label: "Delivered"
  },
  "pending": {
    color: "bg-chart-4 text-white",
    icon: Clock,
    label: "Pending"
  },
  "delayed": {
    color: "bg-destructive text-destructive-foreground",
    icon: AlertCircle,
    label: "Delayed"
  }
};

export default function ProjectDetail({ project, onBack, onEdit }: ProjectDetailProps) {
  const deliveredPieces = project.trips
    .filter(trip => trip.status === "delivered")
    .reduce((sum, trip) => sum + trip.pieces, 0);
  
  const inTransitPieces = project.trips
    .filter(trip => trip.status === "in-transit")
    .reduce((sum, trip) => sum + trip.pieces, 0);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="gap-2 mb-4" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-normal mb-2" data-testid="text-project-name">{project.name}</h1>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            <Button onClick={onEdit} data-testid="button-edit-project">
              Edit Project
            </Button>
          </div>
        </div>

        <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pieces</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium" data-testid="text-total-pieces">{project.totalPieces}</div>
              <p className="text-xs text-muted-foreground mt-1">Across {project.trips.length} trips</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium text-chart-3" data-testid="text-delivered-pieces">{deliveredPieces}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((deliveredPieces / project.totalPieces) * 100)}% complete
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <Truck className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium text-chart-2" data-testid="text-in-transit-pieces">{inTransitPieces}</div>
              <p className="text-xs text-muted-foreground mt-1">On the way</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Location</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-medium">{project.location || "N/A"}</div>
              <p className="text-xs text-muted-foreground mt-1">Primary location</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-medium">Trip Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[15%]">Trip #</TableHead>
                    <TableHead className="w-[25%]">Destination</TableHead>
                    <TableHead className="w-[12%]">Pieces</TableHead>
                    <TableHead className="w-[15%]">Status</TableHead>
                    <TableHead className="w-[15%]">Departure</TableHead>
                    <TableHead className="w-[18%]">Expected Arrival</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.trips.map((trip) => {
                    const config = statusConfig[trip.status];
                    const StatusIcon = config.icon;
                    
                    return (
                      <TableRow key={trip.id} data-testid={`row-trip-${trip.id}`}>
                        <TableCell className="font-medium" data-testid={`text-trip-number-${trip.id}`}>
                          {trip.tripNumber}
                        </TableCell>
                        <TableCell data-testid={`text-destination-${trip.id}`}>{trip.destination}</TableCell>
                        <TableCell data-testid={`text-pieces-${trip.id}`}>{trip.pieces}</TableCell>
                        <TableCell>
                          <Badge className={`${config.color} gap-1`} data-testid={`badge-status-${trip.id}`}>
                            <StatusIcon className="h-3 w-3" />
                            {config.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{trip.departureDate}</TableCell>
                        <TableCell className="text-muted-foreground">{trip.expectedArrival}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
