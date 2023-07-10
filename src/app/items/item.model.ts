export interface Item {
  id?: string;
  title: string;
  description: string;
  createdAt: string; // ISO 8601 datetime format (YYYY-MM-DDTHH:mm:ss.sZ)
  modifiedAt: string; // ISO 8601 datetime format (YYYY-MM-DDTHH:mm:ss.sZ)
}
