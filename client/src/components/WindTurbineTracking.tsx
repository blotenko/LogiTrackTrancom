import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2, Download, Upload, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TrackingRow {
  id: string;
  rowNumber: string;
  vessel: string;
  voyage: string;
  components: string;
  serialNumber: string;
  vuiBlades: string;
  damageConstanta: string;
  customConst: string;
  plannedLoadingConstanta: string;
  actualLoadingConstanta: string;
  plannedArrivalChornomorsk: string;
  actualArrivalChornomorsk: string;
  customChornomorsk: string;
  actualUnloadingChornomorsk: string;
  unloadingBerth: string;
  storageLocation: string;
  truckNoPort: string;
  trailerNoPort: string;
  driverPort: string;
  plannedLoadingCar: string;
  actualLoadingCar: string;
  storageDays: string;
  departureDateCar: string;
  truckNoSite: string;
  trailerNoSite: string;
  driverSite: string;
  damageChornomorsk: string;
  plannedArrivalSite: string;
  actualArrivalSite: string;
  actualUnloadingSite: string;
  unloadingSite: string;
  damageBeforeUnloading: string;
  ttnNumber: string;
  returnActNo: string;
  ttnInOffice: string;
  column5: string;
  column6: string;
  column7: string;
  column8: string;
  column9: string;
  column10: string;
  column11: string;
  column12: string;
}

const emptyRow = (): TrackingRow => ({
  id: crypto.randomUUID(),
  rowNumber: "",
  vessel: "",
  voyage: "",
  components: "",
  serialNumber: "",
  vuiBlades: "",
  damageConstanta: "",
  customConst: "",
  plannedLoadingConstanta: "",
  actualLoadingConstanta: "",
  plannedArrivalChornomorsk: "",
  actualArrivalChornomorsk: "",
  customChornomorsk: "",
  actualUnloadingChornomorsk: "",
  unloadingBerth: "",
  storageLocation: "",
  truckNoPort: "",
  trailerNoPort: "",
  driverPort: "",
  plannedLoadingCar: "",
  actualLoadingCar: "",
  storageDays: "",
  departureDateCar: "",
  truckNoSite: "",
  trailerNoSite: "",
  driverSite: "",
  damageChornomorsk: "",
  plannedArrivalSite: "",
  actualArrivalSite: "",
  actualUnloadingSite: "",
  unloadingSite: "",
  damageBeforeUnloading: "",
  ttnNumber: "",
  returnActNo: "",
  ttnInOffice: "",
  column5: "",
  column6: "",
  column7: "",
  column8: "",
  column9: "",
  column10: "",
  column11: "",
  column12: ""
});

const columnConfig = [
  { key: "rowNumber", label: "Стовпець 1", width: "80px" },
  { key: "vessel", label: "Судно/Vessel", width: "130px" },
  { key: "voyage", label: "Рейс/Voyg", width: "100px" },
  { key: "components", label: "Components / Компоненти вітрогенератору", width: "200px" },
  { key: "serialNumber", label: "Serial Number", width: "130px" },
  { key: "vuiBlades", label: "Vui Blades", width: "100px" },
  { key: "damageConstanta", label: "Виявлені пошкодження перед навантаженням Констанца", width: "220px" },
  { key: "customConst", label: "Custom CONST", width: "120px" },
  { key: "plannedLoadingConstanta", label: "Запланована дата завантаження порт Констанца", width: "200px" },
  { key: "actualLoadingConstanta", label: "Фактична дата завантаження порт Констанца", width: "200px" },
  { key: "plannedArrivalChornomorsk", label: "Запланована дата прибуття в порт Черноморск", width: "200px" },
  { key: "actualArrivalChornomorsk", label: "Фактична дата прибуття в порт Черноморск", width: "200px" },
  { key: "customChornomorsk", label: "Custom Черноморск дата", width: "160px" },
  { key: "actualUnloadingChornomorsk", label: "Фактична дата розвантаження порт Чорноморськ", width: "220px" },
  { key: "unloadingBerth", label: "Причал розвантаження", width: "140px" },
  { key: "storageLocation", label: "Місце складування, порт", width: "160px" },
  { key: "truckNoPort", label: "Truck No.", width: "120px" },
  { key: "trailerNoPort", label: "Trailer No.", width: "120px" },
  { key: "driverPort", label: "Водитель", width: "130px" },
  { key: "plannedLoadingCar", label: "Запланована дата завантаження", width: "180px" },
  { key: "actualLoadingCar", label: "Фактична дата завантаження на АВТО порт Черноморск", width: "240px" },
  { key: "storageDays", label: "Кількість днів зберігання порт Чорноморськ", width: "200px" },
  { key: "departureDateCar", label: "Фактична дата виїзда АВТО порт Черноморск", width: "220px" },
  { key: "truckNoSite", label: "Truck No.", width: "120px" },
  { key: "trailerNoSite", label: "Trailer No.", width: "120px" },
  { key: "driverSite", label: "Водитель", width: "130px" },
  { key: "damageChornomorsk", label: "Виявлені пошкодження перед навантаженням Черноморск", width: "240px" },
  { key: "plannedArrivalSite", label: "Запланована дата прибуття на САЙТ", width: "200px" },
  { key: "actualArrivalSite", label: "Фактична дата прибуття на САЙТ", width: "200px" },
  { key: "actualUnloadingSite", label: "Фактична дата розвантаження САЙТ Тилигул", width: "220px" },
  { key: "unloadingSite", label: "Майданчик розвантаження", width: "160px" },
  { key: "damageBeforeUnloading", label: "Виявлені пошкодження перед розвантаженням", width: "220px" },
  { key: "ttnNumber", label: "Номер ТТН", width: "120px" },
  { key: "returnActNo", label: "Зворотній акт №, дата", width: "160px" },
  { key: "ttnInOffice", label: "ТТН в офісе", width: "120px" },
  { key: "column5", label: "Стовпець 5", width: "100px" },
  { key: "column6", label: "Стовпець 6", width: "100px" },
  { key: "column7", label: "Стовпець 7", width: "100px" },
  { key: "column8", label: "Стовпець 8", width: "100px" },
  { key: "column9", label: "Стовпець 9", width: "100px" },
  { key: "column10", label: "Стовпець 10", width: "100px" },
  { key: "column11", label: "Стовпець 11", width: "100px" },
  { key: "column12", label: "Стовпець 12", width: "100px" }
];

interface WindTurbineTrackingProps {
  onBack: () => void;
}

export default function WindTurbineTracking({ onBack }: WindTurbineTrackingProps) {
  const { toast } = useToast();
  const [rows, setRows] = useState<TrackingRow[]>(() => {
    const saved = localStorage.getItem("windTurbineTracking");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [emptyRow()];
      }
    }
    return [emptyRow()];
  });
  
  const tableRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("windTurbineTracking", JSON.stringify(rows));
  }, [rows]);

  const handleCellChange = (rowId: string, field: keyof TrackingRow, value: string) => {
    setRows(rows.map(row => 
      row.id === rowId ? { ...row, [field]: value } : row
    ));
  };

  const addRow = () => {
    setRows([...rows, emptyRow()]);
    toast({
      title: "Row Added",
      description: "New row added to the tracking table."
    });
  };

  const deleteRow = (rowId: string) => {
    if (rows.length === 1) {
      toast({
        title: "Cannot Delete",
        description: "Table must have at least one row.",
        variant: "destructive"
      });
      return;
    }
    setRows(rows.filter(row => row.id !== rowId));
    toast({
      title: "Row Deleted",
      description: "Row removed from the tracking table."
    });
  };

  const saveData = () => {
    localStorage.setItem("windTurbineTracking", JSON.stringify(rows));
    toast({
      title: "Data Saved",
      description: "Tracking data has been saved locally."
    });
  };

  const exportToCSV = () => {
    const headers = columnConfig.map(col => col.label).join(",");
    const csvRows = rows.map(row => 
      columnConfig.map(col => {
        const value = row[col.key as keyof TrackingRow];
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(",")
    );
    const csv = [headers, ...csvRows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wind-turbine-tracking-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Export Complete",
      description: "Tracking data exported to CSV file."
    });
  };

  const parseCSV = (text: string): string[][] => {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentField = "";
    let inQuotes = false;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];
      
      if (inQuotes) {
        if (char === '"') {
          if (nextChar === '"') {
            currentField += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          currentField += char;
        }
      } else {
        if (char === '"') {
          inQuotes = true;
        } else if (char === ',') {
          currentRow.push(currentField.trim());
          currentField = "";
        } else if (char === '\r') {
          continue;
        } else if (char === '\n') {
          currentRow.push(currentField.trim());
          if (currentRow.some(field => field !== "")) {
            rows.push(currentRow);
          }
          currentRow = [];
          currentField = "";
        } else {
          currentField += char;
        }
      }
    }
    
    if (currentField || currentRow.length > 0) {
      currentRow.push(currentField.trim());
      if (currentRow.some(field => field !== "")) {
        rows.push(currentRow);
      }
    }
    
    return rows;
  };

  const importFromCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const allRows = parseCSV(text);
        
        if (allRows.length < 2) {
          throw new Error("Invalid CSV format");
        }
        
        const dataRows = allRows.slice(1);
        const importedRows: TrackingRow[] = dataRows.map(values => {
          const row = emptyRow();
          columnConfig.forEach((col, index) => {
            if (values[index] !== undefined) {
              (row as any)[col.key] = values[index];
            }
          });
          return row;
        });
        
        setRows(importedRows.length > 0 ? importedRows : [emptyRow()]);
        toast({
          title: "Import Complete",
          description: `Imported ${importedRows.length} rows from CSV file.`
        });
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Could not parse the CSV file. Please check the format.",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-[1800px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onBack}
                data-testid="button-back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold" data-testid="text-page-title">
                  Wind Turbine Component Tracking
                </h1>
                <p className="text-sm text-muted-foreground">
                  Constanța Port → Chornomorsk Port → SITE Tiligul
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" onClick={addRow} data-testid="button-add-row">
                <Plus className="h-4 w-4 mr-2" />
                Add Row
              </Button>
              <Button variant="outline" onClick={saveData} data-testid="button-save">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={exportToCSV} data-testid="button-export">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} data-testid="button-import">
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={importFromCSV}
                className="hidden"
                data-testid="input-file-import"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center justify-between">
              <span>Shipment Tracking Table</span>
              <span className="text-sm font-normal text-muted-foreground">
                {rows.length} {rows.length === 1 ? "row" : "rows"} • Scroll horizontally to see all columns
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              ref={tableRef}
              className="overflow-x-auto border rounded-lg"
              style={{ maxHeight: "calc(100vh - 280px)" }}
            >
              <table className="w-full border-collapse" data-testid="table-tracking">
                <thead className="sticky top-0 z-10 bg-muted">
                  <tr>
                    <th className="border-b border-r p-2 text-left text-xs font-medium text-muted-foreground sticky left-0 bg-muted z-20" style={{ minWidth: "50px" }}>
                      #
                    </th>
                    {columnConfig.map((col, index) => (
                      <th 
                        key={col.key}
                        className="border-b border-r p-2 text-left text-xs font-medium text-muted-foreground whitespace-nowrap"
                        style={{ minWidth: col.width }}
                        data-testid={`header-${col.key}`}
                      >
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] text-muted-foreground/70">{index + 1}</span>
                          <span>{col.label}</span>
                        </div>
                      </th>
                    ))}
                    <th className="border-b p-2 text-center text-xs font-medium text-muted-foreground sticky right-0 bg-muted z-20" style={{ minWidth: "60px" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr 
                      key={row.id} 
                      className="hover:bg-muted/50"
                      data-testid={`row-${row.id}`}
                    >
                      <td className="border-b border-r p-1 text-center text-sm text-muted-foreground sticky left-0 bg-card z-10">
                        {rowIndex + 1}
                      </td>
                      {columnConfig.map((col) => (
                        <td 
                          key={`${row.id}-${col.key}`}
                          className="border-b border-r p-1"
                        >
                          <Input
                            value={row[col.key as keyof TrackingRow]}
                            onChange={(e) => handleCellChange(row.id, col.key as keyof TrackingRow, e.target.value)}
                            className="h-8 text-sm border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
                            data-testid={`input-${col.key}-${row.id}`}
                          />
                        </td>
                      ))}
                      <td className="border-b p-1 text-center sticky right-0 bg-card z-10">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => deleteRow(row.id)}
                          data-testid={`button-delete-row-${row.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">{rows.length}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Components</p>
                  <p className="text-xs text-muted-foreground">Tracked in system</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <span className="text-green-600 font-semibold">
                    {rows.filter(r => r.actualArrivalSite).length}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">Arrived at SITE</p>
                  <p className="text-xs text-muted-foreground">Components delivered</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <span className="text-amber-600 font-semibold">
                    {rows.filter(r => r.damageConstanta || r.damageChornomorsk || r.damageBeforeUnloading).length}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">Damage Reports</p>
                  <p className="text-xs text-muted-foreground">Components with issues</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
