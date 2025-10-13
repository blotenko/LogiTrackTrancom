import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
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

interface ProjectFormFullProps {
  onBack?: () => void;
  onSave?: (project: any) => void;
  initialData?: {
    name: string;
    description: string;
    status: string;
    priority: string;
    location: string;
    totalPieces: number;
    trips: Trip[];
  };
}

export default function ProjectFormFull({ onBack, onSave, initialData }: ProjectFormFullProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    status: initialData?.status || "active",
    priority: initialData?.priority || "medium",
    location: initialData?.location || "",
    totalPieces: initialData?.totalPieces || 0,
  });

  const [trips, setTrips] = useState<Trip[]>(initialData?.trips || []);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddTrip = () => {
    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      tripNumber: `T-${String(trips.length + 1).padStart(3, '0')}`,
      destination: "",
      pieces: 0,
      status: "pending",
      departureDate: "",
      expectedArrival: "",
      driver: ""
    };
    setTrips([...trips, newTrip]);
  };

  const handleRemoveTrip = (id: string) => {
    setTrips(trips.filter(trip => trip.id !== id));
  };

  const handleTripChange = (id: string, field: keyof Trip, value: any) => {
    setTrips(trips.map(trip => 
      trip.id === id ? { ...trip, [field]: value } : trip
    ));
  };

  const calculateTotalPieces = () => {
    return trips.reduce((sum, trip) => sum + Number(trip.pieces || 0), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const totalFromTrips = calculateTotalPieces();
    console.log("Project saved", { ...formData, totalPieces: totalFromTrips, trips });
    onSave?.({ ...formData, totalPieces: totalFromTrips, trips });
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="gap-2 mb-4" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-normal">{initialData ? "Edit Project" : "Create New Project"}</h1>
          <p className="text-muted-foreground mt-1">Manage project details and delivery trips</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-medium">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., North Region Delivery"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    data-testid="input-project-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., New York, NY"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    data-testid="input-location"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the project scope, objectives, and key details..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-32 resize-none"
                  data-testid="input-description"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger id="status" data-testid="select-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                    <SelectTrigger id="priority" data-testid="select-priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-xl font-medium">Delivery Trips</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Total Pieces: <span className="font-medium text-foreground">{calculateTotalPieces()}</span>
                </p>
              </div>
              <Button type="button" onClick={handleAddTrip} className="gap-2" data-testid="button-add-trip">
                <Plus className="h-4 w-4" />
                Add Trip
              </Button>
            </CardHeader>
            <CardContent>
              {trips.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No trips added yet. Click "Add Trip" to get started.
                </div>
              ) : (
                <div className="border rounded-lg overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[12%]">Trip #</TableHead>
                        <TableHead className="w-[18%]">Destination</TableHead>
                        <TableHead className="w-[10%]">Pieces</TableHead>
                        <TableHead className="w-[15%]">Status</TableHead>
                        <TableHead className="w-[15%]">Departure</TableHead>
                        <TableHead className="w-[15%]">Arrival</TableHead>
                        <TableHead className="w-[15%]">Driver</TableHead>
                        <TableHead className="w-[8%]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trips.map((trip) => (
                        <TableRow key={trip.id}>
                          <TableCell>
                            <Input
                              value={trip.tripNumber}
                              onChange={(e) => handleTripChange(trip.id, 'tripNumber', e.target.value)}
                              className="h-9"
                              data-testid={`input-trip-number-${trip.id}`}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={trip.destination}
                              onChange={(e) => handleTripChange(trip.id, 'destination', e.target.value)}
                              placeholder="City, State"
                              className="h-9"
                              data-testid={`input-destination-${trip.id}`}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={trip.pieces}
                              onChange={(e) => handleTripChange(trip.id, 'pieces', parseInt(e.target.value) || 0)}
                              className="h-9"
                              min="0"
                              data-testid={`input-pieces-${trip.id}`}
                            />
                          </TableCell>
                          <TableCell>
                            <Select 
                              value={trip.status} 
                              onValueChange={(value) => handleTripChange(trip.id, 'status', value)}
                            >
                              <SelectTrigger className="h-9" data-testid={`select-trip-status-${trip.id}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in-transit">In Transit</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="delayed">Delayed</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="date"
                              value={trip.departureDate}
                              onChange={(e) => handleTripChange(trip.id, 'departureDate', e.target.value)}
                              className="h-9"
                              data-testid={`input-departure-${trip.id}`}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="date"
                              value={trip.expectedArrival}
                              onChange={(e) => handleTripChange(trip.id, 'expectedArrival', e.target.value)}
                              className="h-9"
                              data-testid={`input-arrival-${trip.id}`}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={trip.driver || ""}
                              onChange={(e) => handleTripChange(trip.id, 'driver', e.target.value)}
                              placeholder="Driver name"
                              className="h-9"
                              data-testid={`input-driver-${trip.id}`}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveTrip(trip.id)}
                              data-testid={`button-remove-trip-${trip.id}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onBack} data-testid="button-cancel">
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving} data-testid="button-save">
              {isSaving ? "Saving..." : "Save Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
