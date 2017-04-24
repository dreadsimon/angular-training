interface CourseItem {
	id: number;
	title: string;
	description: string;
	date: Date;
	duration: number;
	topRated: boolean;
}

export class Course implements CourseItem {
	public id: number;
	public title: string;
	public description: string;
	public date: Date;
	public duration: number;
	public topRated: boolean;

	constructor(id: number, title: string, description: string, date: Date, duration: number, topRated: boolean) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.date = date;
		this.duration = duration;
		this.topRated = topRated;		
	}
}
