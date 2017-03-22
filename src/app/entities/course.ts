interface CourseItem {
	id: number;
	title: string;
	description: string;
	date: Date;
	duration: number;
}

export class Course implements CourseItem {
	public id: number;
	public title: string;
	public description: string;
	public date: Date;
	public duration: number;

	constructor(id: number, title: string, description: string, date: Date, duration: number) {
	}
}
