export class Dataview
{
    public table: string | undefined;
    public columns: string[] = [];
    public rows: any[] = [];
}

export class DataviewRequest
{
    public table: string | undefined;
    public columns: string[] = [];
}

export class DataviewResponse
{
    public dataViews: Dataview[] = [];
}