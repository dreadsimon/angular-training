interface CourseItem {
	id: number;
	title: string;
	description: string;
	date: Date;
	duration: number;
	topRated: boolean;
	authors: Array<Number>;
}

export class Course implements CourseItem {
	public id: number;
	public title: string;
	public description: string;
	public date: Date;
	public duration: number;
	public topRated: boolean;
	public authors: Array<Number>;

	constructor(id: number, title: string, description: string, date: Date, duration: number, topRated: boolean, authors: Array<Number>) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.date = date;
		this.duration = duration;
		this.topRated = topRated;
		this.authors = authors;
	}
}
