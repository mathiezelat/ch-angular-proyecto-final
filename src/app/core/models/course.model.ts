export class Course {
  constructor(
    public id: number,
    public title: string,
    public category: string,
    public duration: string,
    public schedules: string,
    public price: number
  ) {}
}
