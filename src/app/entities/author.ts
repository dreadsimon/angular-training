interface AuthorItem {
	id: number;
	firstName: string;
	lastName: string;
}

export class Author implements AuthorItem {
	public id: number;
	public firstName: string;
	public lastName: string;

	constructor(id: number, firstName: string, lastName: string) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
	}
}
