export  class CourseItem {
	public title: string;
	public description: string;
	public date: Date;
	public duration: number;

	constructor(title: string, description: string, date: Date, duration: number) {
		this.title = title;
		this.description = description;
		this.date = date;
		this.duration = duration;
	}
}
