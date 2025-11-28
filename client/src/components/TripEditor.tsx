import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Trip {
  id: string;
  tripNumber: string;
  destination: string;
  pieces: number;
  pieceName?: string;
  status: "in-transit" | "delivered" | "pending" | "delayed";
  departureDate: string;
  expectedArrival: string;
  driver?: string;
  truckNumber?: string;
  trailerNumber?: string;
}

interface TripEditorProps {
  projectName: string;
  projectId: string;
  initialTrips: Trip[];
  selectedTripId?: string;
  onBack: () => void;
  onSave: (trips: Trip[]) => void;
}

const statusConfig = {
  "in-transit": { label: "In Transit", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  "delivered": { label: "Delivered", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  "pending": { label: "Pending", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
  "delayed": { label: "Delayed", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" }
};

export default function TripEditor({ projectName, projectId, initialTrips, selectedTripId, onBack, onSave }: TripEditorProps) {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [selectedTrip, setSelectedTrip] = useState<string | null>(selectedTripId || null);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddTrip = () => {
    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      tripNumber: `T-${String(trips.length + 1).padStart(3, '0')}`,
      destination: "",
      pieces: 0,
      pieceName: "",
      status: "pending",
      departureDate: "",
      expectedArrival: "",
      driver: "",
      truckNumber: "",
      trailerNumber: ""
    };
    setTrips([...trips, newTrip]);
    setSelectedTrip(newTrip.id);
  };

  const handleRemoveTrip = (id: string) => {
    setTrips(trips.filter(trip => trip.id !== id));
    if (selectedTrip === id) {
      setSelectedTrip(null);
    }
  };

  const handleTripChange = (id: string, field: keyof Trip, value: any) => {
    setTrips(trips.map(trip => 
      trip.id === id ? { ...trip, [field]: value } : trip
    ));
  };

  const calculateTotalPieces = () => {
    return trips.reduce((sum, trip) => sum + Number(trip.pieces || 0), 0);
  };

  const handleSave = () => {
    setIsSaving(true);
    onSave(trips);
    setTimeout(() => {
      setIsSaving(false);
      onBack();
    }, 500);
  };

  const currentTrip = trips.find(t => t.id === selectedTrip);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="gap-2 mb-4" data-testid="button-back-trips">
            <ArrowLeft className="h-4 w-4" />
            Back to Project
          </Button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-normal">Trip Management</h1>
              <p className="text-muted-foreground mt-1">{projectName}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleAddTrip} className="gap-2" data-testid="button-add-new-trip">
                <Plus className="h-4 w-4" />
                Add Trip
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="gap-2" data-testid="button-save-trips">
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Trip List */}
          <Card className="shadow-md lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
              <CardTitle className="text-lg font-medium">Trips ({trips.length})</CardTitle>
              <p className="text-sm text-muted-foreground">Total: {calculateTotalPieces()} pieces</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[60vh] overflow-y-auto">
                {trips.length === 0 ? (
                  <div className="text-center py-8 px-4 text-muted-foreground">
                    No trips yet. Click "Add Trip" to create one.
                  </div>
                ) : (
                  <div className="divide-y">
                    {trips.map((trip) => {
                      const config = statusConfig[trip.status];
                      return (
                        <div
                          key={trip.id}
                          onClick={() => setSelectedTrip(trip.id)}
                          className={`p-4 cursor-pointer hover-elevate transition-colors ${
                            selectedTrip === trip.id ? "bg-primary/10 border-l-4 border-l-primary" : ""
                          }`}
                          data-testid={`trip-list-item-${trip.id}`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-medium">{trip.tripNumber}</span>
                            <Badge className={`${config.color} text-xs`}>{config.label}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {trip.destination || "No destination"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {trip.pieces} {trip.pieceName || "pieces"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Trip Detail Editor */}
          <Card className="shadow-md lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
              <CardTitle className="text-lg font-medium">
                {currentTrip ? `Edit Trip: ${currentTrip.tripNumber}` : "Select a Trip"}
              </CardTitle>
              {currentTrip && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveTrip(currentTrip.id)}
                  data-testid="button-delete-trip"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {currentTrip ? (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="tripNumber">Trip Number</Label>
                      <Input
                        id="tripNumber"
                        value={currentTrip.tripNumber}
                        onChange={(e) => handleTripChange(currentTrip.id, 'tripNumber', e.target.value)}
                        data-testid="input-edit-trip-number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination</Label>
                      <Input
                        id="destination"
                        value={currentTrip.destination}
                        onChange={(e) => handleTripChange(currentTrip.id, 'destination', e.target.value)}
                        placeholder="City, State"
                        data-testid="input-edit-destination"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="pieces">Number of Pieces</Label>
                      <Input
                        id="pieces"
                        type="number"
                        value={currentTrip.pieces}
                        onChange={(e) => handleTripChange(currentTrip.id, 'pieces', parseInt(e.target.value) || 0)}
                        min="0"
                        data-testid="input-edit-pieces"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pieceName">Piece Name</Label>
                      <Input
                        id="pieceName"
                        value={currentTrip.pieceName || ""}
                        onChange={(e) => handleTripChange(currentTrip.id, 'pieceName', e.target.value)}
                        placeholder="e.g., Pallets, Boxes"
                        data-testid="input-edit-piece-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select 
                        value={currentTrip.status} 
                        onValueChange={(value) => handleTripChange(currentTrip.id, 'status', value)}
                      >
                        <SelectTrigger id="status" data-testid="select-edit-status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-transit">In Transit</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="delayed">Delayed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="departureDate">Departure Date</Label>
                      <Input
                        id="departureDate"
                        type="date"
                        value={currentTrip.departureDate}
                        onChange={(e) => handleTripChange(currentTrip.id, 'departureDate', e.target.value)}
                        data-testid="input-edit-departure"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expectedArrival">Expected Arrival</Label>
                      <Input
                        id="expectedArrival"
                        type="date"
                        value={currentTrip.expectedArrival}
                        onChange={(e) => handleTripChange(currentTrip.id, 'expectedArrival', e.target.value)}
                        data-testid="input-edit-arrival"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="driver">Driver Name</Label>
                      <Input
                        id="driver"
                        value={currentTrip.driver || ""}
                        onChange={(e) => handleTripChange(currentTrip.id, 'driver', e.target.value)}
                        placeholder="Driver name"
                        data-testid="input-edit-driver"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="truckNumber">Truck Number</Label>
                      <Input
                        id="truckNumber"
                        value={currentTrip.truckNumber || ""}
                        onChange={(e) => handleTripChange(currentTrip.id, 'truckNumber', e.target.value)}
                        placeholder="e.g., TRK-101"
                        data-testid="input-edit-truck"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="trailerNumber">Trailer Number</Label>
                      <Input
                        id="trailerNumber"
                        value={currentTrip.trailerNumber || ""}
                        onChange={(e) => handleTripChange(currentTrip.id, 'trailerNumber', e.target.value)}
                        placeholder="e.g., TRL-501"
                        data-testid="input-edit-trailer"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Select a trip from the list to edit its details,</p>
                  <p>or click "Add Trip" to create a new one.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Full Trip Table */}
        {trips.length > 0 && (
          <Card className="shadow-md mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-medium">All Trips Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trip #</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Pieces</TableHead>
                      <TableHead>Piece Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Departure</TableHead>
                      <TableHead>Arrival</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Truck</TableHead>
                      <TableHead>Trailer</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trips.map((trip) => {
                      const config = statusConfig[trip.status];
                      return (
                        <TableRow 
                          key={trip.id} 
                          className={`cursor-pointer hover-elevate ${selectedTrip === trip.id ? "bg-primary/10" : ""}`}
                          onClick={() => setSelectedTrip(trip.id)}
                          data-testid={`table-row-trip-${trip.id}`}
                        >
                          <TableCell className="font-medium">{trip.tripNumber}</TableCell>
                          <TableCell>{trip.destination || "-"}</TableCell>
                          <TableCell>{trip.pieces}</TableCell>
                          <TableCell>{trip.pieceName || "-"}</TableCell>
                          <TableCell>
                            <Badge className={`${config.color}`}>{config.label}</Badge>
                          </TableCell>
                          <TableCell>{trip.departureDate || "-"}</TableCell>
                          <TableCell>{trip.expectedArrival || "-"}</TableCell>
                          <TableCell>{trip.driver || "-"}</TableCell>
                          <TableCell>{trip.truckNumber || "-"}</TableCell>
                          <TableCell>{trip.trailerNumber || "-"}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveTrip(trip.id);
                              }}
                              data-testid={`button-remove-table-trip-${trip.id}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
